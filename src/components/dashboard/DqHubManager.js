// DQ Hub Manager
class DqHubManager {
    constructor() {
        this.dqDashboardModal = null;
        this.dqSummaryModal = null;
        this.dqQuickFilters = [];
        this.dqActiveFilters = [];
        
        // Cards de urgencia para DQ Hub (igual que Ops Hub)
        this.dqUrgencyCards = [
            { label: 'Critical', key: 'Urgente', color: '#ffcdd2' },
            { label: 'Warning', key: 'Media', color: '#fff9c4' },
            { label: 'Good', key: 'Baja', color: '#c8e6c9' }
        ];
        
        // Estado global de tarjetas activas para DQ Hub
        if (!window.activeDqUrgencyCards) window.activeDqUrgencyCards = [];
        
        // Contenedores por defecto para DQ Hub (similar al Ops Hub)
        this.dqDefaultContainers = {
            'dq-default': 'Data Quality Zone',
            'dq-container1': 'Duplicate Analysis',
            'dq-container2': 'Null Values',
            'dq-container3': 'Format Issues',
            'dq-container4': 'Completeness'
        };
        
        this.init();
    }

    init() {
        this.dqDashboardModal = document.getElementById('dqDashboardModal');
        this.dqSummaryModal = document.getElementById('dqSummaryModal');
        
        this.setupEventListeners();
        this.initializeDqHub();
    }

    setupEventListeners() {
        // DQ Hub toggle button
        const dqToggleBtn = document.getElementById('dqDashboardToggleBtn');
        if (dqToggleBtn) {
            dqToggleBtn.addEventListener('click', () => this.toggleDqDashboard());
        }

        // DQ Hub close button
        const dqCloseBtn = document.getElementById('dqDashboardCloseBtn');
        if (dqCloseBtn) {
            dqCloseBtn.addEventListener('click', () => this.closeDqDashboard());
        }

        // DQ Hub modal overlay click
        if (this.dqDashboardModal) {
            this.dqDashboardModal.addEventListener('click', (e) => {
                if (e.target === this.dqDashboardModal) {
                    this.closeDqDashboard();
                }
            });
        }

        // DQ Quality chips
        this.setupDqQualityChips();

        // DQ Summary generation
        const generateDqSummaryBtn = document.getElementById('generateDqSummaryBtn');
        if (generateDqSummaryBtn) {
            generateDqSummaryBtn.addEventListener('click', () => this.generateDqSummary());
        }

        // DQ Summary modal close
        const closeDqSummaryBtn = document.getElementById('closeDqSummaryBtn');
        if (closeDqSummaryBtn) {
            closeDqSummaryBtn.addEventListener('click', () => this.closeDqSummary());
        }

        // DQ Summary modal overlay click
        if (this.dqSummaryModal) {
            this.dqSummaryModal.addEventListener('click', (e) => {
                if (e.target === this.dqSummaryModal) {
                    this.closeDqSummary();
                }
            });
        }

        // DQ Summary actions
        this.setupDqSummaryActions();
    }

    setupDqQualityChips() {
        const dqChips = document.querySelectorAll('#dqDashboardModal .dq-hub-chip');
        dqChips.forEach(chip => {
            chip.addEventListener('click', () => {
                // Remove active class from all chips
                dqChips.forEach(c => c.classList.remove('active'));
                // Add active class to clicked chip
                chip.classList.add('active');
                
                const quality = chip.getAttribute('data-quality');
                this.filterByQuality(quality);
            });
        });
    }

    setupDqSummaryActions() {
        // Copy to clipboard
        const copyDqSummaryBtn = document.getElementById('dqCopySummaryBtn');
        if (copyDqSummaryBtn) {
            copyDqSummaryBtn.addEventListener('click', () => this.copyDqSummaryToClipboard());
        }

        // Export PDF
        const exportDqPdfBtn = document.getElementById('dqExportSummaryPdfBtn');
        if (exportDqPdfBtn) {
            exportDqPdfBtn.addEventListener('click', () => this.exportDqSummaryPdf());
        }

        // Export Excel
        const exportDqExcelBtn = document.getElementById('dqExportSummaryExcelBtn');
        if (exportDqExcelBtn) {
            exportDqExcelBtn.addEventListener('click', () => this.exportDqSummaryExcel());
        }

        // Save Preferences
        const savePrefsBtn = document.getElementById('dqSavePreferencesBtn');
        if (savePrefsBtn) {
            savePrefsBtn.addEventListener('click', () => this.saveDqPreferences());
        }

        // Load Preferences
        const loadPrefsBtn = document.getElementById('dqLoadPreferencesBtn');
        if (loadPrefsBtn) {
            loadPrefsBtn.addEventListener('click', () => this.loadDqPreferences());
        }

        // Report options
        this.setupDqReportOptions();
    }

    setupDqReportOptions() {
        // Include table data checkbox
        const includeTableDataCheckbox = document.getElementById('dqIncludeTableDataCheckbox');
        if (includeTableDataCheckbox) {
            includeTableDataCheckbox.addEventListener('change', () => this.updateDqSummaryPreview());
        }

        // Include technical info checkbox
        const includeTechnicalInfoCheckbox = document.getElementById('dqIncludeTechnicalInfoCheckbox');
        if (includeTechnicalInfoCheckbox) {
            includeTechnicalInfoCheckbox.addEventListener('change', () => this.updateDqSummaryPreview());
        }

        // Remove duplicates checkbox
        const removeDuplicatesCheckbox = document.getElementById('dqRemoveDuplicatesCheckbox');
        if (removeDuplicatesCheckbox) {
            removeDuplicatesCheckbox.addEventListener('change', () => {
                const duplicateColumnsSection = document.getElementById('dqDuplicateColumnsSection');
                if (duplicateColumnsSection) {
                    duplicateColumnsSection.style.display = removeDuplicatesCheckbox.checked ? 'block' : 'none';
                }
                this.updateDqSummaryPreview();
            });
        }

        // Duplicate removal controls
        this.setupDqDuplicateRemovalControls();
    }

    setupDqDuplicateRemovalControls() {
        // Select all duplicate columns
        const selectAllBtn = document.getElementById('dqSelectAllDuplicateColumnsBtn');
        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', () => this.selectAllDqDuplicateColumns());
        }

        // Deselect all duplicate columns
        const deselectAllBtn = document.getElementById('dqDeselectAllDuplicateColumnsBtn');
        if (deselectAllBtn) {
            deselectAllBtn.addEventListener('click', () => this.deselectAllDqDuplicateColumns());
        }

        // Select common fields
        const selectCommonBtn = document.getElementById('dqSelectCommonFieldsBtn');
        if (selectCommonBtn) {
            selectCommonBtn.addEventListener('click', () => this.selectCommonDqFields());
        }

        // Duplicate columns search
        const searchInput = document.getElementById('dqDuplicateColumnsSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filterDqDuplicateColumns(e.target.value));
            console.log('✅ DQ Duplicate columns search event listener added');
        } else {
            console.log('⚠️ DQ Duplicate columns search input not found');
        }
    }

    initializeDqHub() {
        this.renderDqQuickFilters();
        this.renderDqUrgencyCards();
        this.updateDqMetrics();
    }

    renderDqQuickFilters() {
        const quickFiltersDiv = document.querySelector('#dqDashboardModal .quickfilters-grid');
        if (!quickFiltersDiv) return;

        // Limpiar contenedores existentes
        quickFiltersDiv.innerHTML = '';

        // Cargar filtros guardados
        const quickFilters = this.loadDqQuickFilters();
        const grouped = {};
        
        // Inicializar los contenedores predeterminados
        Object.entries(this.dqDefaultContainers).forEach(([key, title]) => {
            grouped[key] = { title, filters: [] };
        });
        
        // Agrupar filtros por contenedor
        Object.entries(quickFilters).forEach(([name, filterObj]) => {
            // Solo incluir si tiene un campo container definido y no vacío
            if (!filterObj.container || filterObj.container === '') return;
            const key = filterObj.container;
            if (!grouped[key]) {
                grouped[key] = { 
                    title: filterObj.containerTitle || key.replace('dq-container', 'DQ Container '),
                    filters: [] 
                };
            } else if (filterObj.containerTitle) {
                // Actualizar el título si hay uno personalizado
                grouped[key].title = filterObj.containerTitle;
            }
            grouped[key].filters.push({ name, filterObj });
        });

        // Obtener columnas actuales para validación (usar la misma lógica que Ops Hub)
        const currentHeaders = Object.keys(window.getOriginalData ? window.getOriginalData()[0] || {} : {});
        const currentSet = new Set(currentHeaders);

        // Mostrar los contenedores en fila
        Object.entries(grouped).forEach(([key, group]) => {
            const container = document.createElement('div');
            container.className = 'quickfilter-container';
            
            // Título del contenedor
            const title = document.createElement('h4');
            title.textContent = group.title;
            container.appendChild(title);

            // Contenedor para las tarjetas con scroll independiente
            const cardsContainer = document.createElement('div');
            cardsContainer.className = 'quickfilter-cards-container';
            container.appendChild(cardsContainer);

            if (group.filters.length === 0) {
                const empty = document.createElement('span');
                empty.textContent = 'No quick filters saved.';
                empty.style.color = '#888';
                cardsContainer.appendChild(empty);
            }
            
            group.filters.forEach(({ name, filterObj }) => {
                const savedHeaders = filterObj.headers || [];
                const savedSet = new Set(savedHeaders);
                
                // For duplicate detection filters, check if current data has the required columns
                let sameColumns;
                if (filterObj.duplicateDetection || filterObj.type === 'duplicate_detection') {
                    const duplicateColumns = filterObj.duplicateColumns || [];
                    sameColumns = duplicateColumns.length > 0 && 
                                 duplicateColumns.every(col => currentSet.has(col));
                } else {
                    // For regular filters, check exact column match
                    sameColumns = currentSet.size === savedSet.size && 
                                 [...currentSet].every(col => savedSet.has(col));
                }

                const card = document.createElement('div');
                card.className = 'kpi-card';
                card.style.cursor = 'pointer'; // Siempre pointer para que el click funcione
                card.style.position = 'relative';
                
                // Aplicar estilos flat como en Ops Hub
                card.style.background = 'rgba(255, 255, 255, 0.08)';
                card.style.border = '1px solid rgba(255, 255, 255, 0.15)';
                card.style.borderRadius = '12px';
                card.style.boxShadow = 'none'; // Sin sombras
                card.style.backdropFilter = 'none';
                
                if (!sameColumns) {
                    card.style.opacity = '0.5';
                    card.title = 'This quick filter cannot be applied to the current CSV.';
                }

                // Title
                const cardTitle = document.createElement('div');
                cardTitle.className = 'kpi-title';
                cardTitle.textContent = name;
                cardTitle.title = name;
                card.appendChild(cardTitle);

                // Count (number of records if this filter is applied)
                const value = document.createElement('div');
                value.className = 'kpi-value';
                value.style.cssText = `
                    display: block !important;
                    font-size: 1.1rem !important;
                    font-weight: 600 !important;
                    color: #47B2E5 !important;
                    margin-top: 0.4rem !important;
                    opacity: 1 !important;
                    font-family: 'Inter', 'Segoe UI', Arial, sans-serif !important;
                    letter-spacing: 0.01em !important;
                    text-align: center !important;
                `;
                value.textContent = sameColumns ? this.getDqQuickFilterPreviewCount(name).toLocaleString() : '-';
                card.appendChild(value);

                // Marcar activa y lógica de click
                const isActive = this.dqActiveFilters.includes(name);
                if (isActive) {
                    card.classList.add('active');
                    // Estilos para estado activo
                    card.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.9) 100%)';
                    card.style.borderColor = 'rgba(16, 185, 129, 0.6)';
                    card.style.color = 'white';
                } else {
                    card.classList.remove('active');
                    // Estilos para estado normal
                    card.style.background = 'rgba(255, 255, 255, 0.08)';
                    card.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    card.style.color = 'rgba(255, 255, 255, 0.9)';
                }
                
                // Agregar evento hover para efectos visuales
                card.addEventListener('mouseenter', () => {
                    if (!isActive && sameColumns) {
                        card.style.background = 'rgba(71, 178, 229, 0.12)';
                        card.style.borderColor = 'rgba(71, 178, 229, 0.25)';
                        card.style.transform = 'translateY(-2px)';
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    if (!isActive) {
                        card.style.background = 'rgba(255, 255, 255, 0.08)';
                        card.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                        card.style.transform = 'translateY(0)';
                    }
                });

                // Evento de click siempre activo, pero verifica compatibilidad dentro
                    card.addEventListener('click', () => {
                    console.log('🔍 DQ Hub quick filter card clicked:', name);
                    console.log('🔍 Same columns:', sameColumns);
                    console.log('🔍 showNotification function exists:', typeof window.showNotification === 'function');
                    
                    if (!sameColumns) {
                        console.log('🔍 Showing notification for incompatible quick filter');
                        if (typeof window.showUnifiedNotification === 'function') {
                            window.showUnifiedNotification(`This quick filter "${name}" cannot be applied to the current CSV.`, 'error');
                        }
                        return;
                    }
                    
                        // Alternar en el array global
                        if (isActive) {
                            this.dqActiveFilters = this.dqActiveFilters.filter(f => f !== name);
                        // Show notification for deactivated quick filter card
                        if (typeof window.showUnifiedNotification === 'function') {
                            window.showUnifiedNotification(`Quick filter "${name}" deactivated!`, 'info');
                        }
                        } else {
                            this.dqActiveFilters.push(name);
                        // Show notification for activated quick filter card
                        if (typeof window.showUnifiedNotification === 'function') {
                            window.showUnifiedNotification(`Quick filter "${name}" activated!`, 'success');
                        }
                        }
                        
                        // Aplicar los filtros acumulativos
                    this.applyDqCombinedFilters();
                        
                        // Re-renderizar con los números actualizados
                        setTimeout(() => {
                            this.renderDqQuickFilters();
                        }, 50);
                    });

                cardsContainer.appendChild(card);
            });
            
            quickFiltersDiv.appendChild(container);
        });
    }

    renderDqUrgencyCards() {
        const urgencyCardsContainer = document.querySelector('#dqDashboardModal .urgency-cards-container');
        if (!urgencyCardsContainer) return;

        // Limpiar contenedor
        urgencyCardsContainer.innerHTML = '';

        // Cargar quick filters del DQ Hub
        const quickFilters = this.loadDqQuickFilters();

        // Helper para calcular el número de registros si se añade una card
        const getPreviewCount = (cardKey) => {
            // Usar datos filtrados si hay filtros activos, sino usar datos originales
            let data = [];
            if (window.activeDqUrgencyCards && window.activeDqUrgencyCards.length > 0) {
                // Si hay tarjetas activas, usar los datos filtrados actuales
                data = typeof window.getFilteredData === 'function' ? window.getFilteredData() : (window.getOriginalData ? window.getOriginalData() : []);
            } else {
                // Si no hay tarjetas activas, usar datos originales
                data = window.getOriginalData ? window.getOriginalData() : [];
            }
            
            if (!data || !data.length) return 0;
            
            // Si la card está activa, usa solo las activas
            const isActive = window.activeDqUrgencyCards.includes(cardKey);
            const previewCards = isActive
                ? window.activeDqUrgencyCards
                : [...window.activeDqUrgencyCards, cardKey];
            
            let combinedFilterValues = {};
            let combinedActiveFilters = {};
            
            previewCards.forEach(key => {
                const entry = Object.entries(quickFilters).find(([name, obj]) => obj.linkedUrgencyCard === key);
                
                if (entry) {
                    const [, filterObj] = entry;
                    
                    for (const k in filterObj.filterValues) {
                        const value = filterObj.filterValues[k];
                        if (combinedFilterValues[k]) {
                            // Combinar valores de filtros de forma correcta (intersección)
                            if (Array.isArray(combinedFilterValues[k]) && Array.isArray(value)) {
                                const intersection = combinedFilterValues[k].filter(v => value.includes(v));
                                combinedFilterValues[k] = intersection.length > 0 ? intersection : value;
                            } else if (Array.isArray(combinedFilterValues[k])) {
                                if (!combinedFilterValues[k].includes(value)) {
                                    combinedFilterValues[k] = [];
                                }
                            } else if (Array.isArray(value)) {
                                if (!value.includes(combinedFilterValues[k])) {
                                    combinedFilterValues[k] = [];
                                } else {
                                    combinedFilterValues[k] = combinedFilterValues[k];
                                }
                            } else {
                                if (combinedFilterValues[k] !== value) {
                                    combinedFilterValues[k] = [];
                                }
                            }
                        } else {
                            combinedFilterValues[k] = value;
                            if (k.endsWith('_start') || k.endsWith('_end') || k.endsWith('_empty')) {
                                const base = k.replace(/_(start|end|empty)$/, '');
                                combinedActiveFilters[base] = 'date';
                            } else if (Array.isArray(value)) {
                                combinedActiveFilters[k] = 'categorical';
                            } else {
                                combinedActiveFilters[k] = 'text';
                            }
                        }
                    }
                }
            });
            
            // Filtra los datos
            const filteredData = data.filter(row => {
                return Object.entries(combinedFilterValues).every(([key, value]) => {
                    // Soporte para filtros de fecha con _start y _end
                    if (key.endsWith('_start') || key.endsWith('_end')) {
                        const baseKey = key.replace(/_(start|end)$/, '');
                        const cellValue = row[baseKey];
                        if ((cellValue === '' || cellValue === null || cellValue === undefined) && (combinedFilterValues[`${baseKey}_empty`] || value === '__EMPTY__')) {
                            return true;
                        }
                        if (!cellValue) return false;
                        let filterDate = value;
                        let cellDate = cellValue;
                        if (typeof window.resolveDynamicDateExpr === 'function') {
                            filterDate = window.resolveDynamicDateExpr(value);
                        }
                        const filterD = typeof window.parseFlexibleDate === 'function' ? window.parseFlexibleDate(filterDate) : new Date(filterDate);
                        const cellD = typeof window.parseFlexibleDate === 'function' ? window.parseFlexibleDate(cellDate) : new Date(cellDate);
                        if (!filterD || !cellD || isNaN(filterD) || isNaN(cellD)) return false;
                        if (key.endsWith('_start')) return cellD >= filterD;
                        if (key.endsWith('_end')) return cellD <= filterD;
                    }
                    // Soporte para vacíos en fechas
                    if (key.endsWith('_empty')) {
                        const baseKey = key.replace(/_empty$/, '');
                        if (value) {
                            return row[baseKey] === '' || row[baseKey] === null || row[baseKey] === undefined;
                        }
                    }
                    if (Array.isArray(value)) {
                        if (value.includes('__EMPTY__')) {
                            return value.includes(row[key]) || row[key] === '' || row[key] === null || row[key] === undefined;
                        }
                        return value.includes(row[key]);
                    }
                    if (value === '__EMPTY__') {
                        return row[key] === '' || row[key] === null || row[key] === undefined;
                    }
                    return row[key] === value;
                });
            });
            
            return filteredData.length;
        };

        this.dqUrgencyCards.forEach(card => {
            const btn = document.createElement('button');
            btn.textContent = card.label;
            btn.className = 'dq-hub-chip';
            btn.setAttribute('data-urgency', card.key);
            
            const isActive = window.activeDqUrgencyCards.includes(card.key);
            
            // Busca filtro asociado
            const filterEntry = Object.entries(quickFilters).find(([name, obj]) => obj.linkedUrgencyCard === card.key);
            
            // Comprobar compatibilidad de columnas
            let compatible = false;
            if (filterEntry) {
                const filterObj = filterEntry[1];
                const currentHeaders = Object.keys(window.getOriginalData ? window.getOriginalData()[0] || {} : {});
                const savedHeaders = filterObj.headers || [];
                const currentSet = new Set(currentHeaders);
                const savedSet = new Set(savedHeaders);
                compatible = currentSet.size === savedSet.size && [...currentSet].every(col => savedSet.has(col));
            }

            if (isActive) {
                btn.classList.add('active');
                btn.innerHTML = card.label;
            } else {
                btn.classList.remove('active');
                btn.innerHTML = card.label;
            }

            // Mostrar número de registros (igual que Ops Hub)
            if (filterEntry && compatible) {
                const countSpan = document.createElement('span');
                countSpan.style.display = 'inline-block'; // Mostrar el número de registros
                countSpan.style.marginLeft = '0.8em';
                countSpan.style.fontWeight = '600';
                countSpan.style.fontSize = '0.85em';
                countSpan.style.background = isActive ? 'rgba(255,255,255,0.95)' : 'rgba(71,178,229,0.15)';
                countSpan.style.color = isActive ? '#0B36AD' : '#47B2E5';
                countSpan.style.padding = '0.25em 0.6em';
                countSpan.style.borderRadius = '12px';
                countSpan.style.boxShadow = isActive ? '0 2px 8px rgba(11,54,173,0.2)' : '0 1px 4px rgba(71,178,229,0.15)';
                countSpan.style.border = isActive ? '1px solid rgba(11,54,173,0.2)' : '1px solid rgba(71,178,229,0.2)';
                countSpan.style.fontFamily = "'Inter', 'Segoe UI', Arial, sans-serif";
                countSpan.style.letterSpacing = '0.02em';
                countSpan.style.minWidth = '2.2em';
                countSpan.style.textAlign = 'center';
                countSpan.style.transition = 'all 0.2s ease';
                countSpan.textContent = getPreviewCount(card.key).toLocaleString();
                btn.appendChild(countSpan);
            }

            // Los estilos se manejan ahora completamente vía CSS
            // btn.style.borderRadius = '25px';
            // btn.style.fontWeight = '500';
            // btn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            // btn.style.padding = '0.75rem 1.5rem';
            // btn.style.fontFamily = "'Inter', 'Segoe UI', Arial, sans-serif";
            // btn.style.fontSize = '0.9rem';
            // btn.style.backdropFilter = 'blur(20px)';
            // btn.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.1)';

            // No agregar contador de registros (igual que Ops Hub)

            // Evento de click
            btn.addEventListener('click', () => {
                if (!compatible) {
                    if (typeof window.showUnifiedNotification === 'function') {
                        window.showUnifiedNotification(`This urgency card "${card.label}" cannot be applied to the current CSV.`, 'error');
                    }
                    return;
                }

                if (isActive) {
                    window.activeDqUrgencyCards = window.activeDqUrgencyCards.filter(k => k !== card.key);
                    // Show notification for deactivated urgency card
                    if (typeof window.showUnifiedNotification === 'function') {
                        window.showUnifiedNotification(`Urgency card "${card.label}" deactivated!`, 'info');
                    }
                } else {
                    window.activeDqUrgencyCards.push(card.key);
                    // Show notification for activated urgency card
                    if (typeof window.showUnifiedNotification === 'function') {
                        window.showUnifiedNotification(`Urgency card "${card.label}" activated!`, 'success');
                    }
                }

                // Aplicar filtros de urgencia
                this.applyDqUrgencyFilters();
                
                // Re-renderizar para actualizar estados
                setTimeout(() => {
                    this.renderDqUrgencyCards();
                }, 50);
            });

            urgencyCardsContainer.appendChild(btn);
        });
    }



    toggleDqDashboard() {
        if (this.dqDashboardModal) {
            this.dqDashboardModal.classList.toggle('hidden');
            if (!this.dqDashboardModal.classList.contains('hidden')) {
                if (typeof window.resetAllFilters === 'function') {
                    window.resetAllFilters();
                }
                this.renderDqQuickFilters();
                this.renderDqUrgencyCards();
                this.updateDqMetrics();
            }
        }
    }

    closeDqDashboard() {
        if (this.dqDashboardModal) {
            this.dqDashboardModal.classList.add('hidden');
        }
    }

    closeDqSummary() {
        if (this.dqSummaryModal) {
            this.dqSummaryModal.classList.add('hidden');
        }
    }

    filterByQuality(quality) {
        // Implement quality-based filtering logic
        console.log(`Filtering by quality: ${quality}`);
        this.updateDqMetrics();
    }

    updateDqMetrics() {
        // Calculate and update DQ metrics based on current data
        const data = window.getCurrentData ? window.getCurrentData() : [];
        
        if (data.length === 0) return;

        // Calculate duplicates
        const duplicates = this.calculateDuplicates(data);
        this.updateMetric('dq-duplicates', 'Total Duplicates', duplicates.total);
        this.updateMetric('dq-duplicates', 'Duplicate Rate', `${((duplicates.total / data.length) * 100).toFixed(1)}%`);
        this.updateMetric('dq-duplicates', 'Unique Records', data.length - duplicates.total);

        // Calculate null values
        const nulls = this.calculateNullValues(data);
        this.updateMetric('dq-nulls', 'Null Records', nulls.total);
        this.updateMetric('dq-nulls', 'Null Rate', `${((nulls.total / (data.length * Object.keys(data[0] || {}).length)) * 100).toFixed(1)}%`);
        this.updateMetric('dq-nulls', 'Complete Records', data.length - nulls.recordsWithNulls);

        // Calculate format issues
        const formatIssues = this.calculateFormatIssues(data);
        this.updateMetric('dq-format', 'Format Errors', formatIssues.total);
        this.updateMetric('dq-format', 'Error Rate', `${((formatIssues.total / (data.length * Object.keys(data[0] || {}).length)) * 100).toFixed(1)}%`);
        this.updateMetric('dq-format', 'Valid Records', data.length - formatIssues.recordsWithErrors);

        // Calculate completeness
        const completeness = this.calculateCompleteness(data);
        this.updateMetric('dq-completeness', 'Completeness Score', `${completeness.score.toFixed(1)}%`);
        this.updateMetric('dq-completeness', 'Missing Fields', completeness.missingFields);
        this.updateMetric('dq-completeness', 'Complete Fields', completeness.completeFields);

        // Calculate consistency
        const consistency = this.calculateConsistency(data);
        this.updateMetric('dq-consistency', 'Inconsistencies', consistency.inconsistencies);
        this.updateMetric('dq-consistency', 'Consistency Score', `${consistency.score.toFixed(1)}%`);
        this.updateMetric('dq-consistency', 'Consistent Records', data.length - consistency.recordsWithIssues);

        // Calculate accuracy
        const accuracy = this.calculateAccuracy(data);
        this.updateMetric('dq-accuracy', 'Accuracy Score', `${accuracy.score.toFixed(1)}%`);
        this.updateMetric('dq-accuracy', 'Validation Errors', accuracy.errors);
        this.updateMetric('dq-accuracy', 'Valid Records', data.length - accuracy.recordsWithErrors);
    }

    updateMetric(containerId, metricTitle, value) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const metricCard = container.querySelector(`[data-metric="${metricTitle.toLowerCase().replace(/\s+/g, '-')}"]`);
        if (metricCard) {
            const valueSpan = metricCard.querySelector('.kpi-value');
            if (valueSpan) {
                valueSpan.textContent = value;
            }
        }
    }

    calculateDuplicates(data) {
        if (!data || data.length === 0) return { total: 0, records: [] };

        const seen = new Set();
        const duplicates = [];
        
        data.forEach((row, index) => {
            const key = JSON.stringify(row);
            if (seen.has(key)) {
                duplicates.push(index);
            } else {
                seen.add(key);
            }
        });

        return { total: duplicates.length, records: duplicates };
    }

    calculateNullValues(data) {
        if (!data || data.length === 0) return { total: 0, recordsWithNulls: 0 };

        let totalNulls = 0;
        let recordsWithNulls = 0;

        data.forEach(row => {
            let rowHasNulls = false;
            Object.values(row).forEach(value => {
                if (value === null || value === undefined || value === '') {
                    totalNulls++;
                    rowHasNulls = true;
                }
            });
            if (rowHasNulls) recordsWithNulls++;
        });

        return { total: totalNulls, recordsWithNulls };
    }

    calculateFormatIssues(data) {
        if (!data || data.length === 0) return { total: 0, recordsWithErrors: 0 };

        let totalErrors = 0;
        let recordsWithErrors = 0;

        data.forEach(row => {
            let rowHasErrors = false;
            Object.entries(row).forEach(([key, value]) => {
                // Basic format validation
                if (value !== null && value !== undefined && value !== '') {
                    // Check for common format issues
                    if (typeof value === 'string') {
                        // Check for excessive whitespace
                        if (value.trim() !== value) {
                            totalErrors++;
                            rowHasErrors = true;
                        }
                        // Check for mixed case inconsistencies
                        if (key.toLowerCase().includes('email') && !value.includes('@')) {
                            totalErrors++;
                            rowHasErrors = true;
                        }
                    }
                }
            });
            if (rowHasErrors) recordsWithErrors++;
        });

        return { total: totalErrors, recordsWithErrors };
    }

    calculateCompleteness(data) {
        if (!data || data.length === 0) return { score: 0, missingFields: 0, completeFields: 0 };

        const totalFields = data.length * Object.keys(data[0] || {}).length;
        let completeFields = 0;

        data.forEach(row => {
            Object.values(row).forEach(value => {
                if (value !== null && value !== undefined && value !== '') {
                    completeFields++;
                }
            });
        });

        const missingFields = totalFields - completeFields;
        const score = totalFields > 0 ? (completeFields / totalFields) * 100 : 0;

        return { score, missingFields, completeFields };
    }

    calculateConsistency(data) {
        if (!data || data.length === 0) return { score: 0, inconsistencies: 0, recordsWithIssues: 0 };

        let inconsistencies = 0;
        let recordsWithIssues = 0;

        // Check for consistency issues (simplified)
        const columnTypes = {};
        data.forEach(row => {
            let rowHasIssues = false;
            Object.entries(row).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    const type = typeof value;
                    if (!columnTypes[key]) {
                        columnTypes[key] = type;
                    } else if (columnTypes[key] !== type) {
                        inconsistencies++;
                        rowHasIssues = true;
                    }
                }
            });
            if (rowHasIssues) recordsWithIssues++;
        });

        const score = data.length > 0 ? ((data.length - recordsWithIssues) / data.length) * 100 : 0;

        return { score, inconsistencies, recordsWithIssues };
    }

    calculateAccuracy(data) {
        if (!data || data.length === 0) return { score: 0, errors: 0, recordsWithErrors: 0 };

        let errors = 0;
        let recordsWithErrors = 0;

        // Basic accuracy validation (simplified)
        data.forEach(row => {
            let rowHasErrors = false;
            Object.entries(row).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    // Basic business rule validation
                    if (key.toLowerCase().includes('email') && typeof value === 'string') {
                        if (!value.includes('@') || !value.includes('.')) {
                            errors++;
                            rowHasErrors = true;
                        }
                    }
                    if (key.toLowerCase().includes('phone') && typeof value === 'string') {
                        if (value.length < 7) {
                            errors++;
                            rowHasErrors = true;
                        }
                    }
                }
            });
            if (rowHasErrors) recordsWithErrors++;
        });

        const score = data.length > 0 ? ((data.length - recordsWithErrors) / data.length) * 100 : 0;

        return { score, errors, recordsWithErrors };
    }



    showNotification(message, type = 'info') {
        if (typeof window.showUnifiedNotification === 'function') {
            window.showUnifiedNotification(message, type);
        } else {
            // Fallback simple
            console.log(`Notification [${type}]:`, message);
            }
    }

    loadDqQuickFilters() {
        try {
            const saved = localStorage.getItem('quickFilters');
            const allFilters = saved ? JSON.parse(saved) : {};
            
            // Also load duplicate detection filters for DQ Hub
            const duplicateFilters = JSON.parse(localStorage.getItem('duplicateQuickFilters') || '{}');
            const dqDuplicateFilters = Object.entries(duplicateFilters)
                .filter(([name, filter]) => filter.hubType === 'dq')
                .reduce((acc, [name, filter]) => {
                    // Convert duplicate filter to regular filter format for compatibility
                    acc[name] = {
                        ...filter,
                        filterValues: {
                            _duplicateDetection: true,
                            _duplicateColumns: filter.duplicateColumns || []
                        },
                        activeFilters: {
                            _duplicateDetection: 'duplicate_detection'
                        },
                        duplicateDetection: true,
                        duplicateColumns: filter.duplicateColumns || []
                    };
                    return acc;
                }, {});
            
            // Filter only DQ Hub filters and combine with duplicate filters
            const regularFilters = Object.entries(allFilters)
                .filter(([name, filter]) => filter.hubType === 'dq')
                .reduce((acc, [name, filter]) => {
                    acc[name] = filter;
                    return acc;
                }, {});
            
            // Combine both types of filters
            return { ...regularFilters, ...dqDuplicateFilters };
        } catch (error) {
            console.error('Error loading DQ quick filters:', error);
            return {};
        }
    }

    getDqQuickFilterPreviewCount(name) {
        const data = window.getOriginalData ? window.getOriginalData() : [];
        if (!data || !data.length) return 0;
        
        const quickFilters = this.loadDqQuickFilters();
        const filterObj = quickFilters[name];
        if (!filterObj) return 0;
        
        // Check if this is a duplicate detection filter
        if (filterObj.duplicateDetection || filterObj.type === 'duplicate_detection') {
            const duplicateColumns = filterObj.duplicateColumns || [];
            if (duplicateColumns.length === 0) return 0;
            
            // Use the same function as when applying the filter
            const duplicates = window.findDuplicateRecords ? window.findDuplicateRecords(data, duplicateColumns) : [];
            
            return duplicates.length;
        }
        
        // Regular filter logic
        // Guardar el estado actual de filtros
        const currentActiveFilters = window.getModuleActiveFilters ? { ...window.getModuleActiveFilters() } : {};
        const currentFilterValues = window.getModuleFilterValues ? { ...window.getModuleFilterValues() } : {};
        
        // APLICAR SOLO EL QUICK FILTER SIN COMBINAR CON FILTROS ACTUALES
        const quickFilterActiveFilters = {};
        const quickFilterValues = {};
        
        // Añadir los filtros del quick filter
        const filterValues = filterObj.filterValues || {};
        const savedActiveFilters = filterObj.activeFilters || {};
        
        Object.entries(filterValues).forEach(([key, value]) => {
            // Usar el tipo de filtro guardado si está disponible
            if (savedActiveFilters[key]) {
                quickFilterActiveFilters[key] = savedActiveFilters[key];
            } else {
                // Fallback a la lógica anterior
                if (key.endsWith('_start') || key.endsWith('_end') || key.endsWith('_empty')) {
                    const base = key.replace(/_(start|end|empty)$/, '');
                    quickFilterActiveFilters[base] = 'date';
                } else if (Array.isArray(value)) {
                    quickFilterActiveFilters[key] = 'categorical';
                } else {
                    quickFilterActiveFilters[key] = 'text';
                }
            }
            
            // Aplicar directamente el valor del quick filter
            quickFilterValues[key] = value;
        });
        
        // Aplicar SOLO el quick filter
        if (window.setModuleActiveFilters && window.setModuleFilterValues) {
            window.setModuleActiveFilters(quickFilterActiveFilters);
            window.setModuleFilterValues(quickFilterValues);
            
            // Obtener el número de filas filtradas usando la función estándar
            const filteredData = window.getFilteredData ? window.getFilteredData() : [];
            const count = filteredData.length;
            
            // Restaurar el estado original de filtros
            window.setModuleActiveFilters(currentActiveFilters);
            window.setModuleFilterValues(currentFilterValues);
            
            return count;
        }
        
        return 0;
    }

    applyDqQuickFilters() {
        this.applyDqCombinedFilters();
    }

    applyDqCombinedFilters() {
        const data = window.getOriginalData ? window.getOriginalData() : [];
        if (!data || !data.length) {
            if (window.displayTable) window.displayTable([]);
            return;
        }

        const quickFilters = this.loadDqQuickFilters();
        const activeNames = this.dqActiveFilters || [];
        const activeUrgencyCards = window.activeDqUrgencyCards || [];
        let combinedFilterValues = {};
        let combinedActiveFilters = {};

        // Check if any active filters are duplicate detection filters
        let hasDuplicateFilters = false;
        activeNames.forEach(name => {
            const filterObj = quickFilters[name];
            if (filterObj && (filterObj.duplicateDetection || filterObj.type === 'duplicate_detection')) {
                hasDuplicateFilters = true;
            }
        });

        // Aplicar filtros de quick filters normales
        activeNames.forEach(name => {
            const filterObj = quickFilters[name];
            if (filterObj) {
                // Check if this is a duplicate detection filter
                if (filterObj.duplicateDetection || filterObj.type === 'duplicate_detection') {
                    // Handle duplicate detection filter
                    const duplicateColumns = filterObj.duplicateColumns || [];
                    if (duplicateColumns.length > 0) {
                        // Use original data for duplicate detection (not filtered data)
                        const originalData = window.getOriginalData ? window.getOriginalData() : data;
                        
                        // Find duplicate records using the same logic as showDuplicates
                        const duplicates = window.findDuplicateRecords ? window.findDuplicateRecords(originalData, duplicateColumns) : [];
                        
                        if (duplicates.length > 0) {
                            // Apply duplicates as a filter to the main table
                            if (typeof window.applyDuplicatesAsFilter === 'function') {
                                window.applyDuplicatesAsFilter(duplicates, duplicateColumns, name);
                            }
                            
                            // Show notification
                            if (typeof window.showUnifiedNotification === 'function') {
                                window.showUnifiedNotification(`Applied duplicate filter: ${duplicates.length} duplicate records found.`, 'success');
                            }
                        } else {
                            if (typeof window.showUnifiedNotification === 'function') {
                                window.showUnifiedNotification('No duplicates found with the current configuration.', 'info');
                            }
                        }
                        
                        return; // Skip regular filter application for duplicate filters
                    }
                }
                
                // Regular filter logic
                // Usar activeFilters guardados si están disponibles
                const savedActiveFilters = filterObj.activeFilters || {};
                const savedFilterValues = filterObj.filterValues || {};
                
                for (const key in savedFilterValues) {
                    const value = savedFilterValues[key];
                    if (combinedFilterValues[key]) {
                        if (Array.isArray(combinedFilterValues[key]) || Array.isArray(value)) {
                            const arr1 = Array.isArray(combinedFilterValues[key]) ? combinedFilterValues[key] : [combinedFilterValues[key]];
                            const arr2 = Array.isArray(value) ? value : [value];
                            combinedFilterValues[key] = Array.from(new Set([...arr1, ...arr2]));
                            combinedActiveFilters[key] = 'categorical';
                        } else {
                            if (combinedFilterValues[key] !== value) {
                                combinedFilterValues[key] = [combinedFilterValues[key], value];
                                combinedActiveFilters[key] = 'categorical';
                            }
                        }
                    } else {
                        combinedFilterValues[key] = value;
                        // Usar el tipo de filtro guardado si está disponible
                        if (savedActiveFilters[key]) {
                            combinedActiveFilters[key] = savedActiveFilters[key];
                        } else {
                            // Fallback a la lógica anterior
                            if (key.endsWith('_start') || key.endsWith('_end') || key.endsWith('_empty')) {
                                const base = key.replace(/_(start|end|empty)$/, '');
                                combinedActiveFilters[base] = 'date';
                            } else if (Array.isArray(value)) {
                                combinedActiveFilters[key] = 'categorical';
                            } else {
                                combinedActiveFilters[key] = 'text';
                            }
                        }
                    }
                }
            }
        });

        // Aplicar filtros de cards de urgencia (intersección)
        activeUrgencyCards.forEach(cardKey => {
            const entry = Object.entries(quickFilters).find(([name, obj]) => obj.linkedUrgencyCard === cardKey);
            
            if (entry) {
                const [, filterObj] = entry;
                const savedActiveFilters = filterObj.activeFilters || {};
                const savedFilterValues = filterObj.filterValues || {};
                
                for (const key in savedFilterValues) {
                    const value = savedFilterValues[key];
                    if (combinedFilterValues[key]) {
                        // Combinar valores de filtros de forma correcta (intersección)
                        if (Array.isArray(combinedFilterValues[key]) && Array.isArray(value)) {
                            const intersection = combinedFilterValues[key].filter(v => value.includes(v));
                            combinedFilterValues[key] = intersection.length > 0 ? intersection : value;
                        } else if (Array.isArray(combinedFilterValues[key])) {
                            if (!combinedFilterValues[key].includes(value)) {
                                combinedFilterValues[key] = [];
                            }
                        } else if (Array.isArray(value)) {
                            if (!value.includes(combinedFilterValues[key])) {
                                combinedFilterValues[key] = [];
                            } else {
                                combinedFilterValues[key] = combinedFilterValues[key];
                            }
                        } else {
                            if (combinedFilterValues[key] !== value) {
                                combinedFilterValues[key] = [];
                            }
                        }
                    } else {
                        combinedFilterValues[key] = value;
                        if (savedActiveFilters[key]) {
                            combinedActiveFilters[key] = savedActiveFilters[key];
                        } else {
                            if (key.endsWith('_start') || key.endsWith('_end') || key.endsWith('_empty')) {
                                const base = key.replace(/_(start|end|empty)$/, '');
                                combinedActiveFilters[base] = 'date';
                            } else if (Array.isArray(value)) {
                                combinedActiveFilters[key] = 'categorical';
                            } else {
                                combinedActiveFilters[key] = 'text';
                            }
                        }
                    }
                }
            }
        });

        // Apply the combined filters using the same logic as Ops Hub
        // Skip regular filter application if duplicate filters are active
        if (!hasDuplicateFilters && window.setModuleFilterValues && window.setModuleActiveFilters) {
            window.setModuleFilterValues(combinedFilterValues);
            window.setModuleActiveFilters(combinedActiveFilters);
            
            // Usar las funciones globales disponibles
            if (window.getFilteredData) {
                const filteredData = window.getFilteredData();
                if (window.displayTable) {
                    window.displayTable(filteredData);
                } else if (typeof displayTable === 'function') {
                    displayTable(filteredData);
                }
            }
            
            if (window.renderActiveFiltersSummaryChips) {
                window.renderActiveFiltersSummaryChips();
            }
        }
    }

    generateDqSummary() {
        if (this.dqSummaryModal) {
            this.dqSummaryModal.classList.remove('hidden');
            this.updateDqSummaryPreview();
        }
    }

    updateDqSummaryPreview() {
        const previewContainer = document.getElementById('dqSummaryPreview');
        if (!previewContainer) return;

        const summary = this.generateDqSummaryContent();
        previewContainer.innerHTML = summary;
    }

    generateDqSummaryContent() {
        const data = window.getCurrentData ? window.getCurrentData() : [];
        const includeTableData = document.getElementById('dqIncludeTableDataCheckbox')?.checked || false;
        const includeTechnicalInfo = document.getElementById('dqIncludeTechnicalInfoCheckbox')?.checked || false;
        const removeDuplicates = document.getElementById('dqRemoveDuplicatesCheckbox')?.checked || false;

        let summary = `
            <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1a2332; border-bottom: 2px solid #47B2E5; padding-bottom: 10px;">Data Quality Summary Report</h1>
                <p style="color: #666; margin-bottom: 20px;">Generated on ${new Date().toLocaleString()}</p>
        `;

        if (includeTechnicalInfo) {
            summary += `
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="color: #1a2332; margin-top: 0;">Technical Information</h3>
                    <p><strong>Total Records:</strong> ${data.length}</p>
                    <p><strong>Total Fields:</strong> ${data.length > 0 ? Object.keys(data[0]).length : 0}</p>
                    <p><strong>Report Type:</strong> Data Quality Analysis</p>
                </div>
            `;
        }

        // Add DQ metrics summary
        summary += this.generateDqMetricsSummary(data);

        if (includeTableData && data.length > 0) {
            summary += this.generateDqTableData(data, removeDuplicates);
        }

        summary += '</div>';
        return summary;
    }

    generateDqMetricsSummary(data) {
        const duplicates = this.calculateDuplicates(data);
        const nulls = this.calculateNullValues(data);
        const formatIssues = this.calculateFormatIssues(data);
        const completeness = this.calculateCompleteness(data);
        const consistency = this.calculateConsistency(data);
        const accuracy = this.calculateAccuracy(data);

        return `
            <div style="margin-bottom: 30px;">
                <h2 style="color: #1a2332; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Data Quality Metrics</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 15px;">
                    <div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
                        <h4 style="color: #dc3545; margin-top: 0;">Duplicate Analysis</h4>
                        <p><strong>Total Duplicates:</strong> ${duplicates.total}</p>
                        <p><strong>Duplicate Rate:</strong> ${((duplicates.total / data.length) * 100).toFixed(1)}%</p>
                    </div>
                    
                    <div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
                        <h4 style="color: #ffc107; margin-top: 0;">Null Values</h4>
                        <p><strong>Total Nulls:</strong> ${nulls.total}</p>
                        <p><strong>Null Rate:</strong> ${((nulls.total / (data.length * Object.keys(data[0] || {}).length)) * 100).toFixed(1)}%</p>
                    </div>
                    
                    <div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
                        <h4 style="color: #17a2b8; margin-top: 0;">Format Issues</h4>
                        <p><strong>Format Errors:</strong> ${formatIssues.total}</p>
                        <p><strong>Error Rate:</strong> ${((formatIssues.total / (data.length * Object.keys(data[0] || {}).length)) * 100).toFixed(1)}%</p>
                    </div>
                    
                    <div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
                        <h4 style="color: #28a745; margin-top: 0;">Completeness</h4>
                        <p><strong>Completeness Score:</strong> ${completeness.score.toFixed(1)}%</p>
                        <p><strong>Missing Fields:</strong> ${completeness.missingFields}</p>
                    </div>
                    
                    <div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
                        <h4 style="color: #6f42c1; margin-top: 0;">Consistency</h4>
                        <p><strong>Consistency Score:</strong> ${consistency.score.toFixed(1)}%</p>
                        <p><strong>Inconsistencies:</strong> ${consistency.inconsistencies}</p>
                    </div>
                    
                    <div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
                        <h4 style="color: #fd7e14; margin-top: 0;">Accuracy</h4>
                        <p><strong>Accuracy Score:</strong> ${accuracy.score.toFixed(1)}%</p>
                        <p><strong>Validation Errors:</strong> ${accuracy.errors}</p>
                    </div>
                </div>
            </div>
        `;
    }

    generateDqTableData(data, removeDuplicates) {
        let processedData = [...data];
        
        if (removeDuplicates) {
            processedData = this.removeDuplicatesFromData(data);
        }

        const limitedData = processedData.slice(0, 50); // Limit to first 50 rows

        if (limitedData.length === 0) {
            return '<p style="color: #666; font-style: italic;">No data available for table display.</p>';
        }

        const columns = Object.keys(limitedData[0]);
        
        let tableHtml = `
            <div style="margin-bottom: 30px;">
                <h2 style="color: #1a2332; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Sample Data (${limitedData.length} rows)</h2>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <thead>
                            <tr style="background: #f8f9fa;">
        `;

        columns.forEach(column => {
            tableHtml += `<th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold;">${column}</th>`;
        });

        tableHtml += '</tr></thead><tbody>';

        limitedData.forEach(row => {
            tableHtml += '<tr>';
            columns.forEach(column => {
                const value = row[column] !== null && row[column] !== undefined ? row[column] : '';
                tableHtml += `<td style="border: 1px solid #ddd; padding: 6px; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${value}</td>`;
            });
            tableHtml += '</tr>';
        });

        tableHtml += '</tbody></table></div></div>';

        return tableHtml;
    }

    removeDuplicatesFromData(data) {
        const seen = new Set();
        return data.filter(row => {
            const key = JSON.stringify(row);
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    copyDqSummaryToClipboard() {
        const summary = this.generateDqSummaryContent();
        
        // Create temporary textarea to copy HTML
        const textarea = document.createElement('textarea');
        textarea.value = summary;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        this.showNotification('DQ Summary copied to clipboard!', 'success');
    }

    exportDqSummaryPdf() {
        this.showNotification('PDF export functionality will be implemented soon.', 'info');
    }

    exportDqSummaryExcel() {
        // Use the DqHubSummary export function
        if (window.dqHubSummary && typeof window.dqHubSummary.exportToExcel === 'function') {
            window.dqHubSummary.exportToExcel();
        } else {
            this.showNotification('Excel export functionality is not available. Please try again.', 'error');
        }
    }

    selectAllDqDuplicateColumns() {
        const checkboxes = document.querySelectorAll('#dqDuplicateColumnsList .duplicate-column-checkbox');
        checkboxes.forEach(checkbox => checkbox.checked = true);
        this.updateDqSelectedFieldsCount();
    }

    deselectAllDqDuplicateColumns() {
        const checkboxes = document.querySelectorAll('#dqDuplicateColumnsList .duplicate-column-checkbox');
        checkboxes.forEach(checkbox => checkbox.checked = false);
        this.updateDqSelectedFieldsCount();
    }

    selectCommonDqFields() {
        // Implement common fields selection logic
        this.showNotification('Common fields selection will be implemented soon.', 'info');
    }

    filterDqDuplicateColumns(searchTerm) {
        console.log('🔍 Filtering DQ duplicate columns with term:', searchTerm);
        const checkboxes = document.querySelectorAll('#dqDuplicateColumnsList .duplicate-column-checkbox');
        
        if (checkboxes.length === 0) {
            console.log('⚠️ No checkboxes found in dqDuplicateColumnsList');
            return;
        }
        
        let visibleCount = 0;
        checkboxes.forEach(checkbox => {
            // En la estructura del DQ Hub, el checkbox está dentro de un label
            const label = checkbox.closest('label');
            const columnItem = checkbox.closest('.column-checkbox-item');
            
            if (!label || !columnItem) {
                console.log('⚠️ Could not find label or column item for checkbox');
                return;
            }
            
            // Obtener el texto del label (excluyendo los badges)
            const labelText = label.textContent.trim();
            const fieldName = checkbox.value || columnItem.getAttribute('data-field') || '';
            
            console.log(`Field: "${fieldName}" - Label: "${labelText}" - Searching for: "${searchTerm}"`);
            
            if (searchTerm === '' || fieldName.toLowerCase().includes(searchTerm.toLowerCase()) || labelText.toLowerCase().includes(searchTerm.toLowerCase())) {
                columnItem.style.display = 'block';
                visibleCount++;
            } else {
                columnItem.style.display = 'none';
            }
        });
        
        console.log(`✅ Filtered ${checkboxes.length} checkboxes, ${visibleCount} visible`);
    }

    updateDqSelectedFieldsCount() {
        const checkboxes = document.querySelectorAll('#dqDuplicateColumnsList .duplicate-column-checkbox:checked');
        const countSpan = document.getElementById('dqSelectedFieldsCount');
        if (countSpan) {
            countSpan.textContent = checkboxes.length;
        }
    }

    applyDqUrgencyFilters() {
        const data = window.getOriginalData ? window.getOriginalData() : [];
        if (!data || !data.length) {
            if (typeof window.displayTable === 'function') {
                window.displayTable([]);
            }
            return;
        }

        // Cargar quick filters del DQ Hub
        const quickFilters = this.loadDqQuickFilters();
        const activeUrgencyCards = window.activeDqUrgencyCards || [];

        // Combinar filtros de urgencia activos
        let combinedFilterValues = {};
        let combinedActiveFilters = {};

        activeUrgencyCards.forEach(cardKey => {
            const entry = Object.entries(quickFilters).find(([name, obj]) => obj.linkedUrgencyCard === cardKey);
            
            if (entry) {
                const [, filterObj] = entry;
                
                for (const k in filterObj.filterValues) {
                    const value = filterObj.filterValues[k];
                    if (combinedFilterValues[k]) {
                        // Combinar valores de filtros de forma correcta (intersección)
                        if (Array.isArray(combinedFilterValues[k]) && Array.isArray(value)) {
                            const intersection = combinedFilterValues[k].filter(v => value.includes(v));
                            combinedFilterValues[k] = intersection.length > 0 ? intersection : value;
                        } else if (Array.isArray(combinedFilterValues[k])) {
                            if (!combinedFilterValues[k].includes(value)) {
                                combinedFilterValues[k] = [];
                            }
                        } else if (Array.isArray(value)) {
                            if (!value.includes(combinedFilterValues[k])) {
                                combinedFilterValues[k] = [];
                            } else {
                                combinedFilterValues[k] = combinedFilterValues[k];
                            }
                        } else {
                            if (combinedFilterValues[k] !== value) {
                                combinedFilterValues[k] = [];
                            }
                        }
                    } else {
                        combinedFilterValues[k] = value;
                        if (k.endsWith('_start') || k.endsWith('_end') || k.endsWith('_empty')) {
                            const base = k.replace(/_(start|end|empty)$/, '');
                            combinedActiveFilters[base] = 'date';
                        } else if (Array.isArray(value)) {
                            combinedActiveFilters[k] = 'categorical';
                        } else {
                            combinedActiveFilters[k] = 'text';
                        }
                    }
                }
            }
        });

        // Aplicar filtros combinados
        if (Object.keys(combinedFilterValues).length > 0) {
            const filteredData = data.filter(row => {
                return Object.entries(combinedFilterValues).every(([key, value]) => {
                    // Soporte para filtros de fecha con _start y _end
                    if (key.endsWith('_start') || key.endsWith('_end')) {
                        const baseKey = key.replace(/_(start|end)$/, '');
                        const cellValue = row[baseKey];
                        if ((cellValue === '' || cellValue === null || cellValue === undefined) && (combinedFilterValues[`${baseKey}_empty`] || value === '__EMPTY__')) {
                            return true;
                        }
                        if (!cellValue) return false;
                        let filterDate = value;
                        let cellDate = cellValue;
                        if (typeof window.resolveDynamicDateExpr === 'function') {
                            filterDate = window.resolveDynamicDateExpr(value);
                        }
                        const filterD = typeof window.parseFlexibleDate === 'function' ? window.parseFlexibleDate(filterDate) : new Date(filterDate);
                        const cellD = typeof window.parseFlexibleDate === 'function' ? window.parseFlexibleDate(cellDate) : new Date(cellDate);
                        if (!filterD || !cellD || isNaN(filterD) || isNaN(cellD)) return false;
                        if (key.endsWith('_start')) return cellD >= filterD;
                        if (key.endsWith('_end')) return cellD <= filterD;
                    }
                    // Soporte para vacíos en fechas
                    if (key.endsWith('_empty')) {
                        const baseKey = key.replace(/_empty$/, '');
                        if (value) {
                            return row[baseKey] === '' || row[baseKey] === null || row[baseKey] === undefined;
                        }
                    }
                    if (Array.isArray(value)) {
                        if (value.includes('__EMPTY__')) {
                            return value.includes(row[key]) || row[key] === '' || row[key] === null || row[key] === undefined;
                        }
                        return value.includes(row[key]);
                    }
                    if (value === '__EMPTY__') {
                        return row[key] === '' || row[key] === null || row[key] === undefined;
                    }
                    return row[key] === value;
                });
            });

            if (typeof window.displayTable === 'function') {
                window.displayTable(filteredData);
            }
        } else {
            // Si no hay filtros activos, mostrar todos los datos
            if (typeof window.displayTable === 'function') {
                window.displayTable(data);
            }
        }

        // Actualizar métricas del DQ Hub
        this.updateDqMetrics();
        
        // Aplicar filtros combinados
        this.applyDqCombinedFilters();
        
        // 🎯 ACTUALIZAR LAS TARJETAS DE URGENCIA CON LOS DATOS FILTRADOS
        // Obtener los datos filtrados actuales
        const currentData = typeof window.getFilteredData === 'function' ? window.getFilteredData() : data;
        
        // Re-renderizar las tarjetas de urgencia con los datos filtrados
        this.renderDqUrgencyCards();
        
        // 🎯 DISPARAR EVENTO PARA ANALYTICS DASHBOARD
        // Notificar al Analytics Dashboard que los filtros han cambiado
        if (window.analyticsDashboard && window.analyticsDashboard.isOpen()) {
            console.log('🔄 Triggering analytics update from DQ Hub filters...');
            setTimeout(() => {
                window.analyticsDashboard.onQuickFiltersChanged();
            }, 100);
        }
        
        // También disparar eventos globales para otros componentes
        window.dispatchEvent(new CustomEvent('filtersChanged', { 
            detail: { 
                activeQuickFilters: [],
                activeUrgencyCards: window.activeDqUrgencyCards || [],
                hubType: 'dq'
            } 
        }));
    }

    saveDqPreferences() {
        // Show save preferences modal
        this.showSavePreferencesModal();
    }

    showSavePreferencesModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'dqSavePreferencesModal';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.1); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);';
        
        const content = document.createElement('div');
        content.className = 'modal-panel';
        content.style.cssText = 'background: #1a2332 !important; border: 2px solid rgba(255,255,255,0.3) !important; border-radius: 12px; padding: 0; max-width: 500px; width: 90%; max-height: 80vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 25px 80px rgba(0,0,0,0.95) !important; opacity: 1 !important;';
        
        // Get current preferences
        const currentPrefs = {
            includeTableData: document.getElementById('dqIncludeTableDataCheckbox')?.checked || false,
            includeTechnicalInfo: document.getElementById('dqIncludeTechnicalInfoCheckbox')?.checked || false,
            removeDuplicates: document.getElementById('dqRemoveDuplicatesCheckbox')?.checked || false,
            duplicateColumns: Array.from(document.querySelectorAll('#dqDuplicateColumnsList .duplicate-column-checkbox:checked')).map(cb => cb.value)
        };
        
        // Get current state for complete preview
        const selectedCards = window.dqHubSummary ? Array.from(window.dqHubSummary.selectedCards) : [];
        const selectedCardsNames = selectedCards.map(cardId => {
            return window.dqHubSummary?.quickCardsData[cardId]?.name || cardId;
        });
        const activeFilters = window.activeDqQuickFilters || [];
        const activeUrgency = window.activeDqUrgencyCards || [];
        const savedViewsCount = window.loadSavedViews ? Object.keys(window.loadSavedViews()).length : 0;
        
        content.innerHTML = `
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05) !important;">
                <div class="header-left" style="display: flex; align-items: center; gap: 1rem;">
                    <img src="./LOGOTAB_rounded.png" alt="Logo" style="width: 32px; height: 32px; border-radius: 6px; box-shadow: 0 2px 8px rgba(71,178,229,0.3);" onerror="console.error('Error loading logo:', this.src);">
                    <h3 style="color: white; margin: 0; font-size: 1.3rem;">Save Complete DQ Preferences</h3>
                </div>
                <button class="close-btn" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0.5rem;">×</button>
            </div>
            
            <div class="modal-content" style="padding: 2rem; background: transparent !important;">
                <div style="margin-bottom: 1.5rem;">
                    <p style="color: rgba(255,255,255,0.8); margin-bottom: 1rem;">Complete configuration to save:</p>
                    <div style="background: rgba(255,255,255,0.1) !important; border: 1px solid rgba(255,255,255,0.2) !important; border-radius: 8px; padding: 1rem; opacity: 1 !important;">
                        <div class="preference-details" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="color: ${currentPrefs.includeTableData ? '#4CAF50' : '#f44336'}; font-size: 1.2rem;">${currentPrefs.includeTableData ? '✓' : '✗'}</span>
                                <span style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Table Data</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="color: ${currentPrefs.includeTechnicalInfo ? '#4CAF50' : '#f44336'}; font-size: 1.2rem;">${currentPrefs.includeTechnicalInfo ? '✓' : '✗'}</span>
                                <span style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Technical Info</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="color: ${currentPrefs.removeDuplicates ? '#4CAF50' : '#f44336'}; font-size: 1.2rem;">${currentPrefs.removeDuplicates ? '✓' : '✗'}</span>
                                <span style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Remove Duplicates</span>
                            </div>
                        </div>
                        
                        <div style="background: rgba(71,178,229,0.1) !important; border-radius: 8px; padding: 1rem; margin-top: 1rem; opacity: 1 !important; border: 1px solid rgba(71,178,229,0.2) !important;">
                            <div style="color: #47B2E5; font-size: 0.9rem; margin-bottom: 0.5rem; font-weight: 600;">Selected Cards (${selectedCards.length}):</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin-bottom: 0.5rem;">
                                ${selectedCardsNames.length > 0 ? selectedCardsNames.join(', ') : 'None selected'}
                            </div>
                        </div>
                        
                        <div style="background: rgba(255,255,255,0.1) !important; border-radius: 8px; padding: 1rem; margin-top: 1rem; opacity: 1 !important;">
                            <div style="color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-bottom: 0.5rem; font-weight: 500;">Active Filters:</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin-bottom: 0.5rem;">
                                <strong>Quick Filters (${activeFilters.length}):</strong> ${activeFilters.length > 0 ? activeFilters.join(', ') : 'None'}
                            </div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 0.85rem;">
                                <strong>Urgency Cards (${activeUrgency.length}):</strong> ${activeUrgency.length > 0 ? activeUrgency.join(', ') : 'None'}
                            </div>
                        </div>
                        
                        ${currentPrefs.duplicateColumns.length > 0 ? `
                            <div style="background: rgba(255,255,255,0.2) !important; border-radius: 8px; padding: 1rem; margin-top: 1rem; opacity: 1 !important;">
                                <div style="color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-bottom: 0.5rem; font-weight: 500;">Duplicate Fields:</div>
                                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                                    ${currentPrefs.duplicateColumns.map(field => `
                                        <span style="background: rgba(71, 178, 229, 0.2); color: #47B2E5; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; border: 1px solid rgba(71, 178, 229, 0.3);">
                                            ${field}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        <div style="background: rgba(76,175,80,0.1) !important; border-radius: 8px; padding: 1rem; margin-top: 1rem; opacity: 1 !important; border: 1px solid rgba(76,175,80,0.2) !important;">
                            <div style="color: #4CAF50; font-size: 0.9rem; font-weight: 600;">Complete State Save</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin-top: 0.3rem;">
                                This will save everything: ${selectedCards.length} cards, ${activeFilters.length} filters, ${savedViewsCount} saved views, and all report settings for instant restoration.
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; color: rgba(255,255,255,0.9); margin-bottom: 0.5rem; font-weight: 500;">Configuration Name (optional):</label>
                    <input type="text" id="preferenceNameInput" 
                           placeholder="Enter a name for this configuration..." 
                           style="width: 100%; padding: 0.75rem; border: 1px solid rgba(255,255,255,0.3) !important; border-radius: 6px; background: rgba(255,255,255,0.1) !important; color: white; font-size: 0.9rem; opacity: 1 !important;"
                           value="DQ Preferences ${new Date().toLocaleDateString()}">
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: white; margin-bottom: 1rem; font-size: 1.1rem;">Complete Configuration Preview:</h4>
                    <div style="background: rgba(255,255,255,0.25) !important; border-radius: 12px; padding: 1.5rem; border: 2px solid rgba(255,255,255,0.2) !important; opacity: 1 !important;">
                        <div class="preference-details" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="color: ${currentPrefs.includeTableData ? '#4CAF50' : '#f44336'}; font-size: 1.2rem;">${currentPrefs.includeTableData ? '✓' : '✗'}</span>
                                <span style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Table Data</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="color: ${currentPrefs.includeTechnicalInfo ? '#4CAF50' : '#f44336'}; font-size: 1.2rem;">${currentPrefs.includeTechnicalInfo ? '✓' : '✗'}</span>
                                <span style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Technical Info</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="color: ${currentPrefs.removeDuplicates ? '#4CAF50' : '#f44336'}; font-size: 1.2rem;">${currentPrefs.removeDuplicates ? '✓' : '✗'}</span>
                                <span style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Remove Duplicates</span>
                            </div>
                        </div>
                        
                        <div style="background: rgba(71,178,229,0.1) !important; border-radius: 8px; padding: 1rem; margin-top: 1rem; opacity: 1 !important; border: 1px solid rgba(71,178,229,0.2) !important;">
                            <div style="color: #47B2E5; font-size: 0.9rem; margin-bottom: 0.5rem; font-weight: 600;">Selected Cards (${selectedCards.length}):</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin-bottom: 0.5rem;">
                                ${selectedCardsNames.length > 0 ? selectedCardsNames.join(', ') : 'None selected'}
                            </div>
                        </div>
                        
                        <div style="background: rgba(255,255,255,0.1) !important; border-radius: 8px; padding: 1rem; margin-top: 1rem; opacity: 1 !important;">
                            <div style="color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-bottom: 0.5rem; font-weight: 500;">Active Filters:</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin-bottom: 0.5rem;">
                                <strong>Quick Filters (${activeFilters.length}):</strong> ${activeFilters.length > 0 ? activeFilters.join(', ') : 'None'}
                            </div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 0.85rem;">
                                <strong>Urgency Cards (${activeUrgency.length}):</strong> ${activeUrgency.length > 0 ? activeUrgency.join(', ') : 'None'}
                            </div>
                        </div>
                        
                        ${currentPrefs.duplicateColumns.length > 0 ? `
                            <div style="background: rgba(255,255,255,0.2) !important; border-radius: 8px; padding: 1rem; margin-top: 1rem; opacity: 1 !important;">
                                <div style="color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-bottom: 0.5rem; font-weight: 500;">Duplicate Fields:</div>
                                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                                    ${currentPrefs.duplicateColumns.map(field => `
                                        <span style="background: rgba(71, 178, 229, 0.2); color: #47B2E5; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; border: 1px solid rgba(71, 178, 229, 0.3);">
                                            ${field}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        <div style="background: rgba(76,175,80,0.1) !important; border-radius: 8px; padding: 1rem; margin-top: 1rem; opacity: 1 !important; border: 1px solid rgba(76,175,80,0.2) !important;">
                            <div style="color: #4CAF50; font-size: 0.9rem; font-weight: 600;">Complete State Save</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin-top: 0.3rem;">
                                This will save everything: ${selectedCards.length} cards, ${activeFilters.length} filters, ${savedViewsCount} saved views, and all report settings for instant restoration.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer" style="padding: 1.5rem 2rem; border-top: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05) !important; display: flex; justify-content: flex-end; gap: 1rem;">
                <button class="modal-btn secondary" onclick="this.closest('.modal-overlay').remove()" style="background: rgba(255,255,255,0.1) !important; border: 1px solid rgba(255,255,255,0.2) !important; color: rgba(255,255,255,0.8) !important; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; transition: all 0.3s ease;">Cancel</button>
                <button class="modal-btn primary" onclick="window.dqHubManager.confirmSavePreferences()" style="background: #47B2E5 !important; border: 1px solid #47B2E5 !important; color: white !important; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; opacity: 1 !important;">Save Complete Preferences</button>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Focus on input
        setTimeout(() => {
            const input = modal.querySelector('#preferenceNameInput');
            if (input) {
                input.focus();
                input.select();
            }
        }, 100);
        
        // Close button functionality
        const closeBtn = content.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => modal.remove());
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
        
        // Enter key to save
        document.addEventListener('keydown', function saveOnEnter(e) {
            if (e.key === 'Enter') {
                window.dqHubManager.confirmSavePreferences();
                document.removeEventListener('keydown', saveOnEnter);
            }
        });
    }

    confirmSavePreferences() {
        try {
            const nameInput = document.getElementById('preferenceNameInput');
            const preferenceName = nameInput?.value?.trim() || `DQ Preferences ${new Date().toLocaleDateString()}`;
            
            // Get current selected cards from multiple sources
            const selectedCards = [];
            const cardConfigurations = {};
            
            // First, try to get from UI checkboxes
            const cardCheckboxes = document.querySelectorAll('#dqQuickCardsSelection .card-checkbox-input:checked');
            if (cardCheckboxes.length > 0) {
                cardCheckboxes.forEach(checkbox => {
                    const cardElement = checkbox.closest('.card-selection-item');
                    if (cardElement) {
                        const cardId = cardElement.dataset.cardId;
                        if (cardId) {
                            selectedCards.push(cardId);
                            
                            // Get card configuration from UI elements
                            const viewTypeSelect = cardElement.querySelector('.card-view-type');
                            const savedViewSelect = cardElement.querySelector('.card-saved-view');
                            
                            cardConfigurations[cardId] = {
                                id: cardId,
                                name: cardElement.querySelector('h4')?.textContent || cardId,
                                viewType: viewTypeSelect?.value || 'both',
                                savedView: savedViewSelect?.value || 'current'
                            };
                        }
                    }
                });
            }
            
            // If no cards found in UI, try to get from internal state
            if (selectedCards.length === 0 && window.dqHubSummary && window.dqHubSummary.selectedCards) {
                window.dqHubSummary.selectedCards.forEach(cardId => {
                    selectedCards.push(cardId);
                    
                    // Get configuration from internal state
                    if (window.dqHubSummary.quickCardsData[cardId]) {
                        const cardData = window.dqHubSummary.quickCardsData[cardId];
                        const cardConfig = window.dqHubSummary.getCardConfig(cardId);
                        
                        cardConfigurations[cardId] = {
                            id: cardId,
                            name: cardData.name,
                            viewType: cardConfig.viewType || 'both',
                            savedView: cardConfig.savedView || 'current'
                        };
                    }
                });
            }
            
            // If still no cards, try to get all available cards as fallback
            if (selectedCards.length === 0 && window.dqHubSummary && window.dqHubSummary.quickCardsData) {
                Object.keys(window.dqHubSummary.quickCardsData).forEach(cardId => {
                    selectedCards.push(cardId);
                    
                    const cardData = window.dqHubSummary.quickCardsData[cardId];
                    const cardConfig = window.dqHubSummary.getCardConfig(cardId);
                    
                    cardConfigurations[cardId] = {
                        id: cardId,
                        name: cardData.name,
                        viewType: cardConfig.viewType || 'both',
                        savedView: cardConfig.savedView || 'current'
                    };
                });
            }
            
            const preferences = {
                // Report configuration
                includeTableData: document.getElementById('dqIncludeTableDataCheckbox')?.checked || false,
                includeTechnicalInfo: document.getElementById('dqIncludeTechnicalInfoCheckbox')?.checked || false,
                removeDuplicates: document.getElementById('dqRemoveDuplicatesCheckbox')?.checked || false,
                duplicateColumns: Array.from(document.querySelectorAll('#dqDuplicateColumnsList .duplicate-column-checkbox:checked')).map(cb => cb.value),
                
                // Selected cards and their configurations
                selectedCards: selectedCards,
                cardConfigurations: cardConfigurations,
                
                // Quick filters state
                activeQuickFilters: window.activeDqQuickFilters || [],
                activeUrgencyCards: window.activeDqUrgencyCards || [],
                
                // Saved views state
                savedViews: window.loadSavedViews ? window.loadSavedViews() : {},
                
                timestamp: new Date().toISOString(),
                name: preferenceName
            };

            // Get existing preferences
            const existingPrefs = JSON.parse(localStorage.getItem('dqReportPreferences') || '[]');
            
            // Add new preferences
            existingPrefs.push(preferences);
            
            // Keep only last 10 preferences
            if (existingPrefs.length > 10) {
                existingPrefs.splice(0, existingPrefs.length - 10);
            }
            
            localStorage.setItem('dqReportPreferences', JSON.stringify(existingPrefs));
            
            // Close modal
            const modal = document.querySelector('#dqSavePreferencesModal');
            if (modal) modal.remove();
            
            this.showNotification(`Preferences saved as "${preferences.name}"`, 'success');
            console.log('✅ DQ Preferences saved:', preferences);
        } catch (error) {
            console.error('Error saving DQ preferences:', error);
            this.showNotification('Error saving preferences. Please try again.', 'error');
        }
    }

    loadDqPreferences() {
        try {
            const existingPrefs = JSON.parse(localStorage.getItem('dqReportPreferences') || '[]');
            
            if (existingPrefs.length === 0) {
                this.showNotification('No saved preferences found.', 'info');
                return;
            }

            // Show preferences selection modal
            this.showPreferencesSelectionModal(existingPrefs);
        } catch (error) {
            console.error('Error loading DQ preferences:', error);
            this.showNotification('Error loading preferences. Please try again.', 'error');
        }
    }

    showPreferencesSelectionModal(preferences) {
        // Create modal for preferences selection
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'dqPreferencesModal';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.1); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);';
        
        const content = document.createElement('div');
        content.className = 'modal-panel';
        content.style.cssText = 'background: #1a2332 !important; border: 2px solid rgba(255,255,255,0.3) !important; border-radius: 12px; padding: 0; max-width: 600px; width: 90%; max-height: 80vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 25px 80px rgba(0,0,0,0.95) !important; opacity: 1 !important;';
        
        content.innerHTML = `
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05) !important;">
                <div class="header-left" style="display: flex; align-items: center; gap: 1rem;">
                    <img src="./LOGOTAB_rounded.png" alt="Logo" style="width: 32px; height: 32px; border-radius: 6px; box-shadow: 0 2px 8px rgba(71,178,229,0.3);" onerror="console.error('Error loading logo:', this.src);">
                    <h3 style="color: white; margin: 0; font-size: 1.3rem;">Load Saved Preferences</h3>
                </div>
                <button class="close-btn" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0.5rem;">×</button>
            </div>
            
            <div class="modal-content" style="padding: 2rem; max-height: 60vh; overflow-y: auto; background: transparent !important;">
                <div style="margin-bottom: 1.5rem;">
                    <p style="color: rgba(255,255,255,0.8); margin-bottom: 1rem;">Select a saved preference to load:</p>
                </div>
                
                <div class="preferences-grid" style="display: grid; gap: 1rem;">
                    ${preferences.map((pref, index) => `
                        <div class="preference-item" 
                             style="background: rgba(255,255,255,0.2) !important; border: 2px solid rgba(255,255,255,0.3) !important; border-radius: 12px; padding: 1.5rem; cursor: pointer; transition: all 0.3s ease; position: relative; opacity: 1 !important;"
                             onmouseover="this.style.background='rgba(255,255,255,0.3) !important'; this.style.borderColor='rgba(255,255,255,0.4) !important'" 
                             onmouseout="this.style.background='rgba(255,255,255,0.2) !important'; this.style.borderColor='rgba(255,255,255,0.3) !important'"
                             onclick="window.dqHubManager.applyDqPreferences(${index})">
                            
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                                <div style="color: white; font-weight: 600; font-size: 1.1rem;">${pref.name}</div>
                                <div style="color: rgba(255,255,255,0.5); font-size: 0.85rem;">
                                    ${new Date(pref.timestamp).toLocaleDateString()} ${new Date(pref.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                            
                            <div class="preference-details" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.8rem; margin-bottom: 1rem;">
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span style="color: ${pref.includeTableData ? '#4CAF50' : '#f44336'}; font-size: 1.2rem;">${pref.includeTableData ? '✓' : '✗'}</span>
                                    <span style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Table Data</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span style="color: ${pref.includeTechnicalInfo ? '#4CAF50' : '#f44336'}; font-size: 1.2rem;">${pref.includeTechnicalInfo ? '✓' : '✗'}</span>
                                    <span style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Technical Info</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span style="color: ${pref.removeDuplicates ? '#4CAF50' : '#f44336'}; font-size: 1.2rem;">${pref.removeDuplicates ? '✓' : '✗'}</span>
                                    <span style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Remove Duplicates</span>
                                </div>
                            </div>
                            
                            ${pref.duplicateColumns.length > 0 ? `
                                <div style="background: rgba(255,255,255,0.2) !important; border-radius: 8px; padding: 1rem; margin-top: 1rem; opacity: 1 !important;">
                                    <div style="color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-bottom: 0.5rem; font-weight: 500;">Duplicate Fields:</div>
                                    <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                                        ${pref.duplicateColumns.map(field => `
                                            <span style="background: rgba(71, 178, 229, 0.2); color: #47B2E5; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; border: 1px solid rgba(71, 178, 229, 0.3);">
                                                ${field}
                                            </span>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            
                            <div style="position: absolute; bottom: 1rem; right: 1rem; opacity: 0; transition: opacity 0.3s ease;" class="action-buttons">
                                                                    <button class="delete-btn" 
                                            onclick="event.stopPropagation(); window.dqHubManager.deleteDqPreference(${index})"
                                            style="background: rgba(244, 67, 54, 0.2); border: 1px solid rgba(244, 67, 54, 0.4); color: #f44336; padding: 0.2rem 0.4rem; border-radius: 4px; cursor: pointer; font-size: 0.7rem; transition: all 0.2s ease;"
                                            onmouseover="this.style.background='rgba(244, 67, 54, 0.3)'; this.style.borderColor='rgba(244, 67, 54, 0.6)'"
                                            onmouseout="this.style.background='rgba(244, 67, 54, 0.2)'; this.style.borderColor='rgba(244, 67, 54, 0.4)'"
                                            title="Delete preference">
                                        ×
                                    </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                ${preferences.length === 0 ? `
                    <div style="text-align: center; padding: 3rem; color: rgba(255,255,255,0.5);">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📁</div>
                        <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">No saved preferences found</div>
                        <div style="font-size: 0.9rem;">Save your first preference to see it here</div>
                    </div>
                ` : ''}
            </div>
            
            <div class="modal-footer" style="padding: 1.5rem 2rem; border-top: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05) !important; display: flex; justify-content: flex-end; gap: 1rem;">
                <button class="modal-btn secondary" onclick="this.closest('.modal-overlay').remove()" style="background: rgba(255,255,255,0.1) !important; border: 1px solid rgba(255,255,255,0.2) !important; color: rgba(255,255,255,0.8) !important; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; transition: all 0.3s ease;">Cancel</button>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Add hover effects for action buttons
        const preferenceItems = modal.querySelectorAll('.preference-item');
        preferenceItems.forEach(item => {
            const actionButtons = item.querySelector('.action-buttons');
            item.addEventListener('mouseenter', () => {
                if (actionButtons) actionButtons.style.opacity = '1';
            });
            item.addEventListener('mouseleave', () => {
                if (actionButtons) actionButtons.style.opacity = '0';
            });
        });
        
        // Close button functionality
        const closeBtn = content.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => modal.remove());
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    deleteDqPreference(prefIndex) {
        try {
            const existingPrefs = JSON.parse(localStorage.getItem('dqReportPreferences') || '[]');
            
            if (prefIndex >= 0 && prefIndex < existingPrefs.length) {
                const preferenceToDelete = existingPrefs[prefIndex];
                
                // Remove the preference
                existingPrefs.splice(prefIndex, 1);
                localStorage.setItem('dqReportPreferences', JSON.stringify(existingPrefs));
                
                // Close the modal and show success message
                const modal = document.getElementById('dqPreferencesModal');
                if (modal) modal.remove();
                
                this.showNotification(`Preference "${preferenceToDelete.name}" deleted successfully`, 'success');
                
                // Refresh the preferences modal if there are still preferences
                if (existingPrefs.length > 0) {
                    this.loadDqPreferences();
                }
            } else {
                this.showNotification('Invalid preference index', 'error');
            }
        } catch (error) {
            console.error('Error deleting DQ preference:', error);
            this.showNotification('Error deleting preference. Please try again.', 'error');
        }
    }

    applyDqPreferences(prefIndex) {
        try {
            const existingPrefs = JSON.parse(localStorage.getItem('dqReportPreferences') || '[]');
            const preferences = existingPrefs[prefIndex];
            
            if (!preferences) {
                this.showNotification('Preferences not found.', 'error');
                return;
            }

            console.log('🔄 Applying complete DQ preferences:', preferences);

            // Apply report configuration preferences
            const includeTableDataCheckbox = document.getElementById('dqIncludeTableDataCheckbox');
            const includeTechnicalInfoCheckbox = document.getElementById('dqIncludeTechnicalInfoCheckbox');
            const removeDuplicatesCheckbox = document.getElementById('dqRemoveDuplicatesCheckbox');
            
            if (includeTableDataCheckbox) includeTableDataCheckbox.checked = preferences.includeTableData;
            if (includeTechnicalInfoCheckbox) includeTechnicalInfoCheckbox.checked = preferences.includeTechnicalInfo;
            if (removeDuplicatesCheckbox) removeDuplicatesCheckbox.checked = preferences.removeDuplicates;
            
            // Show/hide duplicate columns section
            const duplicateColumnsSection = document.getElementById('dqDuplicateColumnsSection');
            if (duplicateColumnsSection) {
                duplicateColumnsSection.style.display = preferences.removeDuplicates ? 'block' : 'none';
            }
            
            // Apply duplicate columns selection
            if (preferences.duplicateColumns && preferences.duplicateColumns.length > 0) {
                const checkboxes = document.querySelectorAll('#dqDuplicateColumnsList .duplicate-column-checkbox');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = preferences.duplicateColumns.includes(checkbox.value);
                });
                this.updateDqSelectedFieldsCount();
            }
            
            // Apply selected cards and their configurations
            if (window.dqHubSummary && preferences.selectedCards) {
                // Clear current selection
                window.dqHubSummary.selectedCards.clear();
                
                // Add selected cards
                preferences.selectedCards.forEach(cardId => {
                    window.dqHubSummary.selectedCards.add(cardId);
                });
                
                // Apply card configurations (viewType, savedView, active, etc.)
                if (preferences.cardConfigurations) {
                    Object.entries(preferences.cardConfigurations).forEach(([cardId, config]) => {
                        if (window.dqHubSummary.quickCardsData[cardId]) {
                            // Apply individual card configurations
                            if (config.viewType) {
                                window.dqHubSummary.updateCardConfig(cardId, 'viewType', config.viewType);
                            }
                            if (config.savedView) {
                                window.dqHubSummary.updateCardConfig(cardId, 'savedView', config.savedView);
                            }
                            // Also update the internal cardConfigs directly to ensure persistence
                            if (!window.dqHubSummary.cardConfigs[cardId]) {
                                window.dqHubSummary.cardConfigs[cardId] = {};
                            }
                            if (config.viewType) {
                                window.dqHubSummary.cardConfigs[cardId].viewType = config.viewType;
                            }
                            if (config.savedView) {
                                window.dqHubSummary.cardConfigs[cardId].savedView = config.savedView;
                            }
                        }
                    });
                }
                
                // Ensure DQ Summary modal is open to show the cards
                if (!document.getElementById('dqSummaryModal')) {
                    this.toggleDqDashboard();
                }
                
                // Re-render cards selection to update UI
                window.dqHubSummary.renderCardsSelection();
                
                // Force update the UI to reflect the selected cards with multiple attempts
                setTimeout(() => {
                    if (window.dqHubSummary && window.dqHubSummary.renderCardsSelection) {
                        window.dqHubSummary.renderCardsSelection();
                        
                        // Also update the checkboxes directly
                        preferences.selectedCards.forEach(cardId => {
                            const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
                            if (cardElement) {
                                const checkbox = cardElement.querySelector('.card-checkbox-input');
                                if (checkbox) {
                                    checkbox.checked = true;
                                }
                                // Also need to update dropdowns directly
                                const viewTypeSelect = cardElement.querySelector('.card-view-type');
                                const savedViewSelect = cardElement.querySelector('.card-saved-view');
                                const config = preferences.cardConfigurations[cardId];
                                if (viewTypeSelect && config && config.viewType) {
                                    viewTypeSelect.value = config.viewType;
                                }
                                if (savedViewSelect && config && config.savedView) {
                                    savedViewSelect.value = config.savedView;
                                }
                            }
                        });
                    }
                }, 200);
                
                // Additional update after a longer delay to ensure everything is rendered
                setTimeout(() => {
                    if (window.dqHubSummary && window.dqHubSummary.renderCardsSelection) {
                        window.dqHubSummary.renderCardsSelection();
                    }
                }, 500);
            }
            
            // Apply quick filters state
            if (preferences.activeQuickFilters) {
                window.activeDqQuickFilters = preferences.activeQuickFilters;
                // Re-apply quick filters
                this.applyDqQuickFilters();
            }
            
            // Apply urgency cards state
            if (preferences.activeUrgencyCards) {
                window.activeDqUrgencyCards = preferences.activeUrgencyCards;
                // Re-apply urgency filters
                this.applyDqUrgencyFilters();
            }
            
            // Restore saved views if they exist
            if (preferences.savedViews && Object.keys(preferences.savedViews).length > 0) {
                // Update localStorage with saved views
                localStorage.setItem('tableViews', JSON.stringify(preferences.savedViews));
                // Refresh saved views dropdown
                if (window.setupViewSelect) {
                    window.setupViewSelect();
                }
                if (window.initializeColumnManager) {
                    window.initializeColumnManager();
                }
            }
            
            // Update preview
            this.updateDqSummaryPreview();
            
            // Close modal
            const modal = document.querySelector('.modal-overlay');
            if (modal) modal.remove();
            
            this.showNotification(`Complete preferences loaded: ${preferences.name}`, 'success');
            console.log('✅ Complete DQ Preferences applied:', preferences);
        } catch (error) {
            console.error('Error applying DQ preferences:', error);
            this.showNotification('Error applying preferences. Please try again.', 'error');
        }
    }
}

// Initialize DQ Hub Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dqHubManager = new DqHubManager();
}); 