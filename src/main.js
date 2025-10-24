// Login type constants - must be defined first
const LOGIN_TYPES = {
  ONEDRIVE: 'onedrive',
  GUEST: 'guest',
  NONE: 'none'
};

// Verificar configuración del backend antes de cargar módulos
if (!window.backendConfig) {
  console.warn('⚠️ Backend config not loaded, creating fallback configuration');
  // Crear configuración de emergencia
  window.backendConfig = {
    isProduction: window.location.hostname === 'pableitez.github.io',
    isDevelopment: window.location.hostname !== 'pableitez.github.io',
    isOfflineMode: () => false, // No usar modo offline por defecto
    getMainBackendUrl: () => {
      // Usar URLs reales en lugar de 'offline'
      if (window.location.hostname === 'pableitez.github.io') {
        return 'https://the-bridge-9g01.onrender.com';
      } else {
        return 'http://localhost:3000';
      }
    },
    getCsvBackendUrl: () => {
      if (window.location.hostname === 'pableitez.github.io') {
        return 'https://the-bridge-9g01.onrender.com';
      } else {
        return 'http://localhost:3005';
      }
    },
    enableOfflineMode: () => {
      console.log('🌐 Emergency offline mode enabled');
    }
  };
}

// Ensure unified notifications are used globally from the start
window.showNotification = window.showUnifiedNotification;

// Immediate guest mode check - run before DOM is ready
(function() {
  try {
    // Check if user is in guest mode from localStorage
    const userData = localStorage.getItem('thebridge_current_user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.role === 'guest') {
        console.log('👤 Guest mode detected on page load - hiding team elements immediately');
        
        // Hide team elements immediately when DOM is ready with !important
        const hideTeamElements = () => {
          const teamInfo = document.getElementById('teamInfo');
          const teamManagementBtn = document.getElementById('teamManagementBtn');
          const teamManagementSeparator = teamManagementBtn?.nextElementSibling;
          const sidebarHeader = document.querySelector('.sidebar-header');
          
          if (teamInfo) {
            teamInfo.style.setProperty('display', 'none', 'important');
            teamInfo.style.setProperty('visibility', 'hidden', 'important');
            teamInfo.style.setProperty('opacity', '0', 'important');
            teamInfo.style.setProperty('height', '0', 'important');
            teamInfo.style.setProperty('overflow', 'hidden', 'important');
            teamInfo.style.setProperty('margin', '0', 'important');
            teamInfo.style.setProperty('padding', '0', 'important');
            teamInfo.style.setProperty('position', 'absolute', 'important');
            teamInfo.style.setProperty('left', '-9999px', 'important');
            teamInfo.style.setProperty('top', '-9999px', 'important');
          }
          if (teamManagementBtn) {
            teamManagementBtn.style.setProperty('display', 'none', 'important');
          }
          if (teamManagementSeparator && teamManagementSeparator.classList.contains('sidebar-separator')) {
            teamManagementSeparator.style.setProperty('display', 'none', 'important');
          }
          if (sidebarHeader) {
            sidebarHeader.style.setProperty('display', 'none', 'important');
            sidebarHeader.style.setProperty('height', '0', 'important');
            sidebarHeader.style.setProperty('margin', '0', 'important');
            sidebarHeader.style.setProperty('padding', '0', 'important');
            sidebarHeader.style.setProperty('overflow', 'hidden', 'important');
            sidebarHeader.style.setProperty('visibility', 'hidden', 'important');
            sidebarHeader.style.setProperty('opacity', '0', 'important');
          }
        };
        
                 // Execute immediately if DOM is ready, otherwise wait
         if (document.readyState === 'loading') {
           document.addEventListener('DOMContentLoaded', hideTeamElements);
         } else {
           hideTeamElements();
         }
         
         // Set up continuous monitoring to keep elements hidden
         const continuousHide = () => {
           const teamInfo = document.getElementById('teamInfo');
           const sidebarHeader = document.querySelector('.sidebar-header');
           
           if (teamInfo) {
             teamInfo.style.setProperty('display', 'none', 'important');
             teamInfo.style.setProperty('visibility', 'hidden', 'important');
             teamInfo.style.setProperty('opacity', '0', 'important');
             teamInfo.style.setProperty('height', '0', 'important');
             teamInfo.style.setProperty('overflow', 'hidden', 'important');
             teamInfo.style.setProperty('margin', '0', 'important');
             teamInfo.style.setProperty('padding', '0', 'important');
             teamInfo.style.setProperty('position', 'absolute', 'important');
             teamInfo.style.setProperty('left', '-9999px', 'important');
             teamInfo.style.setProperty('top', '-9999px', 'important');
           }
           
           if (sidebarHeader) {
             sidebarHeader.style.setProperty('display', 'none', 'important');
             sidebarHeader.style.setProperty('height', '0', 'important');
             sidebarHeader.style.setProperty('margin', '0', 'important');
             sidebarHeader.style.setProperty('padding', '0', 'important');
             sidebarHeader.style.setProperty('overflow', 'hidden', 'important');
             sidebarHeader.style.setProperty('visibility', 'hidden', 'important');
             sidebarHeader.style.setProperty('opacity', '0', 'important');
           }
         };
         
         // Run continuous monitoring every 50ms
         setInterval(continuousHide, 50);
         
         // Also add guest-mode class to body for CSS targeting
         const addGuestModeClass = () => {
           document.body.classList.add('guest-mode');
         };
         
         if (document.readyState === 'loading') {
           document.addEventListener('DOMContentLoaded', addGuestModeClass);
         } else {
           addGuestModeClass();
         }
         
         // Call sidebar-fix guest mode handler
         const callGuestModeHandler = () => {
           if (typeof window.handleGuestMode === 'function') {
             window.handleGuestMode();
           }
           if (typeof window.forceGuestModeElementsHidden === 'function') {
             window.forceGuestModeElementsHidden();
           }
         };
         
         if (document.readyState === 'loading') {
           document.addEventListener('DOMContentLoaded', callGuestModeHandler);
         } else {
           callGuestModeHandler();
         }
      }
    }
  } catch (error) {
    console.warn('⚠️ Error in immediate guest mode check:', error);
  }
})();

import './components/custom/CustomColumnManager.js';
import { 
  initializeState, 
  setOriginalData, 
  setCurrentHeaders, 
  setVisibleColumns,
  getOriginalData,
  getCurrentHeaders,
  setRowsPerPage,
  getModuleFilterValues,
  setModuleFilterValues,
  setModuleActiveFilters,
  setTableFilterValues,
  setTableActiveFilters,
  setCurrentPage,
  getVisibleColumns,
  getTableActiveFilters,
  getTableFilterValues,
  getModuleActiveFilters // <-- Añadido aquí
} from './store/index.js';
import { validateCSVFile, parseCSVFile } from './services/csvService.js';
import { displayTable, updatePagination, colorRowsByUrgencia, showInfoModal } from './components/table/Table.js';
import { 
  debounce, 
  searchData,
  getElement, 
  toggleElements, 
  showError,
  saveToIndexedDB,
  loadFromIndexedDB
} from './utils/general.js';
import { initializeColumnManager } from './components/columns/ColumnManager.js';
import { initializeFilterManager, resetFilterManager, generateFilterSidebar, renderActiveFiltersSummaryChips, loadQuickFilters, deleteQuickFilter, getFilteredData, applyFilters, setColumnFilter, validateFilterCompatibility } from './components/filters/FilterManager.js';
import { initializeReportService, copyTableToClipboard } from './services/reportService.js';
import { showNotification } from './components/notifications/NotificationManager.js';
import { customColumnManager } from './components/custom/CustomColumnManager.js';
import { openSummaryModal, setupSummaryModalEvents } from './components/reports/CustomSummary.js';
import { tableNotification } from './js/notifications.js';
import './js/csvComparison.js';
import { renderDashboardCharts, updateDashboardCharts, createManualSnapshot, getDashboardSnapshots } from './components/dashboard/DashboardCharts.js';
import { OpsHubSummary } from './components/dashboard/OpsHubSummary.js';
import { DqHubSummary } from './components/dashboard/DqHubSummary.js';

let filterManager;

// Variable global para el nombre del archivo CSV actual
let currentCSVFileName = '';

let calendarMonthOffset = 0;

// Estado específico para filtros aplicados desde dropdowns de tabla
window.hasTableDropdownFilters = false;

// Resume button functions removed - no longer needed

// Welcome screen functions
function showWelcomeScreen() {
  console.log('🚀 Showing welcome screen with mandatory login...');
  
  const screen = document.getElementById('welcomeScreen');
  const tableContainer = document.getElementById('tableContainer');
  
  if (screen) {
    screen.style.display = 'flex';
    screen.classList.remove('fade-out');
  }
  
  // Hide table container when showing welcome screen
  if (tableContainer) {
    tableContainer.style.display = 'none';
  }
  
  // Update welcome screen content for mandatory login
  updateWelcomeScreenForMandatoryLogin();
  
  // Check if user is already authenticated
  checkExistingAuthentication();
}

// Update welcome screen for mandatory login (keeping original aesthetics)
function updateWelcomeScreenForMandatoryLogin() {
  // Keep original aesthetics - only add event listeners for existing buttons
  setupMandatoryLoginEventListeners();
  
  // Add Guest button if it doesn't exist
  addGuestButtonIfMissing();
}

// Setup event listeners for mandatory login
function setupMandatoryLoginEventListeners() {
  // OneDrive Login
  const onedriveLoginBtn = document.getElementById('onedriveLoginBtn');
  if (onedriveLoginBtn) {
    onedriveLoginBtn.onclick = function() {
      console.log('🔄 OneDrive login button clicked (mandatory)');
      initiateOneDriveLogin();
    };
  }
  
  // Guest Login
  const guestLoginBtn = document.getElementById('guestLoginBtn');
  if (guestLoginBtn) {
    guestLoginBtn.onclick = function() {
      console.log('👤 Guest login button clicked (mandatory)');
      initiateGuestLogin();
    };
  }
  
  // Resume Last Version (keep existing functionality)
  const resumeBtn = document.getElementById('resumeLastVersionBtn');
  if (resumeBtn) {
    resumeBtn.onclick = function() {
      console.log('🔄 Resume last version button clicked');
      // Keep existing resume functionality
      showWelcomeLoading('Loading your last version...');
      loadLastVersion();
    };
  }
  
  // Load New CSV (keep existing functionality)
  const loadNewBtn = document.getElementById('loadNewCSVBtn');
  if (loadNewBtn) {
    loadNewBtn.onclick = function() {
      console.log('📁 Load new CSV button clicked');
      // Keep existing load CSV functionality
      const csvFileInput = document.getElementById('csvFileInput');
      if (csvFileInput) {
        csvFileInput.click();
      }
    };
  }
}

// Add Guest button if it doesn't exist
function addGuestButtonIfMissing() {
  const existingGuestBtn = document.getElementById('guestLoginBtn');
  if (!existingGuestBtn) {
    console.log('➕ Adding Guest button to welcome screen...');
    
    const welcomeOptions = document.querySelector('.welcome-options');
    if (welcomeOptions) {
      const guestBtn = document.createElement('button');
      guestBtn.id = 'guestLoginBtn';
      guestBtn.className = 'welcome-option-btn secondary';
      guestBtn.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style="margin-right: 1rem;">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
        </svg>
        <div class="option-text">
          <div class="option-title" style="font-size: 1.3em; font-weight: 600;">Quick Access (Guest)</div>
        </div>
      `;
      
      guestBtn.onclick = function() {
        console.log('👤 Guest login button clicked (added)');
        initiateGuestLogin();
      };
      
      welcomeOptions.appendChild(guestBtn);
      console.log('✅ Guest button added successfully');
    }
  }
}

// Check if user is already authenticated
function checkExistingAuthentication() {
  console.log('🔍 Checking existing authentication...');
  
  const loginType = getCurrentLoginType();
  
  if (loginType === LOGIN_TYPES.ONEDRIVE) {
    console.log('✅ User already authenticated with OneDrive, proceeding...');
          showUnifiedNotification('OneDrive session detected, continuing...', 'info');
    setTimeout(() => {
      showTeamSelectionAfterLogin('OneDrive');
    }, 1000);
    return;
  }
  
  if (loginType === LOGIN_TYPES.GUEST) {
    console.log('✅ User already in Guest mode, proceeding...');
          showUnifiedNotification('Guest mode detected, continuing...', 'info');
    setTimeout(() => {
      showMainInterface();
    }, 1000);
    return;
  }
  
  console.log('ℹ️ No existing authentication found, showing login options');
}

// Initiate OneDrive login (mandatory)
function initiateOneDriveLogin() {
  console.log('🔄 Initiating mandatory OneDrive login...');
  
  // Show loading state
  const onedriveLoginBtn = document.getElementById('onedriveLoginBtn');
  if (onedriveLoginBtn) {
    onedriveLoginBtn.disabled = true;
    onedriveLoginBtn.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
        <div style="width: 20px; height: 20px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <span>Connecting to OneDrive...</span>
      </div>
    `;
  }
  
  // Show notification
        showUnifiedNotification('Connecting to OneDrive...', 'info');
  
  // Try to use existing OneDrive integration first
  if (window.OneDriveCustomPathIntegration) {
    console.log('🔄 Using existing OneDrive integration...');
    
    try {
      const onedrive = new window.OneDriveCustomPathIntegration();
      
      // Try to initialize OneDrive
      if (typeof onedrive.initialize === 'function') {
        onedrive.initialize().then(() => {
          console.log('✅ OneDrive initialized successfully');
          
          if (onedrive.isAuthenticated) {
            console.log('✅ OneDrive is already authenticated');
            showUnifiedNotification('OneDrive connected successfully!', 'success');
            
            // Reset button
            if (onedriveLoginBtn) {
              onedriveLoginBtn.disabled = false;
              onedriveLoginBtn.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                  </svg>
                  <span>Iniciar Sesión con OneDrive</span>
                </div>
              `;
            }
            
            // Proceed to team selection
            setTimeout(() => {
              showTeamSelectionAfterLogin('OneDrive');
            }, 1000);
            
    } else {
            console.log('❌ OneDrive not authenticated, trying popup...');
            openOneDrivePopup();
          }
        }).catch(error => {
          console.log('❌ OneDrive initialization failed:', error);
          openOneDrivePopup();
        });
      } else {
        console.log('❌ OneDrive initialize method not available, trying popup...');
        openOneDrivePopup();
      }
    } catch (error) {
      console.log('❌ Error with OneDrive integration:', error);
      openOneDrivePopup();
    }
  } else {
    console.log('❌ OneDrive integration not available, trying popup...');
    openOneDrivePopup();
  }
}

// Show OneDrive setup instructions
function showOneDriveInstructions() {
  console.log('📋 Showing OneDrive setup instructions...');
  
  // Reset button
  const onedriveLoginBtn = document.getElementById('onedriveLoginBtn');
  if (onedriveLoginBtn) {
    onedriveLoginBtn.disabled = false;
    onedriveLoginBtn.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
        </svg>
        <span>Iniciar Sesión con OneDrive</span>
      </div>
    `;
  }
  
  // Show instructions modal
  showUnifiedNotification('OneDrive requiere configuración. Usa Guest mode por ahora.', 'warning');
  
  // Show detailed instructions
  const instructions = `
    <div style="text-align: left; padding: 1rem;">
              <h3>🔧 OneDrive Configuration Required</h3>
              <p>To use OneDrive, you need:</p>
      <ol>
                  <li>Create an application in Azure Portal</li>
                  <li>Configure OneDrive permissions</li>
                  <li>Get a valid Client ID</li>
      </ol>
              <p><strong>For now, use "Quick Access (Guest)" to continue.</strong></p>
              <p>Do you want help configuring Azure?</p>
    </div>
  `;
  
  // Show modal with instructions
  showModal('Configuración de OneDrive', instructions, [
    { text: 'Usar Guest Mode', action: () => initiateGuestLogin() },
    { text: 'Ayuda con Azure', action: () => showAzureHelp() },
    { text: 'Cancelar', action: () => {} }
  ]);
}

// Show Azure setup help
function showAzureHelp() {
  const helpText = `
    <div style="text-align: left; padding: 1rem;">
      <h3>📋 Pasos para Configurar Azure</h3>
      <ol>
        <li><strong>Ve a Azure Portal:</strong> https://portal.azure.com</li>
        <li><strong>Busca "App registrations"</strong> en la barra de búsqueda</li>
        <li><strong>Crea nueva aplicación:</strong> "New registration"</li>
        <li><strong>Configura:</strong>
          <ul>
            <li>Name: The Bridge OneDrive</li>
            <li>Account types: Personal Microsoft accounts only</li>
            <li>Redirect URI: http://127.0.0.1:5501</li>
          </ul>
        </li>
        <li><strong>Copia el Client ID</strong> de Overview</li>
        <li><strong>Configura permisos:</strong> Microsoft Graph > Files.ReadWrite</li>
      </ol>
      <p>¿Necesitas ayuda con algún paso específico?</p>
    </div>
  `;
  
  showModal('Ayuda con Azure', helpText, [
    { text: 'Entendido', action: () => {} },
    { text: 'Usar Guest Mode', action: () => initiateGuestLogin() }
  ]);
}

// Open OneDrive popup as fallback
function openOneDrivePopup() {
  console.log('🔄 Opening OneDrive popup as fallback...');
  
  // Store the popup reference globally
  window.oneDrivePopup = window.open(
    'https://login.live.com/oauth20_authorize.srf?' +
    'client_id=cc21cd9b-9a60-48c6-be12-268ca3ec7c74' +
    '&response_type=token' +
    '&redirect_uri=' + encodeURIComponent('https://pableitez.github.io/the-bridge/') +
    '&scope=' + encodeURIComponent('onedrive.readwrite offline_access') +
    '&response_mode=fragment',
    'OneDriveLogin',
    'width=500,height=600,scrollbars=yes,resizable=yes'
  );
  
  // Check popup status
  const checkPopup = setInterval(async () => {
    if (window.oneDrivePopup.closed) {
      clearInterval(checkPopup);
      console.log('✅ OneDrive popup closed, checking for authentication...');
      
      // Reset button
      const onedriveLoginBtn = document.getElementById('onedriveLoginBtn');
      if (onedriveLoginBtn) {
        onedriveLoginBtn.disabled = false;
        onedriveLoginBtn.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
            </svg>
            <span>Iniciar Sesión con OneDrive</span>
          </div>
        `;
      }
      
      // Check if we have OneDrive token in localStorage (set by popup)
      const accessToken = localStorage.getItem('onedrive_token');
      if (accessToken) {
        console.log('✅ OneDrive token found, proceeding with authentication...');
        // Clear the token from localStorage to avoid conflicts
        localStorage.removeItem('onedrive_token');
        
        // Process the authentication in the main window
        await processOneDriveAuthentication(accessToken);
      } else {
        console.log('❌ No OneDrive token found, showing confirmation modal...');
        // Show confirmation modal for manual confirmation
        showLoginConfirmationModal('OneDrive');
      }
    }
  }, 500);
}

// Get user profile from OneDrive/Microsoft Graph
async function getUserProfileFromOneDrive(accessToken) {
  try {
    console.log('🔍 Getting user profile from Microsoft Graph...');
    
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    console.log('✅ User profile retrieved:', userData);
    
    return {
      email: userData.mail || userData.userPrincipalName,
      name: userData.displayName || userData.mail?.split('@')[0] || 'OneDrive User',
      role: 'member',
      loginType: 'onedrive',
      teams: [],
      id: userData.id,
      microsoftId: userData.id
    };
  } catch (error) {
    console.warn('⚠️ Could not get user profile from Microsoft Graph:', error);
    // Fallback to basic profile
    return {
      email: 'onedrive@user.com',
      name: 'OneDrive User',
      role: 'member',
      loginType: 'onedrive',
      teams: []
    };
  }
}

// Process OneDrive authentication in main window
async function processOneDriveAuthentication(accessToken) {
  console.log('🔄 Processing OneDrive authentication...');
  
  // Store the token
  localStorage.setItem('onedrive_token', accessToken);
  localStorage.setItem('onedrive_token_expiry', Date.now() + (3600 * 1000));
  
  // Set authentication flags
  window.oneDriveAuthPending = true;
  window.oneDriveAccessToken = accessToken;
  
  // Update OneDrive config
  if (window.oneDriveConfig) {
    window.oneDriveConfig.isConnected = true;
    window.oneDriveConfig.accessToken = accessToken;
  }
  
  // Show success notification
  if (typeof showUnifiedNotification === 'function') {
    showUnifiedNotification('✅ OneDrive authentication successful!', 'success');
  }
  
  // Initialize OneDrive integration if available
  if (typeof OneDriveCustomPathIntegration !== 'undefined' && !window.oneDriveIntegration) {
    try {
      window.oneDriveIntegration = new OneDriveCustomPathIntegration();
      window.oneDriveIntegration.accessToken = accessToken;
      window.oneDriveIntegration.isAuthenticated = true;
      console.log('✅ OneDrive integration initialized');
    } catch (error) {
      console.warn('⚠️ Could not initialize OneDrive integration:', error);
    }
  }
  
  // Clear the pending flag
  window.oneDriveAuthPending = false;
  
  // Proceed directly to team selection
  console.log('🚀 Proceeding to team selection...');
  
  // Get user profile from OneDrive/Microsoft Graph
  const userProfile = await getUserProfileFromOneDrive(accessToken);
  
  // Set current user
  window.currentUser = userProfile;
  localStorage.setItem('thebridge_current_user', JSON.stringify(userProfile));
  
  // Force a small delay to ensure everything is ready
  setTimeout(async () => {
    try {
      // Test OneDrive connection first
      const isConnected = await testOneDriveConnection();
      if (isConnected) {
        console.log('✅ OneDrive connection verified, proceeding to team selection...');
        showUnifiedNotification('OneDrive connection verified!', 'success');
      } else {
        console.log('⚠️ OneDrive connection test failed, but proceeding anyway...');
        showUnifiedNotification('OneDrive login successful, but connection test failed. Using fallback storage.', 'warning');
      }
      
      // Use the correct function for team selection
      if (typeof showTeamSelectionAfterLogin === 'function') {
        console.log('✅ Calling showTeamSelectionAfterLogin...');
        showTeamSelectionAfterLogin('OneDrive');
      } else {
        console.error('❌ showTeamSelectionAfterLogin function not found');
        // Fallback: show main interface
        if (typeof showMainInterface === 'function') {
          showMainInterface();
        }
      }
    } catch (error) {
      console.error('❌ Error in team selection:', error);
      // Fallback: show main interface
      if (typeof showMainInterface === 'function') {
        showMainInterface();
      }
    }
  }, 500);
}

// Initiate Guest login (mandatory)
function initiateGuestLogin() {
  console.log('👤 Initiating mandatory Guest login...');
  
  // Show loading state
  const guestLoginBtn = document.getElementById('guestLoginBtn');
  if (guestLoginBtn) {
    guestLoginBtn.disabled = true;
    guestLoginBtn.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
        <div style="width: 20px; height: 20px; border: 2px solid #333; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <span>Configuring Guest Mode...</span>
      </div>
    `;
  }
  
  // Show notification
  showUnifiedNotification('Configuring Guest Mode...', 'info');
  
  // Set up guest user
  setTimeout(() => {
    // Create guest user
    const guestUser = {
      email: 'guest@local.com',
      name: 'Usuario Guest',
      role: 'guest',
      loginType: 'guest',
      preferences: {
        theme: 'dark',
        language: 'es',
        autoSave: true
      }
    };
    
    // Set current user
    window.currentUser = guestUser;
    
    // Save to localStorage
    localStorage.setItem('thebridge_current_user', JSON.stringify(guestUser));
    
    // Reset button
    if (guestLoginBtn) {
      guestLoginBtn.disabled = false;
      guestLoginBtn.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
          </svg>
                        <span>Guest Mode (No Synchronization)</span>
        </div>
        <div style="font-size: 0.9em; margin-top: 0.5rem; opacity: 0.7;">
                      Only temporary local storage
        </div>
      `;
    }
    
    // Show success and proceed
    showUnifiedNotification('Guest mode activated successfully!', 'success');
    
    // Update UI to hide team-related elements immediately
    (async () => {
      await updateTeamManagementButtonText();
      await updateTeamStatusBar();
      
      // Force immediate DOM update for guest mode with !important
      const teamInfo = document.getElementById('teamInfo');
      const sidebarHeader = document.querySelector('.sidebar-header');
      
      if (teamInfo) {
        teamInfo.style.setProperty('display', 'none', 'important');
        teamInfo.style.setProperty('visibility', 'hidden', 'important');
        teamInfo.style.setProperty('opacity', '0', 'important');
        teamInfo.style.setProperty('height', '0', 'important');
        teamInfo.style.setProperty('overflow', 'hidden', 'important');
        teamInfo.style.setProperty('margin', '0', 'important');
        teamInfo.style.setProperty('padding', '0', 'important');
        teamInfo.style.setProperty('position', 'absolute', 'important');
        teamInfo.style.setProperty('left', '-9999px', 'important');
        teamInfo.style.setProperty('top', '-9999px', 'important');
      }
      
      if (sidebarHeader) {
        sidebarHeader.style.setProperty('display', 'none', 'important');
        sidebarHeader.style.setProperty('height', '0', 'important');
        sidebarHeader.style.setProperty('margin', '0', 'important');
        sidebarHeader.style.setProperty('padding', '0', 'important');
        sidebarHeader.style.setProperty('overflow', 'hidden', 'important');
        sidebarHeader.style.setProperty('visibility', 'hidden', 'important');
        sidebarHeader.style.setProperty('opacity', '0', 'important');
      }
      
      const teamManagementBtn = document.getElementById('teamManagementBtn');
      const teamManagementSeparator = teamManagementBtn?.nextElementSibling;
      
      if (teamManagementBtn) {
        teamManagementBtn.style.setProperty('display', 'none', 'important');
      }
      if (teamManagementSeparator && teamManagementSeparator.classList.contains('sidebar-separator')) {
        teamManagementSeparator.style.setProperty('display', 'none', 'important');
      }
      
      // Add guest-mode class to body
      document.body.classList.add('guest-mode');
      
      // Call sidebar-fix guest mode handler
      if (typeof window.handleGuestMode === 'function') {
        window.handleGuestMode();
      }
      if (typeof window.forceGuestModeElementsHidden === 'function') {
        window.forceGuestModeElementsHidden();
      }
    })();
    
    // Show main interface after a short delay
    setTimeout(async () => {
      await showMainInterface();
    }, 1000);
    
  }, 1500);
}

function hideWelcomeScreen() {
  const screen = document.getElementById('welcomeScreen');
  const tableContainer = document.getElementById('tableContainer');
  
  if (screen) {
    screen.classList.add('fade-out');
    setTimeout(() => {
      screen.style.display = 'none';
    }, 300);
  }
  
  // Show table container when hiding welcome screen
  if (tableContainer) {
    tableContainer.style.display = 'block';
  }
}

// Show main interface after successful authentication
async function showMainInterface() {
  console.log('🚀 Showing main interface after authentication...');
  
  // Hide welcome screen
  hideWelcomeScreen();
  
  // Show main interface
  const mainInterface = document.getElementById('mainInterface');
  if (mainInterface) {
    mainInterface.style.display = 'block';
  }
  
  // Initialize application if not already done
  if (!window.applicationInitialized) {
    console.log('🔄 Initializing application for authenticated user...');
    initializeApplication();
    window.applicationInitialized = true;
  }
  
  // Update UI based on current user
  await updateUIForCurrentUser();
  
  // Add or remove guest-mode class based on user role
  if (window.currentUser && window.currentUser.role === 'guest') {
    document.body.classList.add('guest-mode');
  } else {
    document.body.classList.remove('guest-mode');
  }
  
  console.log('✅ Main interface displayed successfully');
}

// Update UI based on current user
async function updateUIForCurrentUser() {
  console.log('🔄 Updating UI for current user...', {
    currentUser: window.currentUser,
    currentTeam: window.currentTeam
  });
  
  // Update team status bar (this handles guest mode hiding)
  await updateTeamStatusBar();
  
  // Update team management button text (this also handles guest mode)
  await updateTeamManagementButtonText();
  
  // Additional guest mode specific updates
  if (window.currentUser && window.currentUser.role === 'guest') {
    console.log('👤 Guest mode detected - applying guest-specific UI updates');
    
    // Hide any team-related elements that might still be visible
    const teamInfo = document.getElementById('teamInfo');
    if (teamInfo) {
      teamInfo.style.display = 'none';
    }
    
    // Hide team management button and separator
    const teamManagementBtn = document.getElementById('teamManagementBtn');
    const teamManagementSeparator = teamManagementBtn?.nextElementSibling;
    
    if (teamManagementBtn) {
      teamManagementBtn.style.display = 'none';
    }
    if (teamManagementSeparator && teamManagementSeparator.classList.contains('sidebar-separator')) {
      teamManagementSeparator.style.display = 'none';
    }
    
    console.log('✅ Guest mode UI updates applied');
  }
  
  console.log('✅ UI update completed');
}

function showWelcomeLoading(message = "Let's go!") {
  const options = document.querySelector('.welcome-options');
  const loadingState = document.getElementById('welcomeLoadingState');
  const subtitle = document.querySelector('.welcome-subtitle');
  
  if (options) options.style.display = 'none';
  if (loadingState) loadingState.style.display = 'block';
  if (subtitle) subtitle.textContent = message;
  // Ocultar mensaje de loading si existe
  const loadingMsg = loadingState?.querySelector('.loading-message');
  if (loadingMsg) loadingMsg.style.display = 'none';
}

// --- Loader in-app desactivado ---
function showInAppLoading(message = '') {
  // Loader desactivado: no hacer nada
}

function hideInAppLoading() {
  // Loader desactivado: no hacer nada
}

async function setupWelcomeScreen() {
  const onedriveLoginBtn = document.getElementById('onedriveLoginBtn');
  const azureLoginBtn = document.getElementById('azureLoginBtn');
  const csvFileInput = document.getElementById('csvFileInput');
  // Quick access options removed
  
  // Check if there's pending CSV data
  let pendingCSV = null;
  try {
    pendingCSV = await loadPendingCSVFromIndexedDB();
  } catch (error) {
    console.warn('⚠️ Error loading pending CSV from IndexedDB:', error);
    // Try to recover IndexedDB if there's an error
    try {
      await recoverIndexedDB();
    } catch (recoveryError) {
      console.warn('⚠️ IndexedDB recovery failed:', recoveryError);
    }
  }
  
  if (pendingCSV) {
    // Auto-load pending CSV - no mostrar pantalla de bienvenida, usar loader in-app directamente
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) {
      welcomeScreen.style.display = 'none';
    }
    showInAppLoading('Loading your data...');
    showLoadingCursorWithTimeout(15000); // 15 second timeout for auto-load
    try {
      const data = Papa.parse(pendingCSV, { header: true });
      if (!data.data || !data.data.length) throw new Error('No data found in CSV');
      
      const dateColumns = detectDateColumns(data.data);
      data.data.forEach(row => {
        dateColumns.forEach(col => {
          if (row[col]) row[col] = formatDateToYMD(row[col]);
        });
      });
      
      setOriginalData(data.data);
      setCurrentHeaders(Object.keys(data.data[0]));
      setVisibleColumns(Object.keys(data.data[0]));
      filterManager = null;
              setTimeout(() => {
          resetFilterManager();
          // Resetear flag de filtros de dropdown de tabla
          window.hasTableDropdownFilters = false;
          generateFilterSidebar(Object.keys(data.data[0]));
        }, 30);
      filterManager = initializeFilterManager(data.data);
      initializeReportService();
      displayTable(data.data);
      toggleElements('#tableContainer', 'show');
      try {
      await clearPendingCSVFromIndexedDB();
      } catch (clearError) {
        console.warn('⚠️ Error clearing pending CSV:', clearError);
      }
      
      setTimeout(() => {
        hideInAppLoading();
        hideLoadingCursor(); // Hide loading cursor
      }, 300);
      
      console.log('✅ CSV auto-loaded from IndexedDB');
    } catch (e) {
      console.error('Error auto-loading CSV:', e);
      try {
      await clearPendingCSVFromIndexedDB();
      } catch (clearError) {
        console.warn('⚠️ Error clearing pending CSV:', clearError);
      }
      hideInAppLoading();
      hideLoadingCursor(); // Hide loading cursor on error
      // Show welcome options if auto-load fails
      showWelcomeScreen();
      showWelcomeOptions();
    }
    return;
  }
  
  // 🎯 MODIFIED: Always show welcome screen
  // Users will choose their action from the welcome screen
  showWelcomeScreen();
  
  // 🎯 CRITICAL FIX: Show welcome options to display additional buttons
  showWelcomeOptions();
  
  // Quick access options removed - no longer showing
  
  // Resume button removed - no longer showing
  
  // Resume session logic removed - no longer showing quick access options
  
  // Setup event listeners for MANDATORY OneDrive login
  if (onedriveLoginBtn) {
    onedriveLoginBtn.addEventListener('click', () => {
      console.log('🔄 OneDrive login button clicked - MANDATORY');
      
      // Show mandatory OneDrive login modal
      showMandatoryOneDriveLoginModal();
    });
  }

  if (azureLoginBtn) {
    azureLoginBtn.addEventListener('click', () => {
      console.log('🔄 Azure AD login button clicked');
      
      // Show login instructions modal first
      showLoginInstructionsModal('Azure AD', () => {
        // Open Azure AD in a small popup window
        const popup = window.open('https://portal.azure.com/', 'azureLogin', 'width=500,height=600,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no');
        if (popup) {
          showUnifiedNotification('Azure AD login opened in popup. Please complete the login process.', 'info');
          
          // Check if popup is closed
          const checkClosed = setInterval(() => {
            if (popup.closed) {
              clearInterval(checkClosed);
              console.log('✅ Azure AD popup closed, asking for confirmation...');
              
              // Ask user to confirm successful login
              showLoginConfirmationModal('Azure AD', () => {
                // User confirmed successful login
                showTeamSelectionAfterLogin('Azure AD'); // Pass the service name
              }, () => {
                // User said login failed, show options again
                showUnifiedNotification('Login not completed. Please try again or choose another option.', 'warning');
              });
            }
          }, 1000);
        }
      });
    });
  }
  
  // Setup event listeners
  if (resumeBtn) {
    resumeBtn.addEventListener('click', async () => {
      console.log('🔄 "Resume Session" button clicked - resuming last session...');
      
      try {
        // Check if button is disabled (no saved sessions)
        if (resumeBtn.disabled) {
          showUnifiedNotification('No saved sessions found. Please load a CSV file first to create a session.', 'info');
          return;
        }
        
        // 🎯 MODIFIED: Call the resumeLastSession function directly
        await resumeLastSession();
        
          } catch (error) {
        console.error('Error resuming last session:', error);
        showUnifiedNotification('Error resuming session. Please try again.', 'error');
      }
    });
  }
  
  if (loadNewBtn && csvFileInput) {
    loadNewBtn.addEventListener('click', () => {
      // Load CSV as guest - no login required
      csvFileInput.click();
      
      // Hide welcome screen and show main app for guest mode
      hideWelcomeScreen();
      
      // Show guest mode notification
      setTimeout(() => {
        showUnifiedNotification('You are now in guest mode. Some features may be limited.', 'info');
      }, 1000);
    });
  }
}

function showWelcomeOptions() {
  const options = document.querySelector('.welcome-options');
  const loadingState = document.getElementById('welcomeLoadingState');
  const subtitle = document.querySelector('.welcome-subtitle');
  // Quick access options removed
  
  if (options) options.style.display = 'flex';
  if (loadingState) loadingState.style.display = 'none';
  if (subtitle) subtitle.textContent = 'Choose how you\'d like to start';
  
  // Quick access options removed - no longer showing
}

// Setup del modal de selección de versiones
function setupSelectVersionModal() {
  const selectVersionBtn = document.getElementById('selectVersionBtn');
  const selectVersionModal = document.getElementById('selectVersionModal');
  const closeSelectVersionBtn = document.getElementById('closeSelectVersionBtn');
  const versionSearchInput = document.getElementById('versionSearchInput');
  const versionsList = document.getElementById('versionsList');
  
  if (!selectVersionBtn || !selectVersionModal || !closeSelectVersionBtn || !versionsList) {
    return;
  }
  
  let searchTerm = '';
  
  // Abrir modal
  selectVersionBtn.addEventListener('click', async () => {
    selectVersionModal.classList.remove('hidden');
    selectVersionModal.style.display = 'flex';
    await renderVersionsList();
  });
  
  // Cerrar modal
  closeSelectVersionBtn.addEventListener('click', () => {
    selectVersionModal.classList.add('hidden');
    setTimeout(() => {
      selectVersionModal.style.display = 'none';
    }, 300);
  });
  
  // Cerrar modal al hacer click fuera
  selectVersionModal.addEventListener('click', (e) => {
    if (e.target === selectVersionModal) {
      selectVersionModal.classList.add('hidden');
      setTimeout(() => {
        selectVersionModal.style.display = 'none';
      }, 300);
    }
  });
  
  // Búsqueda
  if (versionSearchInput) {
    versionSearchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase();
      renderVersionsList();
    });
  }
  
  // Renderizar lista de versiones
  async function renderVersionsList() {
    try {
      let versions = await getDataVersions();
      
      if (!versions || versions.length === 0) {
        versionsList.innerHTML = '<div class="no-versions-message">No saved versions found.</div>';
        return;
      }
      
      // Filtrar por búsqueda
      if (searchTerm) {
        versions = versions.filter(version => {
          const displayName = version.displayName || version.fileName || '';
          const date = version.name || '';
          return displayName.toLowerCase().includes(searchTerm) || 
                 date.toLowerCase().includes(searchTerm);
        });
      }
      
      if (versions.length === 0) {
        versionsList.innerHTML = '<div class="no-versions-message">No matches found.</div>';
        return;
      }
      
      // Generar HTML de la lista
      let html = '';
      versions.forEach(version => {
        const displayName = version.displayName || version.fileName || 'Unknown';
        const date = version.name || 'Unknown date';
        
        html += `
          <div class="version-item" data-version-id="${version.id}">
            <div class="version-info">
              <div class="version-name">${displayName}</div>
              <div class="version-date">${date}</div>
            </div>
            <button class="version-load-btn" data-version-id="${version.id}">Load</button>
          </div>
        `;
      });
      
      versionsList.innerHTML = html;
      
      // Agregar event listeners a los botones de carga
      versionsList.querySelectorAll('.version-load-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const versionId = btn.dataset.versionId;
          await loadSelectedVersion(versionId);
        });
      });
      
      // Agregar event listeners a los items (también cargan la versión)
      versionsList.querySelectorAll('.version-item').forEach(item => {
        item.addEventListener('click', async (e) => {
          if (e.target.classList.contains('version-load-btn')) return; // Evitar doble click
          const versionId = item.dataset.versionId;
          await loadSelectedVersion(versionId);
        });
      });
      
    } catch (error) {
      console.error('Error rendering versions list:', error);
      versionsList.innerHTML = '<div class="no-versions-message">Error loading versions.</div>';
    }
  }
  
  // Cargar versión seleccionada
  async function loadSelectedVersion(versionId) {
    try {
      const versions = await getDataVersions();
      const selectedVersion = versions.find(v => v.id === versionId);
      
      if (!selectedVersion) {
        showNotification('Version not found.', 'error');
        return;
      }
      
      // Validate that the version has valid data
      if (!selectedVersion.data || !Array.isArray(selectedVersion.data) || selectedVersion.data.length === 0) {
        console.warn('Selected version has no valid data, removing it');
        await deleteDataVersion(selectedVersion.id);
        showNotification('This version was corrupted and has been removed. Please select another version.', 'warning');
        await renderVersionsList(); // Refresh the list
        return;
      }
      
      // Cerrar modal
      selectVersionModal.classList.add('hidden');
      setTimeout(() => {
        selectVersionModal.style.display = 'none';
      }, 300);
      
      // Mostrar loading con el nombre del CSV
      const displayName = selectedVersion.displayName || selectedVersion.fileName || 'your data';
      showWelcomeLoading(`Loading ${displayName}...`);
      
      // Cargar la versión seleccionada
      setOriginalData(selectedVersion.data);
      setCurrentHeaders(Object.keys(selectedVersion.data[0]));
      setVisibleColumns(Object.keys(selectedVersion.data[0]));
      
      filterManager = initializeFilterManager(selectedVersion.data);
      setTimeout(() => {
        resetFilterManager();
        generateFilterSidebar(Object.keys(selectedVersion.data[0]));
      }, 30);
      
      initializeReportService();
      displayTable(selectedVersion.data);
      toggleElements('#tableContainer', 'show');
      
      if (typeof updateViewSelect === 'function') updateViewSelect();
      if (typeof renderDashboardQuickFilters === 'function') renderDashboardQuickFilters();
      
      setTimeout(() => {
        hideWelcomeScreen();
      }, 300);
      
      showNotification(`Version "${selectedVersion.displayName}" loaded successfully.`, 'success');
      console.log('✅ Selected version loaded:', selectedVersion.displayName);
      
    } catch (error) {
      console.error('Error loading selected version:', error);
      showNotification('Error loading selected version.', 'error');
    }
  }
}



// Functions for persistent login sessions
function savePersistentSession(email, userProfile) {
  const sessionData = {
    email: email,
    userProfile: userProfile,
    timestamp: new Date().toISOString(),
    expiresAt: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString() // 30 days
  };
  localStorage.setItem('thebridge_persistent_session', JSON.stringify(sessionData));
}

function loadPersistentSession() {
  try {
    const sessionData = localStorage.getItem('thebridge_persistent_session');
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData);
    const now = new Date();
    const expiresAt = new Date(session.expiresAt);
    
    if (now > expiresAt) {
      // Session expired, remove it
      localStorage.removeItem('thebridge_persistent_session');
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error loading persistent session:', error);
    localStorage.removeItem('thebridge_persistent_session');
    return null;
  }
}

function clearPersistentSession() {
  localStorage.removeItem('thebridge_persistent_session');
}

// Simple email validation function
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- Función global para obtener el email del usuario actual ---
function getCurrentUserEmail() {
  return localStorage.getItem('userEmail') || '';
}

// Check for OneDrive token in URL hash on page load
async function checkForOneDriveToken() {
  console.log('🔍 Checking for OneDrive token in URL hash...');
  
  const hash = window.location.hash;
  console.log('🔍 Current hash:', hash);
  
  if (hash && hash.includes('access_token')) {
    console.log('✅ OneDrive token detected in URL hash');
    
    try {
      // Parse the hash parameters
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const tokenType = params.get('token_type');
      const scope = params.get('scope');
      
      if (accessToken && tokenType === 'bearer' && scope && scope.includes('onedrive.readwrite')) {
        console.log('✅ Valid OneDrive token found, processing authentication...');
        
        // Clear the hash from URL immediately to prevent issues
        window.location.hash = '';
        
        // Show success notification
        if (typeof showUnifiedNotification === 'function') {
          showUnifiedNotification('OneDrive session detected, continuing...', 'success');
        }
        
        // Process the authentication immediately
        await processOneDriveAuthentication(accessToken);
        
        return true;
      } else {
        console.warn('⚠️ Invalid OneDrive token parameters');
      }
    } catch (error) {
      console.error('❌ Error processing OneDrive token:', error);
    }
  } else {
    console.log('ℹ️ No OneDrive token found in URL hash');
  }
  
  return false;
}

// Initialize the application
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Check for OneDrive token in URL hash FIRST
    const hasOneDriveToken = await checkForOneDriveToken();
    if (hasOneDriveToken) {
      console.log('✅ OneDrive token processed, continuing with initialization...');
    }
    
    // Check if OneDrive authentication is pending
    if (window.oneDriveAuthPending && window.oneDriveAccessToken) {
      console.log('🔄 OneDrive authentication pending, waiting for modules to load...');
    }
    
    // Verify Papa Parse is available
    if (typeof Papa === 'undefined') {
      throw new Error("Papa Parse is not loaded!");
    }
    console.log("✅ Papa Parse is loaded:", Papa.version);

    // Verify and repair IndexedDB FIRST
    console.log("🔧 Verificando y reparando IndexedDB...");
    await verifyAndRepairIndexedDB();
    
    // Limpiar almacenamiento local en desarrollo si hay problemas persistentes
    if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
      console.log("🧹 Clearing local storage in development...");
      try {
        localStorage.clear();
        sessionStorage.clear();
        console.log("✅ Local storage cleared");
      } catch (error) {
        console.warn("⚠️ Error clearing local storage:", error);
      }
    }

    // Initialize core components
    await initializeState();
    
    // Initialize column manager (this will also add the button)
    initializeColumnManager();
    
    // Initialize filter manager
    filterManager = initializeFilterManager();
    
    // Initialize report service
    initializeReportService();
    
    // Setup event listeners
    setupEventListeners();
    setupFilterEvents();
    setupSidebarToggle();
    
    // Hide table container initially
    const tableContainer = getElement('#tableContainer');
    if (tableContainer) {
      tableContainer.classList.add('hidden');
    }
    
    console.log("✅ Application initialized successfully");

    // Check if OneDrive authentication is still pending after initialization
    if (window.oneDriveAuthPending && window.oneDriveAccessToken) {
      console.log('🔄 OneDrive authentication still pending after initialization, checking modules...');
      
      const checkPendingAuth = () => {
        if (typeof showTeamSelectionAfterLogin === 'function' && 
            typeof OneDriveCustomPathIntegration !== 'undefined' &&
            typeof getAllTeams === 'function' &&
            typeof hideWelcomeScreen === 'function') {
          console.log('✅ All modules now available, processing pending OneDrive authentication...');
          
          // Initialize OneDrive integration
          if (!window.oneDriveIntegration) {
            window.oneDriveIntegration = new OneDriveCustomPathIntegration();
          }
          
          // Set the token in the integration
          window.oneDriveIntegration.accessToken = window.oneDriveAccessToken;
          window.oneDriveIntegration.isAuthenticated = true;
          
          // Clear the pending flag
          window.oneDriveAuthPending = false;
          
          // Proceed to team selection
          showTeamSelectionAfterLogin('OneDrive');
        } else {
          console.log('⏳ Still waiting for modules to load for pending auth...');
          setTimeout(checkPendingAuth, 500);
        }
      };
      
      setTimeout(checkPendingAuth, 1000);
    }

    // Initialize team system FIRST (handles auto-login for persistent sessions)
    initializeTeamSystem();
    
    // Setup welcome screen (will check if auto-login was successful)
    setupWelcomeScreen();
    setupSelectVersionModal();
    
    // Initialize user buttons visibility
    const currentUserEmail = getCurrentUserEmail();
    if (currentUserEmail) {
      showLogoutBtn();
    } else {
      hideUserButtons();
    }

    const copyTableBtn = document.getElementById('copyTableBtn');
    if (copyTableBtn) {
      copyTableBtn.addEventListener('click', async () => {
        const result = await copyTableToClipboard();
        showNotification(result.message, result.success ? 'success' : 'error');
      });
    }



    // Botón Show Duplicates
    const showDuplicatesBtn = document.getElementById('showDuplicatesBtn');
    const showDuplicatesModal = document.getElementById('showDuplicatesModal');
    const closeShowDuplicatesModalBtn = document.getElementById('closeShowDuplicatesModalBtn');
    const showDuplicatesForm = document.getElementById('showDuplicatesForm');
    const showDuplicatesSearch = document.getElementById('showDuplicatesSearch');
    const showDuplicatesSelectAllBtn = document.getElementById('showDuplicatesSelectAllBtn');
    const showDuplicatesDeselectAllBtn = document.getElementById('showDuplicatesDeselectAllBtn');
    const analyzeDuplicatesBtn = document.getElementById('analyzeDuplicatesBtn');
    const sendToMainTableBtn = document.getElementById('sendToMainTableBtn');
    const copyDuplicatesBtn = document.getElementById('copyDuplicatesBtn');
    const exportDuplicatesBtn = document.getElementById('exportDuplicatesBtn');
    const saveDuplicatesAsQuickFilterBtn = document.getElementById('saveDuplicatesAsQuickFilterBtn');
    const applyAsFilterBtn = document.getElementById('applyAsFilterBtn');
    const createAnalysisTabBtn = document.getElementById('createAnalysisTabBtn');

    // Estado temporal para columnas en el modal de show duplicates
    let allShowDupColumns = [];
    let filteredShowDupColumns = [];

    if (showDuplicatesBtn && showDuplicatesModal) {
      showDuplicatesBtn.addEventListener('click', () => {
        const data = getFilteredData();
        if (!data.length) {
          showNotification('No data to analyze for duplicates.', 'info');
          return;
        }
        
        // Mostrar modal y rellenar checkboxes de columnas visibles
        showDuplicatesForm.innerHTML = '';
        const columns = typeof getVisibleColumns === 'function' ? getVisibleColumns() : Object.keys(data[0] || {});
        allShowDupColumns = [...columns];
        filteredShowDupColumns = [...columns];
        renderShowDuplicatesForm();
        
        // Reset modal state
        document.getElementById('duplicatesSummary').style.display = 'none';
        document.getElementById('duplicatesTableSection').style.display = 'none';
        document.getElementById('duplicatesModalFooter').style.display = 'none';
        
        showDuplicatesModal.classList.remove('hidden');
        showDuplicatesModal.style.display = 'flex';
      });

      function renderShowDuplicatesForm() {
        showDuplicatesForm.innerHTML = '';
        filteredShowDupColumns.forEach(col => {
          const label = document.createElement('label');
          label.style.display = 'flex';
          label.style.alignItems = 'center';
          label.style.gap = '0.5rem';
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = col;
          checkbox.checked = true;
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(col));
          showDuplicatesForm.appendChild(label);
        });
      }

      // Buscador de columnas
      if (showDuplicatesSearch) {
        showDuplicatesSearch.addEventListener('input', (e) => {
          const term = e.target.value.trim().toLowerCase();
          filteredShowDupColumns = allShowDupColumns.filter(col => col.toLowerCase().includes(term));
          renderShowDuplicatesForm();
        });
      }

      // Select All
      if (showDuplicatesSelectAllBtn) {
        showDuplicatesSelectAllBtn.addEventListener('click', () => {
          showDuplicatesForm.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = true);
        });
      }
      // Deselect All
      if (showDuplicatesDeselectAllBtn) {
        showDuplicatesDeselectAllBtn.addEventListener('click', () => {
          showDuplicatesForm.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        });
      }

      // Analyze Duplicates button
      if (analyzeDuplicatesBtn) {
        analyzeDuplicatesBtn.addEventListener('click', () => {
          const selectedColumns = Array.from(showDuplicatesForm.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
          if (selectedColumns.length === 0) {
            showNotification('Select at least one column.', 'warning');
            return;
          }
          
          const data = getFilteredData();
          showDuplicates(data, selectedColumns);
          
          // Show results sections
          document.getElementById('duplicatesSummary').style.display = 'block';
          document.getElementById('duplicatesTableSection').style.display = 'block';
          document.getElementById('duplicatesModalFooter').style.display = 'flex';
          
          // Add analyze differences button if not already present
          setTimeout(() => {
            const modalFooter = document.getElementById('duplicatesModalFooter');
            if (modalFooter && !modalFooter.querySelector('.analyze-differences-btn')) {
              const analyzeBtn = document.createElement('button');
              analyzeBtn.textContent = 'Analyze Differences';
              analyzeBtn.className = 'modal-btn analyze-differences-btn';
              analyzeBtn.style.cssText = 'background:#f57c00; color:white; border:none; padding:8px 16px; border-radius:6px; cursor:pointer; margin-left:10px;';
              analyzeBtn.onclick = () => {
                console.log('🔍 Analyzing differences for columns:', selectedColumns);
                const result = findDuplicateRecordsWithDifferences(data, selectedColumns);
                console.log('🔍 Analysis result:', result);
                displayDuplicatesModal(result.duplicates, selectedColumns, result.differences);
                analyzeBtn.textContent = 'Show Original View';
                analyzeBtn.onclick = () => {
                  const originalDuplicates = findDuplicateRecords(data, selectedColumns);
                  displayDuplicatesModal(originalDuplicates, selectedColumns);
                  analyzeBtn.textContent = 'Analyze Differences';
                  analyzeBtn.onclick = () => {
                    console.log('🔍 Analyzing differences for columns:', selectedColumns);
                    const result = findDuplicateRecordsWithDifferences(data, selectedColumns);
                    console.log('🔍 Analysis result:', result);
                    displayDuplicatesModal(result.duplicates, selectedColumns, result.differences);
                    analyzeBtn.textContent = 'Show Original View';
                  };
                };
              };
              modalFooter.appendChild(analyzeBtn);
            }
          }, 100);
        });
      }

      if (closeShowDuplicatesModalBtn) {
        closeShowDuplicatesModalBtn.addEventListener('click', () => {
          showDuplicatesModal.classList.add('hidden');
          setTimeout(() => {
            showDuplicatesModal.style.display = 'none';
          }, 300);
        });
      }

      if (applyAsFilterBtn) {
        applyAsFilterBtn.addEventListener('click', () => {
          const selectedColumns = Array.from(showDuplicatesForm.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
          
          if (selectedColumns.length === 0) {
            showNotification('No columns selected for duplicate analysis.', 'warning');
            return;
          }
          
          const data = getFilteredData();
          const duplicates = findDuplicateRecords(data, selectedColumns);
          
          if (duplicates.length === 0) {
            showNotification('No duplicates found to analyze.', 'warning');
            return;
          }
          
          // Apply duplicates as filter to main table (no analysis panel)
          applyDuplicatesAsFilter(duplicates, selectedColumns, 'Manual Duplicate Filter', false);
          
          // Close the modal
          showDuplicatesModal.classList.add('hidden');
          setTimeout(() => {
            showDuplicatesModal.style.display = 'none';
          }, 300);
        });
      }

      if (sendToMainTableBtn) {
        sendToMainTableBtn.addEventListener('click', () => {
          const selectedColumns = Array.from(showDuplicatesForm.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
          
          if (selectedColumns.length === 0) {
            showNotification('No columns selected for duplicate analysis.', 'warning');
            return;
          }
          
          const data = getFilteredData();
          const duplicates = findDuplicateRecords(data, selectedColumns);
          
          if (duplicates.length === 0) {
            showNotification('No duplicates to send to new tab.', 'warning');
            return;
          }
          
          // Remove internal fields for new tab
          const cleanDuplicates = duplicates.map(row => {
            const cleanRow = { ...row };
            delete cleanRow._originalIndex;
            delete cleanRow._isDuplicate;
            return cleanRow;
          });
          
          // Create new tab using the main tabs system
          if (!window.duplicatesTabData) {
            window.duplicatesTabData = {};
          }
          if (!window.duplicatesTabCount) {
            window.duplicatesTabCount = 0;
          }
          
          window.duplicatesTabCount++;
          const tabName = `Duplicates #${window.duplicatesTabCount}`;
          
          // Deactivate all other tabs
          mainTabs.forEach(tab => tab.active = false);
          
          // Add new duplicates tab
          mainTabs.push({ name: tabName, type: 'duplicates', active: true });
          window.duplicatesTabData[tabName] = cleanDuplicates;
          
          // Render the tabs bar and activate the new tab
          renderMainTabsBar();
          activateMainTab(tabName);
          
          // Close the modal
          showDuplicatesModal.classList.add('hidden');
          setTimeout(() => {
            showDuplicatesModal.style.display = 'none';
          }, 300);
          
          // Show success notification
          showNotification(`Created new tab "${tabName}" with ${cleanDuplicates.length} duplicate records.`, 'success');
        });
      }

      if (createAnalysisTabBtn) {
        createAnalysisTabBtn.addEventListener('click', () => {
          const selectedColumns = Array.from(showDuplicatesForm.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
          
          if (selectedColumns.length === 0) {
            showNotification('No columns selected for duplicate analysis.', 'warning');
            return;
          }
          
          const data = getFilteredData();
          const duplicates = findDuplicateRecords(data, selectedColumns);
          
          if (duplicates.length === 0) {
            showNotification('No duplicates found to analyze.', 'warning');
            return;
          }
          
          // Analyze differences for the analysis tab
          const differences = findDuplicateRecordsWithDifferences(data, selectedColumns);
          
          // Create new tab with analysis info
          if (!window.duplicatesTabData) {
            window.duplicatesTabData = {};
          }
          if (!window.duplicatesTabCount) {
            window.duplicatesTabCount = 0;
          }
          
          window.duplicatesTabCount++;
          const tabName = `Analysis #${window.duplicatesTabCount}`;
          
          // Store the duplicate data with analysis info
          window.duplicatesTabData[tabName] = {
            data: duplicates,
            duplicateColumns: selectedColumns,
            differences: differences,
            filterName: `Analysis: ${selectedColumns.join(', ')}`
          };
          
          // Deactivate all other tabs
          mainTabs.forEach(tab => tab.active = false);
          
          // Add new analysis tab
          mainTabs.push({ name: tabName, type: 'duplicates', active: true });
          
          // Render the tabs bar and activate the new tab
          renderMainTabsBar();
          activateMainTab(tabName);
          
          // Close the modal
          showDuplicatesModal.classList.add('hidden');
          setTimeout(() => {
            showDuplicatesModal.style.display = 'none';
          }, 300);
          
          // Show success notification
          showNotification(`Created analysis tab "${tabName}" with ${duplicates.length} duplicate records and difference analysis.`, 'success');
        });
      }



      if (saveDuplicatesAsQuickFilterBtn) {
        saveDuplicatesAsQuickFilterBtn.addEventListener('click', () => {
          const selectedColumns = Array.from(showDuplicatesForm.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
          
          if (selectedColumns.length === 0) {
            showNotification('Please select at least one column for duplicate detection.', 'warning');
            return;
          }
          
          // Create modal for saving quick filter
          let modal = document.getElementById('saveDuplicateQuickFilterModal');
          if (!modal) {
            modal = document.createElement('div');
            modal.id = 'saveDuplicateQuickFilterModal';
            modal.className = 'modal-overlay';
            modal.style.zIndex = '10001';
            modal.innerHTML = `
              <div class="modal-panel" style="max-width:600px;">
                <div class="modal-header">
                  <div class="header-left">
                    <img src="LOGOTAB_rounded.png" alt="Logo" class="modal-logo">
                    <h3 class="panel-header-title">Save Duplicate Detection as Quick Filter</h3>
                  </div>
                  <button id="closeSaveDuplicateQuickFilterBtn" class="close-btn">×</button>
                </div>
                <div class="modal-content">
                  <div style='margin-bottom:1.5em;'>
                    <label style='font-weight:600;color:white;font-family:Inter,Segoe UI,Arial,sans-serif;margin-bottom:0.5rem;display:block;'>Quick Filter Name:</label>
                    <input id='duplicateQuickFilterNameInput' type='text' class="input" placeholder="e.g., Show Duplicates by Email" style='width:100%;margin-bottom:1rem;'>
                    
                    <label style='font-weight:600;color:white;font-family:Inter,Segoe UI,Arial,sans-serif;margin-bottom:0.5rem;display:block;'>Associate to urgency card:</label>
                    <select id='duplicateQuickFilterUrgencySelect' class="input filter-select" style='width:100%;margin-bottom:1rem;'>
                      <option value='Ninguna'>None</option>
                      <option value='Urgente'>Urgent</option>
                      <option value='Media'>Medium</option>
                      <option value='Baja'>Low</option>
                    </select>
                    
                    <label style='font-weight:600;color:white;font-family:Inter,Segoe UI,Arial,sans-serif;margin-bottom:0.5rem;display:block;'>Save to container:</label>
                    <select id='duplicateQuickFilterContainerSelect' class="input filter-select" style='width:100%;margin-bottom:1rem;'>
                      <option value=''>None</option>
                      <option value='default'>General Zone</option>
                      <option value='container1'>Order Management</option>
                      <option value='container2'>Booking Management</option>
                      <option value='container3'>Closing Operations</option>
                      <option value='container4'>Cargo Status</option>
                    </select>
                    
                    <label style='font-weight:600;color:white;font-family:Inter,Segoe UI,Arial,sans-serif;margin-bottom:0.5rem;display:block;'>Container title (optional):</label>
                    <input id='duplicateQuickFilterContainerTitleInput' type='text' class="input" placeholder='Enter custom container title' style='width:100%;margin-bottom:1rem;'>
                    
                    <label style='font-weight:600;color:white;font-family:Inter,Segoe UI,Arial,sans-serif;margin-bottom:0.5rem;display:block;'>Save to Hub:</label>
                    <select id='duplicateQuickFilterHubSelect' class="input filter-select" style='width:100%;margin-bottom:1rem;'>
                      <option value='ops'>Operations Hub</option>
                      <option value='dq'>Data Quality Hub</option>
                    </select>
                    
                    <div style='background: rgba(71, 178, 229, 0.1); border: 1px solid #47B2E5; border-radius: 6px; padding: 1rem; margin-bottom: 1rem;'>
                      <h5 style="margin: 0 0 0.5rem 0; color: #47B2E5;">Duplicate Detection Configuration</h5>
                      <div style="font-size: 0.9rem;">
                        <div><strong>Fields to check for duplicates:</strong></div>
                        <div style="margin-top: 0.5rem; color: #E8F4F8;">${selectedColumns.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button id='duplicateQuickFilterCancelBtn' class="modal-btn secondary">Cancel</button>
                  <button id='duplicateQuickFilterSaveBtn' class="modal-btn primary">Save Quick Filter</button>
                </div>
              </div>
            `;
            document.body.appendChild(modal);
          }

          // Show modal
          modal.classList.remove('hidden');

          // Setup event listeners
          const closeBtn = modal.querySelector('#closeSaveDuplicateQuickFilterBtn');
          const cancelBtn = modal.querySelector('#duplicateQuickFilterCancelBtn');
          const saveBtn = modal.querySelector('#duplicateQuickFilterSaveBtn');
          const hubSelect = modal.querySelector('#duplicateQuickFilterHubSelect');
          const containerSelect = modal.querySelector('#duplicateQuickFilterContainerSelect');

          const closeModal = () => {
            modal.classList.add('hidden');
          };

          closeBtn.onclick = closeModal;
          cancelBtn.onclick = closeModal;

          // Update container options when hub changes
          const updateContainerOptions = () => {
            const selectedHub = hubSelect.value;
            
            // Clear current options
            containerSelect.innerHTML = '';
            
            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'None';
            containerSelect.appendChild(defaultOption);
            
            if (selectedHub === 'dq') {
              // DQ Hub containers
              const dqContainers = [
                { value: 'dq-default', title: 'Data Quality Zone' },
                { value: 'dq-container1', title: 'Duplicate Analysis' },
                { value: 'dq-container2', title: 'Null Values' },
                { value: 'dq-container3', title: 'Format Issues' },
                { value: 'dq-container4', title: 'Completeness' }
              ];
              
              dqContainers.forEach(container => {
                const option = document.createElement('option');
                option.value = container.value;
                option.textContent = container.title;
                containerSelect.appendChild(option);
              });
            } else {
              // Ops Hub containers
              const opsContainers = [
                { value: 'default', title: 'General Zone' },
                { value: 'container1', title: 'Order Management' },
                { value: 'container2', title: 'Booking Management' },
                { value: 'container3', title: 'Closing Operations' },
                { value: 'container4', title: 'Cargo Status' }
              ];
              
              opsContainers.forEach(container => {
                const option = document.createElement('option');
                option.value = container.value;
                option.textContent = container.title;
                containerSelect.appendChild(option);
              });
            }
            
            // Reset container selection
            containerSelect.value = '';
          };

          // Detect current active hub and set it as default
          const isDqHub = document.querySelector('#dqDashboardModal:not(.hidden)');
          const isOpsHub = document.querySelector('#dashboardModal:not(.hidden)');
          
          if (isDqHub) {
            hubSelect.value = 'dq';
          } else if (isOpsHub) {
            hubSelect.value = 'ops';
          } else {
            hubSelect.value = 'ops'; // Fallback
          }
          
          // Set initial container options
          updateContainerOptions();
          
          // Add event listener for hub change
          hubSelect.addEventListener('change', updateContainerOptions);

          // Handle save
          saveBtn.onclick = () => {
            const name = modal.querySelector('#duplicateQuickFilterNameInput').value.trim();
            const urgency = modal.querySelector('#duplicateQuickFilterUrgencySelect').value;
            const container = modal.querySelector('#duplicateQuickFilterContainerSelect').value;
            const containerTitle = modal.querySelector('#duplicateQuickFilterContainerTitleInput').value.trim();
            const hubType = modal.querySelector('#duplicateQuickFilterHubSelect').value;
            
            if (!name) {
              showNotification('Please enter a name for the quick filter.', 'warning');
              return;
            }

            // Create a special quick filter that includes duplicate detection configuration
            const duplicateQuickFilter = {
              name: name,
              type: 'duplicate_detection',
              duplicateColumns: [...selectedColumns],
              urgencyCard: urgency !== 'Ninguna' ? urgency : null,
              container: container || null,
              containerTitle: containerTitle || null,
              hubType: hubType,
              createdAt: new Date().toISOString()
            };

            // Save to localStorage
            const savedDuplicateFilters = JSON.parse(localStorage.getItem('duplicateQuickFilters') || '{}');
            savedDuplicateFilters[name] = duplicateQuickFilter;
            localStorage.setItem('duplicateQuickFilters', JSON.stringify(savedDuplicateFilters));

            // Also save as a regular quick filter for compatibility
            saveAsRegularQuickFilter(name, urgency, container, containerTitle, selectedColumns, hubType);

            closeModal();
            showNotification(`Duplicate detection quick filter "${name}" saved successfully to ${hubType.toUpperCase()} Hub!`, 'success');
          };
        });
      }

      function saveAsRegularQuickFilter(name, urgency, container, containerTitle, duplicateColumns, hubType = 'ops') {
        // Create a regular quick filter that can be applied to show duplicates
        const data = getFilteredData();
        const headers = Object.keys(data[0] || {});
        
        // Create a special filter configuration that will trigger duplicate detection
        const filterValues = {
          _duplicateDetection: true,
          _duplicateColumns: duplicateColumns
        };
        
        const activeFilters = {
          _duplicateDetection: 'duplicate_detection'
        };

        const quickFilters = JSON.parse(localStorage.getItem('quickFilters') || '{}');
        const filterObj = { 
          filterValues, 
          activeFilters, 
          headers, 
          hubType: hubType,
          duplicateDetection: true,
          duplicateColumns: [...duplicateColumns]
        };
        
        if (urgency && urgency !== 'Ninguna') filterObj.linkedUrgencyCard = urgency;
        if (container) filterObj.container = container;
        if (containerTitle) filterObj.containerTitle = containerTitle;
        
        quickFilters[name] = filterObj;
        localStorage.setItem('quickFilters', JSON.stringify(quickFilters));
      }
    }

    // Botón Remove Duplicates
    const removeDuplicatesBtn = document.getElementById('removeDuplicatesBtn');
    const removeDuplicatesModal = document.getElementById('removeDuplicatesModal');
    const closeRemoveDuplicatesModalBtn = document.getElementById('closeRemoveDuplicatesModalBtn');
    const removeDuplicatesForm = document.getElementById('removeDuplicatesForm');
    const confirmRemoveDuplicatesBtn = document.getElementById('confirmRemoveDuplicatesBtn');
    const removeDuplicatesSearch = document.getElementById('removeDuplicatesSearch');
    const removeDuplicatesSelectAllBtn = document.getElementById('removeDuplicatesSelectAllBtn');
    const removeDuplicatesDeselectAllBtn = document.getElementById('removeDuplicatesDeselectAllBtn');

    // Estado temporal para columnas visibles en el modal
    let allRemoveDupColumns = [];
    let filteredRemoveDupColumns = [];

    if (removeDuplicatesBtn && removeDuplicatesModal && removeDuplicatesForm && confirmRemoveDuplicatesBtn) {
      removeDuplicatesBtn.addEventListener('click', () => {
        // Mostrar modal y rellenar checkboxes de columnas visibles
        removeDuplicatesForm.innerHTML = '';
        const data = getFilteredData();
        if (!data.length) {
          showNotification('No data to deduplicate.', 'info');
          return;
        }
        const columns = typeof getVisibleColumns === 'function' ? getVisibleColumns() : Object.keys(data[0] || {});
        allRemoveDupColumns = [...columns];
        filteredRemoveDupColumns = [...columns];
        renderRemoveDuplicatesForm();
        removeDuplicatesModal.classList.remove('hidden');
        removeDuplicatesModal.style.display = 'flex';
      });

      function renderRemoveDuplicatesForm() {
        removeDuplicatesForm.innerHTML = '';
        filteredRemoveDupColumns.forEach(col => {
          const label = document.createElement('label');
          label.style.display = 'flex';
          label.style.alignItems = 'center';
          label.style.gap = '0.5rem';
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = col;
          checkbox.checked = true;
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(col));
          removeDuplicatesForm.appendChild(label);
        });
      }

      // Buscador de columnas
      if (removeDuplicatesSearch) {
        removeDuplicatesSearch.addEventListener('input', (e) => {
          const term = e.target.value.trim().toLowerCase();
          filteredRemoveDupColumns = allRemoveDupColumns.filter(col => col.toLowerCase().includes(term));
          renderRemoveDuplicatesForm();
        });
      }

      // Select All
      if (removeDuplicatesSelectAllBtn) {
        removeDuplicatesSelectAllBtn.addEventListener('click', () => {
          removeDuplicatesForm.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = true);
        });
      }
      // Deselect All
      if (removeDuplicatesDeselectAllBtn) {
        removeDuplicatesDeselectAllBtn.addEventListener('click', () => {
          removeDuplicatesForm.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        });
      }

      closeRemoveDuplicatesModalBtn.addEventListener('click', () => {
        removeDuplicatesModal.classList.add('hidden');
        setTimeout(() => {
          removeDuplicatesModal.style.display = 'none';
        }, 300);
      });

      confirmRemoveDuplicatesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const checked = Array.from(removeDuplicatesForm.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
        if (!checked.length) {
          showNotification('Select at least one column.', 'warning');
          return;
        }
        const data = getFilteredData();
        const seen = new Set();
        const deduped = [];
        data.forEach(row => {
          const key = checked.map(col => row[col]).join('||');
          if (!seen.has(key)) {
            seen.add(key);
            deduped.push(row);
          }
        });
        if (deduped.length < data.length) {
          showNotification(`Removed ${data.length - deduped.length} duplicates.`, 'success');
          // Store current table filters
          const tableActiveFilters = getTableActiveFilters();
          const tableFilterValues = getTableFilterValues();
          // Update original data with deduplicated data
          setOriginalData(deduped);
          // Restore table filters
          setTableActiveFilters(tableActiveFilters);
          setTableFilterValues(tableFilterValues);
          // Reapply all filters
          applyFilters();
        } else {
          showNotification('No duplicates found.', 'info');
        }
        removeDuplicatesModal.classList.add('hidden');
        setTimeout(() => {
          removeDuplicatesModal.style.display = 'none';
        }, 300);
      });
    }

    // --- Login/Registro Modal Logic ---
    if (!getCurrentUserEmail()) {
      showLoginRegisterModal();
      const el = document.getElementById('logoutBtn');
      if (el) el.style.display = 'none';
    } else {
      showLogoutBtn();
    }

    // Backup Modal Setup
    setupBackupModal();

    const addCustomColumnBtn = document.getElementById('addCustomColumnBtn');
    if (addCustomColumnBtn) {
      addCustomColumnBtn.addEventListener('click', () => {
        console.log('Botón de añadir columna clickeado');
        customColumnManager.addNewColumn();
      });
    }

    // Custom Summary button
    const customSummaryBtn = document.getElementById('openCustomSummaryBtn');
    if (customSummaryBtn) {
      customSummaryBtn.addEventListener('click', () => {
        if (window.openSummaryModal) window.openSummaryModal();
      });
    }
    // Forzar setup de eventos y asignación global
    window.openSummaryModal = openSummaryModal;
    setupSummaryModalEvents();

    // Initialize Ops Hub Summary
    window.opsHubSummary = new OpsHubSummary();
    
    // Initialize DQ Hub Summary
    window.dqHubSummary = new DqHubSummary();
    
    // Force update team status bar to handle guest mode properly
    setTimeout(async () => {
      await updateTeamStatusBar();
      await updateTeamManagementButtonText();
    }, 500);



    const globalSearchInput = document.getElementById('globalSearchInput');
    if (globalSearchInput) {
      // Eliminado: evento focus que borraba el input y el filtro

      // Añadir evento blur para restaurar el valor si se pierde el foco sin escribir
      globalSearchInput.addEventListener('blur', function() {
        const currentFilters = getModuleFilterValues();
        const globalSearch = currentFilters['__globalSearch'];
        if (globalSearch && !this.value) {
          this.value = globalSearch;
        }
      });
    }
  } catch (error) {
    showError("Error initializing application. Please check the console for details.");
    console.error("❌ Error details:", error);
  }
});

// Setup event listeners
function setupEventListeners() {
  const fileInput = getElement('#csvFileInput');
  const searchInput = getElement('#globalSearchInput');
  const rowsPerPageSelect = getElement('#rowsPerPageSelect');
  const teamManagementBtn = getElement('#teamManagementBtn');
  
  if (fileInput) {
    fileInput.addEventListener('change', handleFileUpload);
  }
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
  }
  
  if (rowsPerPageSelect) {
    rowsPerPageSelect.addEventListener('change', (e) => {
      setRowsPerPage(parseInt(e.target.value));
      // Reset to first page when changing rows per page
      setCurrentPage(1);
      // Use filtered data instead of original data to preserve filters
      const filteredData = getFilteredData();
      displayTable(filteredData);
    });
  }
  
  // Team management button is handled in the new section below
  
  // Add team login button event
  const teamLoginBtn = getElement('#teamLoginBtn');
  if (teamLoginBtn) {
    teamLoginBtn.addEventListener('click', () => {
      // Check if there are existing teams
      const teams = getAllTeams();
      if (teams.length > 0) {
        // Show team login modal if teams exist
        showTeamLoginModal();
      } else {
        // Show team creation modal if no teams exist
        showTeamProfileModal();
      }
    });
  }
  
  // Add team management button event - make it more obvious
  if (teamManagementBtn) {
    teamManagementBtn.addEventListener('click', async () => {
      // Check if there are existing teams
      const teams = await getAllTeams();
      if (teams.length > 0) {
        // If user is logged into a team, show options menu
        if (window.currentTeam && window.currentUser) {
          showTeamManagementMenu();
        } else {
          // Show team login modal if teams exist but user not logged in
          showTeamLoginModal();
        }
      } else {
        // Show team creation modal if no teams exist
        showTeamProfileModal();
      }
    });
  }
}

// Handle file upload
async function handleFileUpload(event) {
  const bar = document.getElementById('csvLoadingBar');
  if (bar) {
    bar.style.display = 'block';
    bar.style.width = '0';
    setTimeout(() => { bar.style.width = '80%'; }, 100);
  }
  
  // Show loading cursor immediately
  showLoadingCursorWithTimeout(30000); // 30 second timeout for large files
  
  // Si ya hay datos cargados, procesar el nuevo CSV directamente sin recargar
  if (getOriginalData && getOriginalData().length > 0) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (!file) {
      hideLoadingCursor();
      return;
    }
    showInAppLoading('Loading new CSV...'); // Mostrar loader in-app más sutil
    
    try {
      // Validar archivo
      const validationResult = await validateCSVFile(file);
      if (!validationResult.isValid) {
        throw new Error(validationResult.error);
      }
      
      // Procesar CSV directamente
      const result = await parseCSVFile(file);
      if (!result.data || !result.data.length) {
        throw new Error("No data found in CSV file");
      }
      
      // Actualizar nombre del archivo
      currentCSVFileName = file.name;
      
      // Formatear fechas a YYYY-MM-DD
      const dateColumns = detectDateColumns(result.data);
      result.data.forEach(row => {
        dateColumns.forEach(col => {
          if (row[col]) row[col] = formatDateToYMD(row[col]);
        });
      });
      
      // Actualizar datos de la aplicación primero
      setOriginalData(result.data);
      setCurrentHeaders(Object.keys(result.data[0]));
      setVisibleColumns(Object.keys(result.data[0]));
      
      // Inicializar filtros y servicios
      filterManager = initializeFilterManager(result.data);
      initializeReportService();
      
      // Actualizar UI
      displayTable(result.data);
      toggleElements('#tableContainer', 'show');
      
      // Resetear filtros y estado después de inicializar
      resetFilterManager();
      window.hasTableDropdownFilters = false;
      
      // Generar sidebar de filtros con delay para asegurar que los datos estén disponibles
      setTimeout(() => {
        generateFilterSidebar(Object.keys(result.data[0]));
        
        // Validar compatibilidad de filtros existentes con las nuevas columnas
        if (typeof validateFilterCompatibility === 'function') {
          const incompatibleCount = validateFilterCompatibility();
          if (incompatibleCount > 0) {
            console.log(`⚠️ ${incompatibleCount} filters are incompatible with the new CSV columns`);
          }
        }
        
        // Asegurar que las pestañas de filtros estén configuradas
        if (typeof setupFilterTabs === 'function') {
          setupFilterTabs();
        }
      }, 100);
      
      // Actualizar select de vistas
      if (typeof updateViewSelect === 'function') {
        updateViewSelect();
        setTimeout(() => {
          updateViewSelect();
        }, 100);
      }
      
      // Renderizar filtros rápidos del dashboard
      if (typeof renderDashboardQuickFilters === 'function') {
        renderDashboardQuickFilters();
      }
      
      hideInAppLoading();
      hideLoadingCursor(); // Hide loading cursor
      
      // Mostrar notificación de éxito
      if (typeof window.showUnifiedNotification === 'function') {
        window.showUnifiedNotification(`New CSV loaded successfully: ${file.name} (${result.data.length} records)`, 'success');
      } else {
        showNotification(`New CSV loaded: ${file.name}`, 'success');
      }
      
      console.log("✅ New CSV loaded successfully:", {
        file: file.name,
        rows: result.data.length,
        fields: Object.keys(result.data[0]).length
      });
      
    } catch (error) {
      hideInAppLoading();
      hideLoadingCursor(); // Hide loading cursor on error
      console.error("❌ Error loading new CSV:", error);
      
      if (typeof window.showUnifiedNotification === 'function') {
        window.showUnifiedNotification(`Error loading CSV: ${error.message}`, 'error');
      } else {
        showError(error.message || "Error processing CSV file");
      }
      
      // Limpiar el input para permitir reintentar
      fileInput.value = '';
    }
    
    return;
  }
  const fileInput = event.target;
  try {
    const file = fileInput.files[0];
    if (!file) {
      hideLoadingCursor();
      return;
    }
    
    // Mostrar estado de carga en la pantalla de bienvenida
    showWelcomeLoading();
    
    currentCSVFileName = file.name; // Guardar nombre del archivo
    
    // Validate file
    const validationResult = await validateCSVFile(file);
    if (!validationResult.isValid) {
      throw new Error(validationResult.error);
    }
    
    // Parse CSV
    const result = await parseCSVFile(file);
    if (!result.data || !result.data.length) {
      throw new Error("No data found in CSV file");
    }

    // Reset de filtros igual que el botón del módulo, justo antes de inicializar el módulo de filtros
    resetFilterManager();
    // Resetear flag de filtros de dropdown de tabla
    window.hasTableDropdownFilters = false;
    filterManager = initializeFilterManager(result.data);
    setTimeout(() => {
      resetFilterManager();
      generateFilterSidebar(Object.keys(result.data[0]));
    }, 30);

          // VISUAL CLEANUP: Remove all filter panels and grids from DOM
    const filterPanels = document.querySelector('.filter-panels');
    if (filterPanels) {
      filterPanels.querySelectorAll('.filter-panel').forEach(panel => panel.innerHTML = '');
    }
    const filterTabs = document.querySelector('.filter-tabs');
    if (filterTabs) {
      filterTabs.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
    }

    // Formatear fechas a YYYY-MM-DD
    const dateColumns = detectDateColumns(result.data);
    result.data.forEach(row => {
      dateColumns.forEach(col => {
        if (row[col]) row[col] = formatDateToYMD(row[col]);
      });
    });

    // Update application state
    setOriginalData(result.data);
    setCurrentHeaders(Object.keys(result.data[0]));
    setVisibleColumns(Object.keys(result.data[0]));

    // Initialize report service with new data
    initializeReportService();
    
    // Update UI
    displayTable(result.data);
    toggleElements('#tableContainer', 'show');
    
    // Refrescar el select de vistas
    if (typeof setupViewSelect === 'function') {
      setupViewSelect();
    }
    if (typeof initializeColumnManager === 'function') {
      initializeColumnManager();
    }
    // Forzar una segunda actualización después de un breve retraso
    setTimeout(() => {
      if (typeof setupViewSelect === 'function') {
        setupViewSelect();
      }
      if (typeof initializeColumnManager === 'function') {
        initializeColumnManager();
      }
    }, 100);
    
    // Ocultar pantalla de bienvenida después de un pequeño delay para mostrar la carga
    setTimeout(() => {
      hideWelcomeScreen();
    }, 300);
    
    console.log("✅ CSV file processed successfully:", {
      rows: result.data.length,
      fields: result.meta.fields?.length || Object.keys(result.data[0]).length
    });
    if (bar) {
      bar.style.width = '100%';
      setTimeout(() => { bar.style.display = 'none'; bar.style.width = '0'; }, 400);
    }
    
    // Hide loading cursor after successful processing
    setTimeout(() => {
      hideLoadingCursor();
    }, 500);
  } catch (error) {
    // Si ya había datos cargados, ocultar el loader in-app, sino mostrar opciones de bienvenida
    if (getOriginalData && getOriginalData().length > 0) {
      hideInAppLoading();
    } else {
      showWelcomeOptions(); // Mostrar opciones de nuevo en caso de error
    }
    hideLoadingCursor(); // Hide loading cursor on error
    showError(error.message || "Error processing CSV file");
    console.error("❌ Error details:", error);
    // Clear the file input so the user can try again with the same file
    fileInput.value = '';
    if (bar) {
      bar.style.width = '100%';
      setTimeout(() => { bar.style.display = 'none'; bar.style.width = '0'; }, 400);
    }
  }
}

// Handle global search
function handleSearch(event) {
  const searchTerm = event.target.value;
  // Guardar el valor original, sin modificar, para que el filtro lo procese correctamente
  setModuleFilterValues({ ...getModuleFilterValues(), '__globalSearch': searchTerm });
  if (typeof setCurrentPage === 'function') setCurrentPage(1);
  applyFilters();
}

function setupSidebarToggle() {
  const toggleBtn = getElement('#toggleSidebarBtn');
  const sidebar = getElement('#sidebar');
  
  if (!toggleBtn || !sidebar) return;
  
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
}

// Setup filter-related events
function setupFilterEvents() {
  const toggleFiltersBtn = getElement('#toggleFiltersBtn');
  const filterModal = getElement('#filterModal');
  const filterOverlay = getElement('#filterModalOverlay');
  const closeFilterBtn = getElement('#closeFilterModalBtn');
  const applyFilterBtn = getElement('#applyFiltersBtn');
  const resetFilterBtn = getElement('#resetFiltersBtn');

  if (!toggleFiltersBtn || !filterModal || !filterOverlay || !closeFilterBtn) {
    console.warn('Some filter elements are missing');
    return;
}

  const showFilterModal = () => {
    try {
      // Generate filter content if we have data
      if (filterManager) {
        const data = getOriginalData();
        if (data && data.length > 0) {
          const headers = Object.keys(getOriginalData()[0] || {});
          generateFilterSidebar(headers);
          
          // Validate filter compatibility when opening modal
          if (typeof validateFilterCompatibility === 'function') {
            const incompatibleCount = validateFilterCompatibility();
            if (incompatibleCount > 0) {
              console.log(`⚠️ ${incompatibleCount} filters are incompatible with current CSV columns`);
            }
          }
        } else {
          console.warn('No data available for filters');
          return;
        }
      } else {
        console.warn('Filter manager not initialized');
        return;
      }
      // Use glassmorphism classes instead of inline styles
      filterOverlay.classList.remove('hidden');
      filterOverlay.classList.add('visible');
      filterModal.classList.remove('hidden');
      
      // Force a reflow to ensure the transition works
      filterModal.offsetHeight;
      // Seleccionar la pestaña Active Filters por defecto
      const tabs = filterModal.querySelectorAll('.filter-tab');
      tabs.forEach(tab => tab.classList.remove('active'));
      const activeTab = filterModal.querySelector('.filter-tab[data-target="active"]');
      if (activeTab) activeTab.classList.add('active');
      // Mostrar el panel correspondiente
      const panels = filterModal.querySelectorAll('.filter-panel');
      panels.forEach(panel => panel.classList.remove('active'));
      const activePanel = filterModal.querySelector('#activeFilterPanel');
      if (activePanel) activePanel.classList.add('active');
      renderActiveFiltersSummaryChips();
    } catch (error) {
      console.error('Error showing filter modal:', error);
      showError('Error loading filters. Please try again.');
    }
  };

  const hideFilterModal = () => {
    try {
      filterModal.classList.add('hidden');
      filterOverlay.classList.add('hidden');
      filterOverlay.classList.remove('visible');
    } catch (error) {
      console.error('Error hiding filter modal:', error);
      // Force hide in case of error
      filterModal.classList.add('hidden');
      filterOverlay.classList.add('hidden');
      filterOverlay.classList.remove('visible');
    }
  };

  // Toggle filters button
  toggleFiltersBtn.addEventListener('click', showFilterModal);

  // Close button
  closeFilterBtn.addEventListener('click', hideFilterModal);

  // Overlay click
  filterOverlay.addEventListener('click', (e) => {
    if (e.target === filterOverlay) {
      hideFilterModal();
}
  });

  // Apply filters
  applyFilterBtn?.addEventListener('click', () => {
    try {
      if (filterManager) {
        filterManager.applyFilters();
        updateActiveFiltersSummary();
        renderActiveFiltersSummaryChips();
        hideFilterModal();
      }
    } catch (error) {
      console.error('Error applying filters:', error);
      showError('Error applying filters. Please try again.');
    }
  });

  // Reset filters
  resetFilterBtn?.addEventListener('click', () => {
    try {
      resetFilterManager();
      generateFilterSidebar(getCurrentHeaders());
      // Show unified notification instead of old modal
      if (typeof window.showUnifiedNotification === 'function') {
        window.showUnifiedNotification('All filters cleared!', 'info');
      }
      // Actualizar la tabla después de resetear los filtros
      const data = getOriginalData();
      if (data) {
        displayTable(data);
      }
    } catch (error) {
      console.error('Error resetting filters:', error);
      showError('Error resetting filters. Please try again.');
    }
  });

  // Handle ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !filterModal.classList.contains('hidden')) {
      hideFilterModal();
    }
  });
}

// Dashboard desplegable y edición
const dashboardBtn = document.getElementById('dashboardToggleBtn');
const dashboardPanel = document.getElementById('dashboardModal');
const dashboardClose = document.getElementById('dashboardCloseBtn');
const dashboardEditBtn = document.getElementById('dashboardEditBtn');
const dashboardEditPanel = document.getElementById('dashboardEditPanel');
const dashboardEditForm = document.getElementById('dashboardEditForm');
const dashboardEditSaveBtn = document.getElementById('dashboardEditSaveBtn');
const dashboardEditCancelBtn = document.getElementById('dashboardEditCancelBtn');

// Drag & drop para reordenar secciones del dashboard
function setupDashboardEditDragDrop() {
  const list = document.getElementById('dashboardEditList');
  let draggedItem = null;
  list.querySelectorAll('.dashboard-edit-item').forEach(item => {
    item.draggable = true;
    item.addEventListener('dragstart', (e) => {
      draggedItem = item;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', () => {
      draggedItem = null;
      item.classList.remove('dragging');
    });
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (draggedItem && draggedItem !== item) {
        const rect = item.getBoundingClientRect();
        const next = (e.clientY - rect.top) > (rect.height / 2);
        list.insertBefore(draggedItem, next ? item.nextSibling : item);
      }
    });
  });
}

function getDashboardEditConfigFromForm() {
  const list = document.getElementById('dashboardEditList');
  const items = Array.from(list.querySelectorAll('.dashboard-edit-item'));
  const config = { order: [], titles: {}, kpis: false, charts: false, quickfilters: false, activity: false };
  items.forEach(item => {
    const section = item.dataset.section;
    const checked = item.querySelector('input[type="checkbox"]').checked;
    const title = item.querySelector('input[type="text"]').value || '';
    config.order.push(section);
    config.titles[section] = title;
    config[section] = checked;
  });
  return config;
}

function applyDashboardConfig(config) {
  // Ordenar y mostrar/ocultar secciones según config
  const panel = dashboardPanel;
  const sectionMap = {
    kpis: panel.querySelector('.dashboard-kpis'),
    charts: panel.querySelector('.dashboard-charts'),
    quickfilters: panel.querySelector('.dashboard-quickfilters'),
    activity: panel.querySelector('.dashboard-activity')
  };
  // Ordenar
  const order = Array.isArray(config.order)
    ? config.order
    : ['kpis', 'charts', 'quickfilters', 'activity'];
  order.forEach(section => {
    if (sectionMap[section]) panel.appendChild(sectionMap[section]);
  });
  // Mostrar/ocultar y títulos
  Object.entries(sectionMap).forEach(([section, el]) => {
    if (!el) return;
    el.style.display = config[section] ? '' : 'none';
    // Cambiar título si aplica
    const titleInput = el.querySelector('.kpi-title, .chart-placeholder, .activity-title');
    if (titleInput && config.titles && config.titles[section]) {
      if (section === 'kpis') titleInput.textContent = config.titles[section];
      if (section === 'charts') el.querySelectorAll('.chart-placeholder')[0].textContent = config.titles[section];
      if (section === 'quickfilters') {/* No hay título visual */}
      if (section === 'activity') titleInput.textContent = config.titles[section];
    }
  });
  if (typeof renderDashboardQuickFilters === 'function') renderDashboardQuickFilters();
}

async function getDashboardConfig() {
  const defaultConfig = {
    order: ['kpis', 'charts', 'quickfilters', 'activity'],
    titles: { kpis: 'Quick KPIs', charts: 'Mini Charts', quickfilters: 'Quick Filters', activity: 'Recent Activity' },
    kpis: true, charts: true, quickfilters: true, activity: true
  };
  
  try {
    // Try to load from unified storage (OneDrive first, then localStorage)
    const stored = await loadFromUnifiedBackend('dashboard-config.json', {
      teamId: window.currentTeam?.id || 'default-team',
      userEmail: window.currentUser?.email || 'default-user@example.com'
    });
    
    if (stored && typeof stored === 'object') {
      console.log('✅ Dashboard config loaded from unified storage:', stored);
      // Fusiona con los valores por defecto
      return {
        ...defaultConfig,
        ...stored,
        order: Array.isArray(stored.order) ? stored.order : defaultConfig.order,
        titles: { ...defaultConfig.titles, ...(stored.titles || {}) }
      };
    }
  } catch (error) {
    console.log('⚠️ Could not load dashboard config from unified storage, trying localStorage:', error);
  }
  
  // Fallback to localStorage
  try {
    const stored = JSON.parse(localStorage.getItem('dashboardConfig')) || {};
    console.log('📂 Dashboard config loaded from localStorage:', stored);
    // Fusiona con los valores por defecto
    return {
      ...defaultConfig,
      ...stored,
      order: Array.isArray(stored.order) ? stored.order : defaultConfig.order,
      titles: { ...defaultConfig.titles, ...(stored.titles || {}) }
    };
  } catch (error) {
    console.log('⚠️ Error loading dashboard config from localStorage:', error);
    return defaultConfig;
  }
}

async function saveDashboardConfig(config) {
  try {
    // Save to unified storage (OneDrive first, then localStorage)
    const result = await saveToUnifiedBackend(config, 'dashboard-config.json', {
      teamId: window.currentTeam?.id || 'default-team',
      userEmail: window.currentUser?.email || 'default-user@example.com'
    });
    
    console.log('✅ Dashboard config saved to unified storage:', result);
    
    // Also save to localStorage as backup
  localStorage.setItem('dashboardConfig', JSON.stringify(config));
  
  // Show notification
  if (typeof window.showUnifiedNotification === 'function') {
      const storageType = result.type === 'OneDrive' ? 'OneDrive' : 'local storage';
      window.showUnifiedNotification(`Dashboard configuration saved to ${storageType}!`, 'success');
    }
  } catch (error) {
    console.error('❌ Error saving dashboard config to unified storage:', error);
    
    // Fallback to localStorage only
    try {
      localStorage.setItem('dashboardConfig', JSON.stringify(config));
      console.log('📂 Dashboard config saved to localStorage as fallback');
      
      if (typeof window.showUnifiedNotification === 'function') {
        window.showUnifiedNotification('Dashboard configuration saved locally (cloud unavailable)', 'warning');
      }
    } catch (localError) {
      console.error('❌ Error saving dashboard config to localStorage:', localError);
      if (typeof window.showUnifiedNotification === 'function') {
        window.showUnifiedNotification('Error saving dashboard configuration', 'error');
      }
    }
  }
}

if (dashboardEditBtn && dashboardEditPanel && dashboardEditForm && dashboardEditSaveBtn && dashboardEditCancelBtn) {
  // Removed conflicting dashboard toggle event listener
  dashboardEditBtn.addEventListener('click', async () => {
    // Cargar config actual en los checkboxes, títulos y orden
    const config = await getDashboardConfig();
    const list = document.getElementById('dashboardEditList');
    // Ordenar items según config.order
    config.order.forEach(section => {
      const item = list.querySelector(`[data-section="${section}"]`);
      if (item) list.appendChild(item);
    });
    // Set checkboxes y títulos
    list.querySelectorAll('.dashboard-edit-item').forEach(item => {
      const section = item.dataset.section;
      item.querySelector('input[type="checkbox"]').checked = !!config[section];
      item.querySelector('input[type="text"]').value = config.titles[section] || '';
    });
    dashboardEditPanel.classList.remove('hidden');
    setupDashboardEditDragDrop();
  });
  dashboardEditSaveBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const config = getDashboardEditConfigFromForm();
    await saveDashboardConfig(config);
    applyDashboardConfig(config);
    dashboardEditPanel.classList.add('hidden');
  });
  dashboardEditCancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dashboardEditPanel.classList.add('hidden');
  });
  // Aplica config al cargar
  (async () => {
    const config = await getDashboardConfig();
    applyDashboardConfig(config);
  })();
  
  // Configurar dashboard de gráficas
  setupDashboardCharts();
}

// Renderiza los filtros rápidos en el dashboard
function renderDashboardQuickFilters() {
  const quickFiltersDiv = document.querySelector('.quickfilters-grid');
  if (!quickFiltersDiv) return;

  // Limpiar contenedores existentes
  quickFiltersDiv.innerHTML = '';

  // Detectar qué hub está activo
  const isDqHub = quickFiltersDiv.closest('#dqDashboardModal');
  const isOpsHub = quickFiltersDiv.closest('#dashboardModal');
  
  // Definir los contenedores según el hub activo
  let defaultContainers;
  let hubType;
  
  if (isDqHub) {
    defaultContainers = {
      'dq-default': 'Data Quality Zone',
      'dq-container1': 'Duplicate Analysis',
      'dq-container2': 'Null Values',
      'dq-container3': 'Format Issues',
      'dq-container4': 'Completeness'
    };
    hubType = 'dq';
  } else if (isOpsHub) {
    defaultContainers = {
    'default': 'Zone',
    'container1': 'Orders Management',
    'container2': 'Booking Management',
    'container3': 'Closings',
    'container4': 'Cargo Status'
  };
    hubType = 'ops';
  } else {
    // Fallback para otros casos
    defaultContainers = {
      'default': 'Zone',
      'container1': 'Orders Management',
      'container2': 'Booking Management',
      'container3': 'Closings',
      'container4': 'Cargo Status'
    };
    hubType = 'ops';
  }

  // Cargar filtros guardados según el hub activo
  const allQuickFilters = loadQuickFilters();
  const quickFilters = Object.entries(allQuickFilters)
    .filter(([name, filter]) => {
      // For backward compatibility: if hubType is not defined, consider it as 'ops'
      const filterHubType = filter.hubType || 'ops';
      return filterHubType === hubType;
    })
    .reduce((acc, [name, filter]) => {
      acc[name] = filter;
      return acc;
    }, {});
  const grouped = {};
  
  // Inicializar los contenedores predeterminados
  Object.entries(defaultContainers).forEach(([key, title]) => {
    grouped[key] = { title, filters: [] };
  });
  
  // Agrupar filtros por contenedor
  Object.entries(quickFilters).forEach(([name, filterObj]) => {
    // Solo incluir si tiene un campo container definido y no vacío
    if (!filterObj.container || filterObj.container === '') return;
    const key = filterObj.container;
    if (!grouped[key]) {
      grouped[key] = { 
        title: filterObj.containerTitle || key.replace('container', 'Container '),
        filters: [] 
      };
    } else if (filterObj.containerTitle) {
      // Actualizar el título si hay uno personalizado
      grouped[key].title = filterObj.containerTitle;
    }
    grouped[key].filters.push({ name, filterObj });
  });

  // Obtener columnas actuales para validación
  const currentHeaders = Object.keys(getOriginalData()[0] || {});
  const currentSet = new Set(currentHeaders);

  // --- Quick filters acumulativos ---
  if (hubType === 'dq') {
    if (!window.activeDqDashboardQuickFilters) window.activeDqDashboardQuickFilters = [];
  } else {
  if (!window.activeDashboardQuickFilters) window.activeDashboardQuickFilters = [];
  }

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
      const sameColumns = currentSet.size === savedSet.size && 
                         [...currentSet].every(col => savedSet.has(col));

      const card = document.createElement('div');
      card.className = 'kpi-card';
      card.style.cursor = sameColumns ? 'pointer' : 'not-allowed';
      card.style.position = 'relative';
      
      if (!sameColumns) {
        card.style.opacity = '0.5';
        card.title = 'This quick filter cannot be applied to the current CSV.';
      }

      // Title
      const cardTitle = document.createElement('div');
      cardTitle.className = 'kpi-title';
      cardTitle.textContent = name;
      cardTitle.title = name; // Mostrar tooltip con el texto completo
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
      value.textContent = sameColumns ? getDashboardQuickFilterPreviewCount(name).toLocaleString() : '-';
      card.appendChild(value);

      // Delete button
      // const closeBtn = document.createElement('button');
      // closeBtn.className = 'quickfilter-close-btn';
      // closeBtn.title = 'Delete filter';
      // closeBtn.textContent = '×';
      // closeBtn.addEventListener('click', (e) => {
      //   e.stopPropagation();
      //   if (confirm(`Are you sure you want to delete the quick filter "${name}"?`)) {
      //     deleteQuickFilter(name);
      //     card.remove();
      //     // Si no quedan cards, mostrar mensaje vacío
      //     if (cardsContainer.children.length === 0) {
      //       const empty = document.createElement('span');
      //       empty.textContent = 'No quick filters saved.';
      //       empty.style.color = '#888';
      //       cardsContainer.appendChild(empty);
      //     }
      //   }
      // });
      // card.appendChild(closeBtn);

      // --- ACUMULATIVO: marcar activa y lógica de click ---
      const activeFiltersArray = hubType === 'dq' ? window.activeDqDashboardQuickFilters : window.activeDashboardQuickFilters;
      const isActive = activeFiltersArray.includes(name);
      if (isActive) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }

      // Always allow clicks and show appropriate notifications
        card.addEventListener('click', () => {
        console.log('🔔 Ops Hub quick filter card clicked:', name, 'compatible:', sameColumns);
        
        // Check compatibility first
        if (!sameColumns) {
          // Show incompatibility notification
          if (typeof window.showUnifiedNotification === 'function') {
            window.showUnifiedNotification(`This quick filter "${name}" cannot be applied to the current CSV.`, 'error');
          }
          return;
        }
        
          // Alternar en el array global
          if (isActive) {
          if (hubType === 'dq') {
            window.activeDqDashboardQuickFilters = window.activeDqDashboardQuickFilters.filter(f => f !== name);
          } else {
            window.activeDashboardQuickFilters = window.activeDashboardQuickFilters.filter(f => f !== name);
          }
          // Show notification for deactivated quick filter card
          if (typeof window.showUnifiedNotification === 'function') {
            window.showUnifiedNotification(`Quick filter "${name}" deactivated!`, 'info');
          }
        } else {
          if (hubType === 'dq') {
            window.activeDqDashboardQuickFilters.push(name);
          } else {
            window.activeDashboardQuickFilters.push(name);
          }
          // Show notification for activated quick filter card
          if (typeof window.showUnifiedNotification === 'function') {
            window.showUnifiedNotification(`Quick filter "${name}" activated!`, 'success');
          }
          }
          
          // Primero aplicar los filtros acumulativos
        if (hubType === 'dq') {
          // Para DQ Hub, usar la función del DqHubManager si está disponible
          if (window.dqHubManager && typeof window.dqHubManager.applyDqCombinedFilters === 'function') {
            window.dqHubManager.applyDqCombinedFilters();
          }
        } else {
          applyOpsHubQuickFilters();
        }
          
          // Luego re-renderizar con los números actualizados
          setTimeout(() => {
            renderDashboardQuickFilters();
          }, 50);
        });

      cardsContainer.appendChild(card);
    });
    
    quickFiltersDiv.appendChild(container);
  });
}

// --- Aplica los quick filters acumulativos del dashboard ---
function applyDashboardQuickFilters() {
  const data = getOriginalData();
  if (!data || !data.length) {
    displayTable([]);
    return;
  }
  
  // Detectar qué hub está activo
  const isDqHub = document.querySelector('#dqDashboardModal:not(.hidden)');
  const isOpsHub = document.querySelector('#dashboardModal:not(.hidden)');
  
  let hubType;
  if (isDqHub) {
    hubType = 'dq';
  } else if (isOpsHub) {
    hubType = 'ops';
  } else {
    hubType = 'ops'; // Fallback
  }
  
  // Load quick filters según el hub activo
  const allQuickFilters = loadQuickFilters();
  const quickFilters = Object.entries(allQuickFilters)
    .filter(([name, filter]) => {
      // For backward compatibility: if hubType is not defined, consider it as 'ops'
      const filterHubType = filter.hubType || 'ops';
      return filterHubType === hubType;
    })
    .reduce((acc, [name, filter]) => {
      acc[name] = filter;
      return acc;
    }, {});
  
  const activeNames = hubType === 'dq' ? (window.activeDqDashboardQuickFilters || []) : (window.activeDashboardQuickFilters || []);
  let combinedFilterValues = {};
  let combinedActiveFilters = {};
  activeNames.forEach(name => {
    const filterObj = quickFilters[name];
    if (filterObj) {
      for (const key in filterObj.filterValues) {
        const value = filterObj.filterValues[key];
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
  });
  setModuleFilterValues(combinedFilterValues);
  setModuleActiveFilters(combinedActiveFilters);
  const filteredData = getFilteredData();
  displayTable(filteredData);
  renderActiveFiltersSummaryChips();
  
  // Actualizar gráficas del dashboard cuando cambien los filtros
  updateDashboardCharts();
  updateDashboardKpis();
}

// Helper: get the number of records that would result from applying a quick filter
function getDashboardQuickFilterPreviewCount(name) {
  const data = getOriginalData();
  if (!data || !data.length) return 0;
  
  // Detectar qué hub está activo
  const isDqHub = document.querySelector('#dqDashboardModal:not(.hidden)');
  const isOpsHub = document.querySelector('#dashboardModal:not(.hidden)');
  
  let hubType;
  if (isDqHub) {
    hubType = 'dq';
  } else if (isOpsHub) {
    hubType = 'ops';
  } else {
    hubType = 'ops'; // Fallback
  }
  
  // Load quick filters según el hub activo
  const allQuickFilters = loadQuickFilters();
  const quickFilters = Object.entries(allQuickFilters)
    .filter(([name, filter]) => {
      // For backward compatibility: if hubType is not defined, consider it as 'ops'
      const filterHubType = filter.hubType || 'ops';
      return filterHubType === hubType;
    })
    .reduce((acc, [name, filter]) => {
      acc[name] = filter;
      return acc;
    }, {});
  const filterObj = quickFilters[name];
  if (!filterObj) return 0;
  
  // Guardar el estado actual de filtros
  const currentActiveFilters = { ...getModuleActiveFilters() };
  const currentFilterValues = { ...getModuleFilterValues() };
  
  // Combinar filtros activos actuales + el quick filter
  const combinedActiveFilters = { ...currentActiveFilters };
  const combinedFilterValues = { ...currentFilterValues };
  
  // Añadir los filtros del quick filter
  const filterValues = filterObj.filterValues;
  
  Object.entries(filterValues).forEach(([key, value]) => {
    // Usar el tipo de filtro guardado si está disponible
    const savedActiveFilters = filterObj.activeFilters || {};
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
    
    // Combinar valores de filtros de forma correcta
    if (combinedFilterValues[key]) {
      if (Array.isArray(combinedFilterValues[key]) && Array.isArray(value)) {
        // Si ambos son arrays, hacer intersección (valores comunes)
        const intersection = combinedFilterValues[key].filter(v => value.includes(v));
        combinedFilterValues[key] = intersection.length > 0 ? intersection : value;
      } else if (Array.isArray(combinedFilterValues[key])) {
        // Si solo el actual es array, verificar si el valor está incluido
        if (!combinedFilterValues[key].includes(value)) {
          combinedFilterValues[key] = []; // No hay intersección
        }
      } else if (Array.isArray(value)) {
        // Si solo el nuevo es array, verificar si el valor actual está incluido
        if (!value.includes(combinedFilterValues[key])) {
          combinedFilterValues[key] = []; // No hay intersección
        } else {
          combinedFilterValues[key] = combinedFilterValues[key]; // Mantener el valor actual
        }
      } else {
        // Si ambos son valores simples, deben ser iguales
        if (combinedFilterValues[key] !== value) {
          combinedFilterValues[key] = []; // No hay intersección
        }
      }
    } else {
      combinedFilterValues[key] = value;
    }
  });
  
  // Aplicar la combinación de filtros
  setModuleActiveFilters(combinedActiveFilters);
  setModuleFilterValues(combinedFilterValues);
  
  // Obtener el número de filas filtradas usando la función estándar
  const filteredData = getFilteredData();
  const count = filteredData.length;
  
  // Restaurar el estado original de filtros
  setModuleActiveFilters(currentActiveFilters);
  setModuleFilterValues(currentFilterValues);
  
  return count;
}

// Genera un resumen textual del filtro
function resumenFiltro(filterValues) {
  return Object.entries(filterValues).map(([k,v]) => `${k}: ${Array.isArray(v) ? v.join(',') : v}`).join(' | ');
}

// Renderiza los filtros rápidos al abrir el dashboard
if (dashboardBtn && dashboardPanel) {
  dashboardBtn.addEventListener('click', () => {
    setTimeout(renderDashboardQuickFilters, 100);
  });
}

function updateActiveFiltersSummary() {
  // Implementation of updateActiveFiltersSummary function
} 

// Utilidad para formatear fechas a YYYY-MM-DD
function formatDateToYMD(dateStr) {
  if (!dateStr) return '';
  // Si ya está en formato YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  // Si está en formato DD.MM.YY (formato corto con puntos)
  if (/^\d{2}\.\d{2}\.\d{2}$/.test(dateStr)) {
    const [d, m, y] = dateStr.split('.');
    // Asumir que años 00-29 son 2000-2029, años 30-99 son 1930-1999
    const fullYear = parseInt(y) < 30 ? `20${y}` : `19${y}`;
    return `${fullYear}-${m}-${d}`;
  }
  // Si está en formato DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    const [d, m, y] = dateStr.split('-');
    return `${y}-${m}-${d}`;
  }
  // Si está en formato MM/DD/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [m, d, y] = dateStr.split('/');
    return `${y}-${m}-${d}`;
  }
  // Si está en formato DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [d, m, y] = dateStr.split('/');
    return `${y}-${m}-${d}`;
  }
  // Si está en formato YYYY/MM/DD
  if (/^\d{4}\/\d{2}\/\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('/');
    return `${y}-${m}-${d}`;
  }
  // Si está en formato MM-DD-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    const [m, d, y] = dateStr.split('-');
    return `${y}-${m}-${d}`;
  }
  // Si es una fecha válida reconocida por Date
  const d = new Date(dateStr);
  if (!isNaN(d)) {
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
}

// Detectar columnas de fecha por nombre o por contenido
function detectDateColumns(data) {
  if (!data || !data.length) return [];
  const headers = Object.keys(data[0]);
  // Por nombre
  const dateLike = headers.filter(h => /date|etd|eta|pickup|fecha|fch/i.test(h) && !/delivery/i.test(h));
  // Por contenido: si más del 80% de los valores son fechas válidas
  const byContent = headers.filter(h => {
    if (h.trim().toLowerCase() === 'number of containers' || /delivery/i.test(h)) return false;
    const vals = data.map(row => row[h]);
    const valid = vals.filter(v => v && !isNaN(Date.parse(v)));
    return valid.length > 0 && valid.length / vals.length > 0.8;
  });
  // Excluir explícitamente 'Number of containers' de la lista final
  return Array.from(new Set([...dateLike, ...byContent])).filter(h => h.trim().toLowerCase() !== 'number of containers');
}

// --- Login/Registro Modal Logic ---
function getUserKey(email) {
  return `user_${email.toLowerCase()}`;
}

function saveUserCredentials(email, password, name = null) {
  try {
    console.log('💾 Saving user credentials for:', email);
    
    const userData = { 
      email, 
      password,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
  if (name) {
    userData.name = name;
  }
    
    // 1. Save to localStorage with key
  localStorage.setItem(getUserKey(email), JSON.stringify(userData));
    
    // 2. Save to users array for easier management
    const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
    const existingUserIndex = users.findIndex(user => user.email === email);
    
    if (existingUserIndex !== -1) {
      // Update existing user
      users[existingUserIndex] = { ...users[existingUserIndex], ...userData };
    } else {
      // Add new user
      users.push(userData);
    }
    
    localStorage.setItem('thebridge_users', JSON.stringify(users));
    
    // 3. Save to IndexedDB for persistence
    saveUserToIndexedDB(userData);
    
    // 4. Save to persistent cookies
    saveUserToCookies(userData);
    
    // 5. Add to sync queue for backend synchronization
    if (window.hybridSyncManager) {
      window.hybridSyncManager.addToSyncQueue('user', userData);
    }
    
    console.log('✅ User credentials saved to ALL locations successfully');
    return true;
  } catch (error) {
    console.error('❌ Error saving user credentials:', error);
    return false;
  }
}

// Save user to IndexedDB for persistence
function saveUserToIndexedDB(userData) {
  try {
    const request = indexedDB.open('TheBridgeDB', 1);
    
    request.onerror = () => {
      console.warn('⚠️ IndexedDB not available');
    };
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      
      const putRequest = store.put(userData);
      putRequest.onsuccess = () => {
        console.log('✅ User saved to IndexedDB');
      };
      putRequest.onerror = () => {
        console.warn('⚠️ Error saving to IndexedDB');
      };
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'email' });
      }
    };
  } catch (error) {
    console.warn('⚠️ IndexedDB error:', error);
  }
}

// Save user to persistent cookies
function saveUserToCookies(userData) {
  try {
    const cookieData = btoa(JSON.stringify(userData));
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 10); // 10 years
    
    document.cookie = `thebridge_user_${userData.email.replace(/[^a-zA-Z0-9]/g, '_')}=${cookieData}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
    console.log('✅ User saved to persistent cookies');
  } catch (error) {
    console.warn('⚠️ Cookie error:', error);
  }
}

function getUserCredentials(email) {
  try {
    // 1. First try the key-based storage
  const data = localStorage.getItem(getUserKey(email));
    if (data) {
      return JSON.parse(data);
    }
    
    // 2. If not found, try the users array
    const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
    const user = users.find(user => user.email === email);
    
    if (user) {
      // Update the key-based storage for consistency
      localStorage.setItem(getUserKey(email), JSON.stringify(user));
      return user;
    }
    
    // 3. If not found, try IndexedDB (synchronous check)
    try {
      const request = indexedDB.open('TheBridgeDB', 1);
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['users'], 'readonly');
        const store = transaction.objectStore('users');
        const getRequest = store.get(email);
        getRequest.onsuccess = () => {
          if (getRequest.result) {
            console.log('✅ User found in IndexedDB');
            // Restore to localStorage
            localStorage.setItem(getUserKey(email), JSON.stringify(getRequest.result));
            const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
            users.push(getRequest.result);
            localStorage.setItem('thebridge_users', JSON.stringify(users));
            return getRequest.result;
          }
        };
      };
    } catch (error) {
      console.warn('⚠️ IndexedDB error:', error);
    }
    
    // 4. If not found, try cookies
    const cookieUser = getUserFromCookies(email);
    if (cookieUser) {
      console.log('✅ User found in cookies');
      // Restore to localStorage
      localStorage.setItem(getUserKey(email), JSON.stringify(cookieUser));
      const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
      users.push(cookieUser);
      localStorage.setItem('thebridge_users', JSON.stringify(users));
      return cookieUser;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error getting user credentials:', error);
    return null;
  }
}

// Get user from IndexedDB
function getUserFromIndexedDB(email) {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open('TheBridgeDB', 1);
      
      request.onerror = () => {
        console.warn('⚠️ IndexedDB not available');
        resolve(null);
      };
      
      request.onsuccess = (event) => {
        try {
          const db = event.target.result;
          
          // Check if the object store exists
          if (!db.objectStoreNames.contains('users')) {
            console.warn('⚠️ IndexedDB users store not found');
            resolve(null);
            return;
          }
          
          const transaction = db.transaction(['users'], 'readonly');
          const store = transaction.objectStore('users');
          
          const getRequest = store.get(email);
          getRequest.onsuccess = () => {
            resolve(getRequest.result);
          };
          getRequest.onerror = () => {
            console.warn('⚠️ IndexedDB get request failed');
            resolve(null);
          };
        } catch (error) {
          console.warn('⚠️ IndexedDB transaction error:', error);
          resolve(null);
        }
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'email' });
          console.log('✅ IndexedDB users store created');
        }
      };
    } catch (error) {
      console.warn('⚠️ IndexedDB error:', error);
      resolve(null);
    }
  });
}

// Get user from cookies
function getUserFromCookies(email) {
  try {
    const cookieName = `thebridge_user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const cookies = document.cookie.split(';');
    
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        const userData = JSON.parse(atob(value));
        return userData;
      }
    }
    
    return null;
  } catch (error) {
    console.warn('⚠️ Cookie error:', error);
    return null;
  }
}

function showLoginRegisterModal() {
  const modal = document.getElementById('loginModal');
  const loginPanel = document.getElementById('loginPanel');
  const registerPanel = document.getElementById('registerPanel');
  const showLoginBtn = document.getElementById('showLoginPanelBtn');
  const showRegisterBtn = document.getElementById('showRegisterPanelBtn');

  if (!modal || !loginPanel || !registerPanel || !showLoginBtn || !showRegisterBtn) return;

  // Mostrar panel de login por defecto
  function showLogin() {
    if (loginPanel) loginPanel.style.display = '';
    if (registerPanel) registerPanel.style.display = 'none';
    if (showLoginBtn) showLoginBtn.disabled = true;
    if (showRegisterBtn) showRegisterBtn.disabled = false;
  }
  function showRegister() {
    if (loginPanel) loginPanel.style.display = 'none';
    if (registerPanel) registerPanel.style.display = '';
    if (showLoginBtn) showLoginBtn.disabled = false;
    if (showRegisterBtn) showRegisterBtn.disabled = true;
  }
  if (showLoginBtn) showLoginBtn.onclick = showLogin;
  if (showRegisterBtn) showRegisterBtn.onclick = showRegister;
  showLogin();

  // Login
  const loginEmail = document.getElementById('loginEmailInput');
  const loginPassword = document.getElementById('loginPasswordInput');
  const loginBtn = document.getElementById('loginBtn');
  const loginError = document.getElementById('loginError');
  if (loginBtn) loginBtn.onclick = async () => {
    const email = loginEmail?.value.trim().toLowerCase();
    const password = loginPassword?.value;
    if (!isValidEmail(email)) {
      if (loginError) loginError.textContent = 'Enter a valid email.';
      return;
    }
    
    // First try localStorage
    const user = getUserCredentials(email);
    if (user && user.password === password) {
      // Local credentials match
      setCurrentUserEmail(email);
      if (modal) modal.classList.add('hidden');
      setTimeout(() => { if (modal) modal.style.display = 'none'; }, 300);
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) logoutBtn.style.display = '';
      console.log("✅ Login successful - no reload needed");
      return;
    }
    
    // If not found in localStorage, try to restore from backup
    console.log('🔍 User not found in localStorage, checking backups...');
    
    // First try to restore from simple backup system
    if (window.restoreUserSimple) {
      const restored = window.restoreUserSimple(email, password);
      if (restored) {
        console.log('✅ User restored from simple backup');
        setCurrentUserEmail(email);
        if (modal) modal.classList.add('hidden');
        setTimeout(() => { if (modal) modal.style.display = 'none'; }, 300);
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.style.display = '';
        console.log("✅ Login successful - no reload needed");
        return;
      }
    }
    
    // If simple backup failed, try complex backup
    const restored = await restoreUserFromBackup(email, password);
    if (restored) {
      console.log('✅ User restored from complex backup');
      setCurrentUserEmail(email);
      if (modal) modal.classList.add('hidden');
      setTimeout(() => { if (modal) modal.style.display = 'none'; }, 300);
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) logoutBtn.style.display = '';
      console.log("✅ Login successful - no reload needed");
      return;
    }
    
    // If backup restore failed, try backend
    console.log('🔍 Backup restore failed, checking backend...');
    try {
      // Try to load user profile from backend to see if user exists
      const userProfile = await loadUserProfile(email, 'default-team');
      if (userProfile && userProfile.email === email) {
        console.log('✅ User found in backend, restoring credentials...');
        
        // Save credentials to localStorage for future use
        saveUserCredentials(email, password, userProfile.name);
        
        // Set current user and continue
    setCurrentUserEmail(email);
    if (modal) modal.classList.add('hidden');
    setTimeout(() => { if (modal) modal.style.display = 'none'; }, 300);
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.style.display = '';
        console.log("✅ Login successful - no reload needed");
        return;
      }
    } catch (error) {
      console.log('⚠️ Error checking backend for user:', error);
    }
    
    // If we get here, user doesn't exist
    if (loginError) loginError.textContent = 'Incorrect email or password.';
  };

  // Registration
  const registerEmail = document.getElementById('registerEmailInput');
  const registerPassword = document.getElementById('registerPasswordInput');
  const registerPasswordRepeat = document.getElementById('registerPasswordRepeatInput');
  const registerBtn = document.getElementById('registerBtn');
  const registerError = document.getElementById('registerError');
  if (registerBtn) registerBtn.onclick = async () => {
    const email = registerEmail?.value.trim().toLowerCase();
    const password = registerPassword?.value;
    const passwordRepeat = registerPasswordRepeat?.value;
    if (!isValidEmail(email)) {
      if (registerError) registerError.textContent = 'Enter a valid email.';
      return;
    }
    // Strong password validation
    if (!password || password.length < 6 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password)) {
      if (registerError) registerError.textContent = 'Password must be at least 6 characters, contain an uppercase letter, a lowercase letter, and a number.';
      return;
    }
    if (password !== passwordRepeat) {
      if (registerError) registerError.textContent = 'Passwords do not match.';
      return;
    }
    if (getUserCredentials(email)) {
      if (registerError) registerError.textContent = 'This email is already registered.';
      return;
    }
    
    // Save to localStorage
    saveUserCredentials(email, password);
    
    // Create immediate backup to protect user data
    console.log('🛡️ Creating immediate backup for new user...');
    if (window.createBackup) {
      window.createBackup();
    }
    
    // Also save to backend for persistence
    try {
      const userProfile = {
        name: email.split('@')[0], // Use email prefix as default name
        email: email,
        role: 'user',
        createdAt: new Date().toISOString()
      };
      
      await saveUserProfile(email, 'default-team', userProfile);
      console.log('✅ User profile saved to backend');
    } catch (error) {
      console.warn('⚠️ Could not save to backend, but user registered locally:', error);
    }
    
    if (registerError) {
      registerError.style.color = '#10B981';
      registerError.textContent = 'User registered successfully. You can now sign in.';
      setTimeout(() => {
        registerError.style.color = '#d32f2f';
        showLogin();
      }, 1800);
    }
  };

  if (modal) modal.style.display = 'flex';
  if (modal) modal.classList.remove('hidden');
  if (loginEmail) loginEmail.value = '';
  if (loginPassword) loginPassword.value = '';
  if (registerEmail) registerEmail.value = '';
  if (registerPassword) registerPassword.value = '';
  if (registerPasswordRepeat) registerPasswordRepeat.value = '';
  if (loginError) loginError.textContent = '';
  if (registerError) registerError.textContent = '';
  if (loginEmail) loginEmail.focus();
}

// --- Mostrar login/registro modal si no hay usuario ---
document.addEventListener('DOMContentLoaded', function () {
  if (!getCurrentUserEmail()) {
    showLoginRegisterModal();
    const el = document.getElementById('logoutBtn');
    if (el) el.style.display = 'none';
  } else {
    showLogoutBtn();
  }
});

// --- Adaptar backups para usar email ---
export async function saveUserBackup(projectId, backup) {
  const email = getCurrentUserEmail();
  if (!email) return;
  await saveToIndexedDB(`backup-${email}-${projectId}`, backup);
}

export async function loadUserBackup(projectId) {
  const email = getCurrentUserEmail();
  if (!email) return null;
  return await loadFromIndexedDB(`backup-${email}-${projectId}`);
}

function setCurrentUserEmail(email) {
  localStorage.setItem('userEmail', email);
}

function showLogoutBtn() {
  const btn = document.getElementById('logoutBtn');
  if (btn) {
    btn.style.display = '';
    btn.style.color = '#d32f2f';
    btn.style.fontWeight = 'bold';
    btn.onclick = function () {
      if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('thebridge_current_user');
        localStorage.removeItem('thebridge_current_team');
        // Clear persistent session when logging out
        clearPersistentSession();
        console.log("✅ Login successful - no reload needed");
      }
    };
  }
  
  // User setup button should always be visible
  const userSetUpBtn = document.getElementById('userSetUpBtn');
  if (userSetUpBtn) {
    userSetUpBtn.style.display = '';
    userSetUpBtn.style.visibility = 'visible';
    userSetUpBtn.style.opacity = '1';
  }
}

function hideUserButtons() {
  const logoutBtn = document.getElementById('logoutBtn');
  const userSetUpBtn = document.getElementById('userSetUpBtn');
  
  if (logoutBtn) {
    logoutBtn.style.display = 'none';
  }
  
  // User setup button should always be visible, even when not logged in
  if (userSetUpBtn) {
    userSetUpBtn.style.display = '';
    userSetUpBtn.style.visibility = 'visible';
    userSetUpBtn.style.opacity = '1';
  }
}

// --- Versiones de datos cargados usando IndexedDB ---
function generateDataVersionId() {
  return Date.now() + '-' + Math.random().toString(36).substr(2, 6);
}

async function getDataVersions() {
    try {
    console.log('📋 Getting data versions from localStorage...');
    
    // Obtener de localStorage
    const versions = JSON.parse(localStorage.getItem('dataVersions') || '[]');
  
  // Ordenar por fecha (más reciente primero)
    versions.sort((a, b) => {
    const dateA = new Date(a.createdAt || a.name);
    const dateB = new Date(b.createdAt || b.name);
    return dateB - dateA;
  });
    
    console.log('✅ Data versions loaded:', versions.length);
    return versions;
    
  } catch (error) {
    console.error('❌ Error getting data versions:', error);
    return [];
  }
}

// FUNCIÓN PARA MOSTRAR POPUP DE RESUMEN DE FILTROS OPS HUB
// Variables globales para controlar cuándo mostrar el popup
let lastShownFiltersHash = null;
let lastFilterCount = 0;

function showOpsHubFilterSummary(totalRecords, filteredRecords, activeFilters) {
  const currentFilterCount = Object.keys(activeFilters).length;
  
  // Crear hash de la configuración actual de filtros
  const currentFiltersHash = JSON.stringify({
    filteredRecords,
    activeFilters: Object.keys(activeFilters).sort()
  });
  
  // Solo mostrar popup si:
  // 1. Nunca se ha mostrado (primera vez)
  // 2. Se han AÑADIDO filtros (más filtros que antes)
  // 3. Se activaron filtros desde cero
  // 4. La configuración de filtros cambió (diferentes filtros activos)
  const shouldShowPopup = (
    lastShownFiltersHash === null || // Primera vez
    (currentFilterCount > lastFilterCount && currentFilterCount > 0) || // Se añadieron filtros
    (currentFilterCount > 0 && lastFilterCount === 0) || // Se activaron filtros desde cero
    (currentFilterCount > 0 && lastShownFiltersHash !== currentFiltersHash) // Configuración cambió
  );
  
  // Si no debe mostrarse el popup, actualizar variables y salir
  if (!shouldShowPopup) {
    lastFilterCount = currentFilterCount;
    lastShownFiltersHash = currentFiltersHash;
    return;
  }
  
  // Actualizar variables de control
  lastFilterCount = currentFilterCount;
  lastShownFiltersHash = currentFiltersHash;
  
          // Remove previous popup if exists
  const existingPopup = document.getElementById('opsHubFilterPopup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Crear el popup
  const popup = document.createElement('div');
  popup.id = 'opsHubFilterPopup';
  popup.className = 'ops-hub-filter-popup';
  
  const filterCount = Object.keys(activeFilters).length;
  const percentage = totalRecords > 0 ? Math.round((filteredRecords / totalRecords) * 100) : 0;
  
  // Crear lista de filtros activos
  const filterChips = Object.keys(activeFilters).map(filterName => {
    // Formatear nombre del filtro para mostrar
    const displayName = filterName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return `<span class="ops-filter-chip">${displayName}</span>`;
  }).join('');
  
  popup.innerHTML = `
    <div class="ops-filter-popup-content">
      <button class="ops-filter-popup-close" id="closeOpsFilterPopupX">×</button>
      <div class="ops-filter-auto-close-indicator" id="autoCloseIndicator"></div>
      <h3 class="ops-filter-title">Filters Applied</h3>
      <p class="ops-filter-subtitle">Operations Hub filtering results</p>
      
      <div class="ops-filter-stats">
        <div class="ops-filter-stat">
          <div class="ops-filter-number">${filteredRecords.toLocaleString()}</div>
          <div class="ops-filter-label">Records Found</div>
        </div>
        <div class="ops-filter-stat">
          <div class="ops-filter-number">${percentage}%</div>
          <div class="ops-filter-label">of Total</div>
        </div>
      </div>
      
      ${filterCount > 0 ? `
        <div class="ops-filter-filters">
          <div class="ops-filter-filters-title">Active Filters (${filterCount})</div>
          <div class="ops-filter-filters-list">
            ${filterChips}
          </div>
        </div>
      ` : ''}
      
      <div class="ops-filter-actions">
        <button class="modal-btn primary" id="viewInTableBtn">View in Table</button>
        <button class="modal-btn primary" id="copyOpsFilterPopup">Copy</button>
      </div>
    </div>
  `;

  // Añadir al DOM
  document.body.appendChild(popup);

  // Event listeners
  const closeBtnX = popup.querySelector('#closeOpsFilterPopupX');
  const viewInTableBtn = popup.querySelector('#viewInTableBtn');
  const copyBtn = popup.querySelector('#copyOpsFilterPopup');
  const autoCloseIndicator = popup.querySelector('#autoCloseIndicator');
  
  const closePopup = () => {
    // Parar indicador visual
    if (autoCloseIndicator) {
      autoCloseIndicator.style.animation = 'none';
    }
    popup.classList.add('fade-out');
    setTimeout(() => popup.remove(), 300);
  };

  // "Got it" button solo cierra el popup
  closeBtnX.addEventListener('click', closePopup);
  
  if (viewInTableBtn) {
    viewInTableBtn.addEventListener('click', () => {
      // Cerrar el popup
      closePopup();
      
      // SOLO para "View in Table": Cerrar el modal del Operations Hub si está abierto
      const dashboardModal = document.getElementById('dashboardModal');
      if (dashboardModal && !dashboardModal.classList.contains('hidden')) {
        dashboardModal.classList.add('hidden');
      }
      
      // Asegurarse de que la tabla esté visible
      const tableContainer = document.getElementById('tableContainer');
      if (tableContainer) {
        tableContainer.style.display = 'block';
        tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Opcional: Mostrar notificación de éxito
      if (typeof window.showNotification === 'function') {
        window.showNotification(`Showing ${filteredRecords.toLocaleString()} filtered records in table`, 'success');
      }
    });
  }
  
  // Cerrar al hacer clic fuera del contenido
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  // Cerrar con tecla Escape
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closePopup();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  // Animación de entrada más rápida
  setTimeout(() => {
    popup.classList.add('show');
  }, 5);

  // Auto-cerrar con lógica mejorada - más rápido y menos intrusivo
  let autoCloseTimeout;
  let isHovered = false;
  let isManuallyInteracted = false;

  const startAutoClose = (delay = 4000) => {
    // Limpiar timeout existente
    if (autoCloseTimeout) {
      clearTimeout(autoCloseTimeout);
    }
    
    // Actualizar indicador visual
    if (autoCloseIndicator) {
      autoCloseIndicator.style.animation = 'none';
      autoCloseIndicator.offsetHeight; // Force reflow
      autoCloseIndicator.style.animation = delay === 2000 ? 
        'autoCloseProgress 2s linear forwards' : 
        'autoCloseProgress 4s linear forwards';
    }
    
    autoCloseTimeout = setTimeout(() => {
      if (!isHovered && !isManuallyInteracted && document.getElementById('opsHubFilterPopup')) {
        closePopup();
      }
    }, delay);
  };

  const stopAutoClose = () => {
    if (autoCloseTimeout) {
      clearTimeout(autoCloseTimeout);
      autoCloseTimeout = null;
    }
    // Pausar indicador visual
    if (autoCloseIndicator) {
      autoCloseIndicator.style.animationPlayState = 'paused';
    }
  };

  // Event listeners para hover - más responsivo
  popup.addEventListener('mouseenter', () => {
    isHovered = true;
    stopAutoClose();
  });

  popup.addEventListener('mouseleave', () => {
    isHovered = false;
    // Solo auto-cerrar si no ha interactuado manualmente
    if (!isManuallyInteracted) {
      startAutoClose(2000); // Más rápido después de salir el mouse
    }
  });

  // Marcar interacción manual en botones
  [closeBtnX, viewInTableBtn, copyBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('mouseenter', () => {
        isManuallyInteracted = true;
        stopAutoClose();
      });
    }
  });

  // También hacer todo el contenido clickeable para cerrar (excepto botones)
  const popupContent = popup.querySelector('.ops-filter-popup-content');
  if (popupContent) {
    popupContent.addEventListener('click', (e) => {
      // Si se hace click en el contenido (pero no en botones), cerrar
      if (e.target === popupContent || (!e.target.closest('button') && !e.target.closest('.ops-filter-chip'))) {
        isManuallyInteracted = true;
        closePopup();
      }
    });
  }

  // Iniciar el auto-close inicial más rápido
  startAutoClose();

  // Botón copiar
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      // Abrir modal de opciones de copiar
      openCopyOptionsModal();
    });
  }
}

// Función para resetear el estado del popup cuando se abra el dashboard sin cambios
function resetOpsHubPopupHash() {
  // Resetear el hash para permitir que el popup se muestre nuevamente
  if (window.location.hash === '#ops-hub-popup') {
    window.location.hash = '';
  }
}

// Hacer las funciones disponibles globalmente para que se puedan llamar desde otros módulos
// Resume button color function removed
window.getDataVersions = getDataVersions;
window.loadFromIndexedDB = loadFromIndexedDB;
window.saveToIndexedDB = saveToIndexedDB;
window.showOpsHubFilterSummary = showOpsHubFilterSummary;
window.resetOpsHubPopupHash = resetOpsHubPopupHash;

// Función global para refrescar la lista de versiones
window.loadDataVersions = function() {
  const dataVersionsListDiv = document.getElementById('dataVersionsList');
  if (dataVersionsListDiv && typeof renderDataVersionsList === 'function') {
    renderDataVersionsList();
  }
};

async function saveDataVersion(data) {
  try {
    console.log('💾 Saving data version locally...');
    
  const id = generateDataVersionId();
  const now = new Date();
  const timestamp = now.toLocaleString('sv-SE', { hour12: false }).replace('T', ' ');
  
  // Usar el nombre del CSV como nombre principal, con timestamp como respaldo
  let displayName;
  if (currentCSVFileName) {
    displayName = currentCSVFileName.replace(/\.csv$/i, '');
  } else {
    displayName = `Data Version ${timestamp}`;
  }
  
    // Crear metadata (sin datos)
  const metadata = {
    id,
    name: timestamp,
    displayName,
    fileName: currentCSVFileName || displayName,
      createdAt: new Date().toISOString(),
      recordCount: data ? data.length : 0
  };
  
    // Guardar metadata en localStorage
    const versions = JSON.parse(localStorage.getItem('dataVersions') || '[]');
    versions.unshift(metadata);
    
    // Mantener solo las últimas 50 versiones
    if (versions.length > 50) {
      versions.splice(50);
    }
    
    localStorage.setItem('dataVersions', JSON.stringify(versions));
    
    // Guardar datos como archivo local
    try {
      const { saveDataVersionAsCSV } = await import('./services/csvService.js');
      const saveResult = await saveDataVersionAsCSV(data, displayName);
      console.log('✅ Data version saved locally:', displayName);
      
      // Guardar información de la ruta del archivo
      if (saveResult && saveResult.success) {
        metadata.filePath = saveResult.filePath;
        metadata.fullPath = saveResult.fullPath;
        metadata.saveMethod = saveResult.method;
        
        // Actualizar la versión en localStorage con la información de la ruta
        const updatedVersions = JSON.parse(localStorage.getItem('dataVersions') || '[]');
        const versionIndex = updatedVersions.findIndex(v => v.id === id);
        if (versionIndex !== -1) {
          updatedVersions[versionIndex] = metadata;
          localStorage.setItem('dataVersions', JSON.stringify(updatedVersions));
        }
      }
    } catch (fileError) {
      console.warn('⚠️ Could not save file locally, but metadata saved:', fileError);
    }
    
    if (typeof window.showUnifiedNotification === 'function') {
      window.showUnifiedNotification(`Data version saved: ${displayName}`, 'success');
    } else {
      showNotification('Data version saved successfully!', 'success');
    }
    
    return metadata;
    
  } catch (error) {
    console.error('❌ Error saving data version:', error);
        if (typeof window.showUnifiedNotification === 'function') {
      window.showUnifiedNotification('Error saving data version!', 'error');
    } else {
      showNotification('Error saving data version.', 'error');
        }
    throw error;
      }
}

async function deleteDataVersion(id) {
  try {
    console.log('🗑️ Deleting data version locally:', id);
    
            // Remove from localStorage
    const versions = JSON.parse(localStorage.getItem('dataVersions') || '[]');
    const filteredVersions = versions.filter(v => v.id !== id);
    localStorage.setItem('dataVersions', JSON.stringify(filteredVersions));
    
    console.log('✅ Data version deleted locally:', id);
    
  if (typeof window.showUnifiedNotification === 'function') {
    window.showUnifiedNotification('Data version deleted successfully!', 'success');
    } else {
      showNotification('Data version deleted successfully!', 'success');
    }
    
  } catch (error) {
    console.error('❌ Error deleting data version:', error);
    if (typeof window.showUnifiedNotification === 'function') {
      window.showUnifiedNotification('Error deleting data version!', 'error');
    } else {
      showNotification('Error deleting data version.', 'error');
    }
  }
}

// --- Data Version Modal (control de versiones de datos) ---
function setupDataVersionModal() {
  const dataVersionBtn = getElement('#dataVersionBtn');
  const dataVersionModal = getElement('#dataVersionModal');
  const closeDataVersionModalBtn = getElement('#closeDataVersionModalBtn');
  const saveDataVersionBtn = getElement('#saveDataVersionBtn');
  const dataVersionsSearchInput = getElement('#dataVersionsSearch');
  const dataVersionsListDiv = getElement('#dataVersionsList');
  let dataVersionsSearchTerm = '';

  if (!dataVersionBtn || !dataVersionModal || !closeDataVersionModalBtn) return;

  // Abrir modal
  dataVersionBtn.addEventListener('click', () => {
    dataVersionModal.style.display = 'flex';
    dataVersionModal.classList.remove('hidden');
    renderDataVersionsList();
  });
  // Cerrar modal
  closeDataVersionModalBtn.addEventListener('click', () => {
    dataVersionModal.classList.add('hidden');
    setTimeout(() => { dataVersionModal.style.display = 'none'; }, 300);
  });
  // Guardar versión de datos
  if (saveDataVersionBtn) {
    saveDataVersionBtn.addEventListener('click', async () => {
      const data = getOriginalData ? getOriginalData() : [];
      if (!data || !data.length) {
        showNotification('No data loaded to save.', 'warning');
        return;
      }
      console.log('💾 Saving data version...');
      await saveDataVersion(data);
      
      // Update the list to show the new version
      await renderDataVersionsList();
      
      if (typeof window.showUnifiedNotification === 'function') {
        window.showUnifiedNotification('Data version saved successfully!', 'success');
      } else {
      showNotification('Data version saved.', 'success');
      }
    });
  }
  // Búsqueda
  if (dataVersionsSearchInput) {
    dataVersionsSearchInput.addEventListener('input', () => {
      dataVersionsSearchTerm = dataVersionsSearchInput.value;
      renderDataVersionsList();
    });
  }
  // Renderizar lista de versiones
  window.renderDataVersionsList = async function() {
    console.log('🎨 Rendering data versions list...');
    if (!dataVersionsListDiv) {
      console.error('❌ dataVersionsListDiv not found');
      return;
    }
    
    let versions = await getDataVersions();
    console.log('📋 Versions to render:', versions.length, versions);
    
    if (!versions.length) {
      dataVersionsListDiv.innerHTML = '<div style="color:#888;font-style:italic;padding:2em;text-align:center;">No data versions saved.</div>';
      return;
    }
    
    // Filtrar por búsqueda
    if (dataVersionsSearchTerm) {
      const term = dataVersionsSearchTerm.toLowerCase();
      versions = versions.filter(v =>
        (v.displayName && v.displayName.toLowerCase().includes(term)) ||
        (v.fileName && v.fileName.toLowerCase().includes(term)) || 
        v.name.toLowerCase().includes(term)
      );
    }
    
    if (!versions.length) {
      dataVersionsListDiv.innerHTML = '<div style="color:#888;font-style:italic;padding:2em;text-align:center;">No matches found.</div>';
      return;
    }
    
    // Ordenar por fecha/hora (más reciente primero)
    versions.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.name);
      const dateB = new Date(b.createdAt || b.name);
      return dateB - dateA;
    });
    
    // Mostrar solo las últimas 10 por defecto, a menos que se esté buscando o se haya pedido mostrar todas
    const showLimitedVersions = !dataVersionsSearchTerm && !window.showAllVersions && versions.length > 10;
    const displayVersions = showLimitedVersions ? versions.slice(0, 10) : versions;
    
    console.log(`📊 Showing ${displayVersions.length} of ${versions.length} versions`);
    
    // Tabla compacta con mejor styling
    let html = `
      <div style="margin-bottom: 1rem;">
        <button id="importDataVersionBtn" class="modal-btn primary" style="width:100%;padding:0.8rem;margin-bottom:1rem;">
          Import Data Version
        </button>
      </div>
      <table class="data-versions-table" style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f5f5f5;border-bottom:2px solid #ddd;">
            <th style="text-align:left;padding:0.8rem;font-weight:600;">Name</th>
            <th style="text-align:left;padding:0.8rem;font-weight:600;">Date/Time</th>
            <th style="text-align:center;padding:0.8rem;font-weight:600;">Actions</th>
          </tr>
        </thead>
        <tbody>`;
    
    displayVersions.forEach((v, index) => {
      const displayName = v.displayName || v.fileName || v.name || 'Unknown';
      const dateDisplay = v.createdAt ? new Date(v.createdAt).toLocaleString() : (v.name || 'Unknown date');
      const recordCount = v.recordCount || (v.data ? v.data.length : 0);
      
      html += `<tr style="border-bottom:1px solid #eee;${index % 2 === 0 ? 'background:#fafafa;' : ''}">
        <td style="padding:0.8rem;">
          <div style="color:#1976d2;font-weight:500;margin-bottom:0.2rem;">${displayName}</div>
          ${recordCount > 0 ? `<div style="color:#666;font-size:0.85em;">${recordCount} records</div>` : ''}
        </td>
        <td style="padding:0.8rem;font-family:monospace;color:#666;font-size:0.9em;">${dateDisplay}</td>
        <td style="padding:0.8rem;text-align:center;">
          <div style="display:flex;gap:4px;justify-content:center;align-items:center;">
            <button class='modal-btn secondary' data-load-version='${v.id}' style='padding:0.4em 0.8em;font-size:0.9em;white-space:nowrap;'>Load</button>
            <button class='modal-btn secondary' data-delete-version='${v.id}' style='padding:0.4em 0.8em;font-size:0.9em;white-space:nowrap;'>Delete</button>

          </div>
        </td>
      </tr>`;
    });
    html += '</tbody></table>';
    
    // Agregar botón para mostrar todas las versiones si hay más de 10
    if (showLimitedVersions) {
      html += `<div style="text-align: center; margin-top: 1rem;">
        <button id="showAllVersionsBtn" class="modal-btn secondary" style="padding:0.6em 1.2em;">
          Show All ${versions.length} Versions
        </button>
      </div>`;
    } else if (versions.length > 10 && window.showAllVersions) {
      html += `<div style="text-align: center; margin-top: 1rem;">
        <button id="showLimitedVersionsBtn" class="modal-btn secondary" style="padding:0.6em 1.2em;">
          Show Only Last 10 Versions
        </button>
      </div>`;
    }
    
    dataVersionsListDiv.innerHTML = html;
    
    console.log('✅ Data versions list rendered successfully');
    
    // Event listener para el botón "Show All Versions"
    const showAllVersionsBtn = document.getElementById('showAllVersionsBtn');
    if (showAllVersionsBtn) {
      showAllVersionsBtn.addEventListener('click', () => {
        console.log('👁️ Showing all versions...');
        window.showAllVersions = true;
        renderDataVersionsList();
      });
    }
    
    // Event listener para el botón "Show Limited Versions"
    const showLimitedVersionsBtn = document.getElementById('showLimitedVersionsBtn');
    if (showLimitedVersionsBtn) {
      showLimitedVersionsBtn.addEventListener('click', () => {
        console.log('👁️ Showing limited versions...');
        window.showAllVersions = false;
        renderDataVersionsList();
      });
    }
    
    // Event listener para el botón "Import Data Version"
    const importDataVersionBtn = document.getElementById('importDataVersionBtn');
    if (importDataVersionBtn) {
      importDataVersionBtn.addEventListener('click', () => {
        console.log('📥 Importing data version...');
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = async (ev) => {
            try {
              const v = JSON.parse(ev.target.result);
              if (v && v.data && Array.isArray(v.data)) {
          setOriginalData(v.data);
          setCurrentHeaders(Object.keys(v.data[0]));
          setVisibleColumns(Object.keys(v.data[0]));
          resetFilterManager();
          filterManager = initializeFilterManager(v.data);
          initializeReportService();
          displayTable(v.data);
          toggleElements('#tableContainer', 'show');
          if (typeof updateViewSelect === 'function') updateViewSelect();
          if (typeof renderDashboardQuickFilters === 'function') renderDashboardQuickFilters();
                
                // Close modal after successful import
                const modal = document.getElementById('dataVersionsModal');
                if (modal) modal.style.display = 'none';
                
                if (typeof window.showUnifiedNotification === 'function') {
                  window.showUnifiedNotification('Data version imported and loaded successfully!', 'success');
                } else {
                  showNotification('Data version imported and loaded.', 'success');
                }
              } else {
                if (typeof window.showUnifiedNotification === 'function') {
                  window.showUnifiedNotification('Invalid data version file format!', 'error');
        } else {
          showNotification('Invalid data version file.', 'error');
        }
              }
            } catch (err) {
              console.error('❌ Error importing data version:', err);
              if (typeof window.showUnifiedNotification === 'function') {
                window.showUnifiedNotification('Error importing data version!', 'error');
              } else {
                showNotification('Error importing data version.', 'error');
              }
            }
          };
          reader.readAsText(file);
        };
        input.click();
      });
    }
    
    // Listeners para botones Load
    dataVersionsListDiv.querySelectorAll('[data-load-version]').forEach(btn => {
      btn.addEventListener('click', async e => {
        const id = btn.dataset.loadVersion;
        console.log('📥 Loading version:', id);
        
        try {
          // Get version metadata from localStorage
          const versions = await getDataVersions();
          const versionMetadata = versions.find(x => x.id === id);
          
          if (!versionMetadata) {
            throw new Error('Version not found in list');
          }
          
          console.log('📋 Version metadata found:', versionMetadata);
          
          // Since we're only storing metadata locally, we need to load the actual data
          // from the saved CSV file or recreate it from the current data
          const currentData = getOriginalData();
          
          if (currentData && currentData.length > 0) {
            // Use current data as the version data
            setOriginalData(currentData);
            setCurrentHeaders(Object.keys(currentData[0]));
            setVisibleColumns(Object.keys(currentData[0]));
                resetFilterManager();
            filterManager = initializeFilterManager(currentData);
                initializeReportService();
            displayTable(currentData);
                toggleElements('#tableContainer', 'show');
                if (typeof updateViewSelect === 'function') updateViewSelect();
                if (typeof renderDashboardQuickFilters === 'function') renderDashboardQuickFilters();
                
                // Close modal after successful load
                const modal = document.getElementById('dataVersionsModal');
                if (modal) modal.style.display = 'none';
                
                if (typeof window.showUnifiedNotification === 'function') {
              window.showUnifiedNotification(`Data version loaded: ${versionMetadata.displayName || versionMetadata.name} (${currentData.length} records)`, 'success');
                } else {
                  showNotification('Data version loaded.', 'success');
                }
              } else {
            throw new Error('No current data available to load');
          }
        } catch (error) {
          console.error('❌ Error loading version:', error);
          if (typeof window.showUnifiedNotification === 'function') {
            window.showUnifiedNotification(`Error loading data version: ${error.message}`, 'error');
          } else {
            showNotification('Error loading data version.', 'error');
          }
        }
      });
    });
    // Listeners para botones Delete
    dataVersionsListDiv.querySelectorAll('[data-delete-version]').forEach(btn => {
      btn.addEventListener('click', async e => {
        const id = btn.dataset.deleteVersion;
        console.log('🗑️ Deleting version:', id);
        
        try {
        const versions = await getDataVersions();
        const v = versions.find(x => x.id === id);
          
          if (v && confirm(`Delete this data version?\n\n${v.displayName || v.name}\n\nThis action cannot be undone.`)) {
          await deleteDataVersion(id);
            
            // Re-render the list to show the updated versions
            await renderDataVersionsList();
            
            if (typeof window.showUnifiedNotification === 'function') {
              window.showUnifiedNotification(`Data version deleted: ${v.displayName || v.name}`, 'success');
            } else {
              showNotification('Data version deleted.', 'success');
            }
          }
        } catch (error) {
          console.error('❌ Error deleting version:', error);
          if (typeof window.showUnifiedNotification === 'function') {
            window.showUnifiedNotification('Error deleting data version!', 'error');
          } else {
            showNotification('Error deleting data version.', 'error');
          }
        }
      });
    });



  }
}

// --- User Set Up Modal (gestión de filtros, vistas, quick filters, dashboard config) ---
function setupUserSetUpModal() {
  console.log('Setting up User Setup Modal...');
  const userSetUpBtn = getElement('#userSetUpBtn');
  const userSetUpModal = getElement('#userSetUpModal');
  const closeUserSetUpBtn = getElement('#closeUserSetUpModalBtn');
  const userSetUpStatus = getElement('#userSetUpStatus');
  const modalContent = userSetUpModal ? userSetUpModal.querySelector('.modal-content') : null;

  if (!userSetUpBtn || !userSetUpModal || !closeUserSetUpBtn) {
    console.error('Required elements not found for User Setup Modal');
    return;
  }

  // Abrir modal
  userSetUpBtn.addEventListener('click', async () => {
    // Check if user is logged in
    const currentUserEmail = getCurrentUserEmail();
    if (!currentUserEmail) {
      // Show notification that user needs to be logged in
      showNotification('Please log in or register to access user settings', 'info');
      return;
    }
    
    userSetUpModal.style.display = 'flex';
    userSetUpModal.classList.remove('hidden');
    if (userSetUpStatus) userSetUpStatus.textContent = '';
    
    // Force refresh user data before rendering
    refreshUserData();
    
    // Update modal with current session info
    await updateUserConfigurationModal();
    
    // If still no user data, create a basic profile
    if (!window.currentUser) {
      const basicUser = getUserCredentials(currentUserEmail);
      if (basicUser) {
        window.currentUser = {
          email: currentUserEmail,
          name: basicUser.name || currentUserEmail.split('@')[0] || 'User',
          role: 'member',
          id: generateUserId()
        };
        localStorage.setItem('thebridge_current_user', JSON.stringify(window.currentUser));
      }
    }
    
    renderUserSetUpModalContent();
  });
  // Cerrar modal
  closeUserSetUpBtn.addEventListener('click', () => {
    userSetUpModal.classList.add('hidden');
    setTimeout(() => { userSetUpModal.style.display = 'none'; }, 300);
  });

  // Close modal when clicking outside
  userSetUpModal.addEventListener('click', (e) => {
    if (e.target === userSetUpModal) {
      userSetUpModal.classList.add('hidden');
      setTimeout(() => { userSetUpModal.style.display = 'none'; }, 300);
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && userSetUpModal.style.display === 'flex') {
      userSetUpModal.classList.add('hidden');
      setTimeout(() => { userSetUpModal.style.display = 'none'; }, 300);
    }
  });

  function refreshUserData() {
    // Try to load user and team data from localStorage
    try {
      const userData = localStorage.getItem('thebridge_current_user');
      const teamData = localStorage.getItem('thebridge_current_team');
      
      if (userData) {
        const user = JSON.parse(userData);
        window.currentUser = user;
      } else {
        // If no team user data, try to load from basic auth system
        const basicEmail = getCurrentUserEmail();
        if (basicEmail) {
          // Try to find user in the users list
          const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
          const foundUser = users.find(u => u.email === basicEmail);
          
          if (foundUser) {
            window.currentUser = foundUser;
          } else {
            // Try to find user in team data
            const teams = JSON.parse(localStorage.getItem('thebridge_teams') || '[]');
            let foundTeamUser = null;
            let foundTeam = null;
            
            console.log('🔍 Searching for user in teams:', {
              basicEmail,
              totalTeams: teams.length,
              teams: teams.map(t => ({ name: t.name, memberCount: t.members ? t.members.length : 0 }))
            });
            
            for (const team of teams) {
              if (team.members) {
                console.log(`🔍 Checking team "${team.name}" members:`, team.members.map(m => m.email));
                const member = team.members.find(m => m.email === basicEmail);
                if (member) {
                  console.log('✅ Found user in team:', member);
                  foundTeamUser = member;
                  foundTeam = team;
                  break;
                }
              }
            }
            
            if (foundTeamUser && foundTeam) {
              window.currentUser = {
                email: foundTeamUser.email,
                name: foundTeamUser.name,
                role: foundTeamUser.role || 'member',
                id: foundTeamUser.id || generateUserId()
              };
              window.currentTeam = foundTeam;
              
              // Save to localStorage for future use
              localStorage.setItem('thebridge_current_user', JSON.stringify(window.currentUser));
              localStorage.setItem('thebridge_current_team', JSON.stringify(window.currentTeam));
            } else {
              // Create a basic user object from email
              const basicUser = getUserCredentials(basicEmail);
              if (basicUser) {
                window.currentUser = {
                  email: basicEmail,
                  name: basicUser.name || basicEmail.split('@')[0] || 'User',
                  role: 'member',
                  id: generateUserId()
                };
              }
            }
          }
        }
      }
      
      if (teamData && !window.currentTeam) {
        const team = JSON.parse(teamData);
        window.currentTeam = team;
      }
      
      console.log('Refreshed user data:', { 
        currentUser: window.currentUser, 
        currentTeam: window.currentTeam 
      });
    } catch (error) {
      console.warn('Error refreshing user data:', error);
    }
  }
  
  function renderUserSetUpModalContent() {
    if (!modalContent) return;
    
    // Get user information (should be fresh after refreshUserData)
    const currentUser = window.currentUser;
    const currentTeam = window.currentTeam;
    const teams = getAllTeams();
    
    // If no user is logged in, show message and close modal
    if (!currentUser) {
      showNotification('No user session found. Please log in again.', 'error');
      userSetUpModal.classList.add('hidden');
      setTimeout(() => { userSetUpModal.style.display = 'none'; }, 300);
      return;
    }
    
    console.log('Rendering user setup modal with:', { currentUser, currentTeam, teams });
    
    // Update user profile display with fresh data
    const updateUserProfileDisplay = () => {
      const freshUser = window.currentUser;
      const freshTeam = window.currentTeam;
      
      console.log('🔄 Updating profile display with:', { freshUser, freshTeam });
      
      const elements = {
        email: document.getElementById('userEmailDisplay'),
        name: document.getElementById('userNameDisplay'),
        team: document.getElementById('userCurrentTeamDisplay'),
        role: document.getElementById('userRoleDisplay')
      };
      
      if (elements.email && freshUser?.email) {
        elements.email.textContent = freshUser.email;
        console.log('✅ Updated email:', freshUser.email);
      }
      
      if (elements.name && freshUser?.name) {
        elements.name.textContent = freshUser.name;
        console.log('✅ Updated name:', freshUser.name);
      }
      
      if (elements.team && freshTeam?.name) {
        elements.team.textContent = freshTeam.name;
        console.log('✅ Updated team:', freshTeam.name);
      }
      
      if (elements.role && freshUser?.role) {
        elements.role.textContent = freshUser.role;
        console.log('✅ Updated role:', freshUser.role);
      }
    };
    
    // Update immediately
    updateUserProfileDisplay();
    
    // Update again after a short delay to ensure data is loaded
    setTimeout(updateUserProfileDisplay, 100);
    setTimeout(updateUserProfileDisplay, 300);
    
    // Update teams list
    const userTeamsList = getElement('#userTeamsList');
    if (userTeamsList) {
      if (teams.length === 0) {
        userTeamsList.innerHTML = '<div style="font-style:italic; color:#B0BEC5;">No teams found</div>';
      } else {
        const teamsHtml = teams.map(team => {
          const isCurrentTeam = currentTeam && currentTeam.id === team.id;
          return `
            <div style="padding:0.5rem; margin-bottom:0.5rem; background:rgba(255,255,255,0.1); border-radius:4px; border-left:3px solid ${isCurrentTeam ? '#10B981' : '#6B7280'};">
              <div style="font-weight:600; color:#E8F4F8;">${team.name}</div>
              <div style="font-size:0.9em; color:#B0BEC5;">Code: ${team.code} ${isCurrentTeam ? ' (Current)' : ''}</div>
          </div>
          `;
        }).join('');
        userTeamsList.innerHTML = teamsHtml;
      }
    }
    
        // Setup button event listeners
    console.log('About to call setupUserSetUpButtons...');
    setupUserSetUpButtons();
  }
  
  function setupUserSetUpButtons() {
    console.log('Setting up User Setup Buttons...');
    // Asignar listeners a los botones
    const saveToFolderBtn = getElement('#saveToFolderBtn_user');
    const loadFromFolderBtn = getElement('#loadFromFolderBtn_user');
    const userSetUpStatusBtn = getElement('#userSetUpStatus_user');
    const saveDashboardConfigBtn = getElement('#saveDashboardConfigBtn');
    const manageDashboardConfigBtn = getElement('#manageDashboardConfigBtn');
    const editProfileBtn = getElement('#editProfileBtn');
    const changePasswordBtn = getElement('#changePasswordBtn');
    const exportUserDataBtn = getElement('#exportUserDataBtn');
    const logoutBtn = getElement('#logoutBtn');

    // Debug: verificar si los botones se encontraron correctamente
    console.log('User buttons status:', {
      saveDashboardConfigBtn: !!saveDashboardConfigBtn,
      manageDashboardConfigBtn: !!manageDashboardConfigBtn,
      saveToFolderBtn: !!saveToFolderBtn,
      loadFromFolderBtn: !!loadFromFolderBtn
    });
    
    console.log('DOM elements found:', {
      saveDashboardConfigBtn: document.getElementById('saveDashboardConfigBtn'),
      manageDashboardConfigBtn: document.getElementById('manageDashboardConfigBtn')
    });
    
    // Si los botones principales no se encontraron, intentar de nuevo después de un delay
    if (!saveDashboardConfigBtn || !manageDashboardConfigBtn) {
      console.log('Algunos botones no se encontraron, reintentando en 1 segundo...');
      setTimeout(() => {
        setupUserSetUpButtons();
      }, 1000);
      return;
    }

    // Save Dashboard Config - Save to backend folder (DISABLED - using HTML version)
    if (false && saveDashboardConfigBtn) {
      console.log('Setting up Save Dashboard Config button...');
      saveDashboardConfigBtn.addEventListener('click', async () => {
        console.log('Save Dashboard Config button clicked!');
        
        // Verificar si el usuario está logueado
        if (!window.currentUser || !window.currentTeam) {
          // Fallback: export local configuration without user
          console.log('User not logged in, exporting local configuration...');
          const dashboardConfig = getDashboardConfig();
          const filters = JSON.parse(localStorage.getItem('myFilters') || '[]');
          const quickFilters = JSON.parse(localStorage.getItem('quickFilters') || '{}');
          const customSummaries = JSON.parse(localStorage.getItem('customSummaries') || '{}');
          
          const settings = {
            dashboard: dashboardConfig,
            filters: filters,
            quickFilters: quickFilters,
            customSummaries: customSummaries,
            lastSaved: new Date().toISOString(),
            exported: 'local'
          };
          
          // Download as file
          const dataStr = JSON.stringify(settings, null, 2);
          const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
          const exportFileDefaultName = `dashboard-config-local-${new Date().toISOString().split('T')[0]}.json`;
          
          const linkElement = document.createElement('a');
          linkElement.setAttribute('href', dataUri);
          linkElement.setAttribute('download', exportFileDefaultName);
          linkElement.click();
          
          showNotification('Dashboard configuration exported as JSON file', 'success');
          return;
        }

        try {
          const dashboardConfig = getDashboardConfig();
          const filters = JSON.parse(localStorage.getItem('myFilters') || '[]');
          const quickFilters = JSON.parse(localStorage.getItem('quickFilters') || '{}');
          const customSummaries = JSON.parse(localStorage.getItem('customSummaries') || '{}');
          
          // Guardar configuración del dashboard en la carpeta del backend
          const settings = {
            dashboard: dashboardConfig,
            filters: filters,
            quickFilters: quickFilters,
            customSummaries: customSummaries,
            lastSaved: new Date().toISOString(),
            userEmail: window.currentUser.email,
            userName: window.currentUser.name,
            teamId: window.currentTeam.id,
            teamName: window.currentTeam.name
          };
          
          // Crear nombre de archivo con timestamp
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const filename = `dashboard-config-${window.currentUser.email}-${timestamp}.json`;
          
          console.log('Intentando guardar en backend...', filename);
          
          // Intentar guardar en el backend
          const response = await fetch(`${window.backendUrl}/api/dashboard/save`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              filename: filename,
              settings: settings,
              teamId: window.currentTeam.id,
              userEmail: window.currentUser.email
            })
          });
          
          if (response.ok) {
            const result = await response.json();
            if (userSetUpStatusBtn) {
              userSetUpStatusBtn.textContent = '✅ Dashboard configuration saved to backend successfully!';
              userSetUpStatusBtn.style.color = '#10B981';
            }
            showNotification('Dashboard configuration saved to backend folder', 'success');
          } else {
            throw new Error('Backend save failed');
          }
        } catch (error) {
          console.error('Error saving dashboard config to backend:', error);
          
          // Fallback: save locally
          try {
          const success = await saveUserSettings(window.currentUser.email, window.currentTeam.id, settings);
          if (success) {
            if (userSetUpStatusBtn) {
              userSetUpStatusBtn.textContent = '⚠️ Saved locally (backend unavailable)';
              userSetUpStatusBtn.style.color = '#FF9800';
            }
            showNotification('Dashboard configuration saved locally (backend unavailable)', 'warning');
          } else {
              throw new Error('Local save failed');
            }
          } catch (localError) {
            console.error('Error saving locally:', localError);
            
            // Last fallback: download as file
            const dataStr = JSON.stringify(settings, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = `dashboard-config-${new Date().toISOString().split('T')[0]}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            
            if (userSetUpStatusBtn) {
              userSetUpStatusBtn.textContent = '💾 Configuration downloaded as file';
              userSetUpStatusBtn.style.color = '#2196F3';
            }
            showNotification('Configuration downloaded as JSON file', 'info');
          }
        }
      });
    }

    // Manage Dashboard Config - Open backend folder (DISABLED - using HTML version)
    if (false && manageDashboardConfigBtn) {
      console.log('Setting up Manage Dashboard Config button...');
      manageDashboardConfigBtn.addEventListener('click', async () => {
        console.log('Manage Dashboard Config button clicked!');
        
        // Always show local management modal first
        showManageDashboardConfigModal();
        
        // If user is logged in, also try to access backend
        if (window.currentUser && window.currentTeam) {
          try {
            console.log('Trying to access backend folder...');
            // Try to open backend folder where configurations are saved
          const response = await fetch(`${window.backendUrl}/api/dashboard/open-folder`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              teamId: window.currentTeam.id,
              userEmail: window.currentUser.email
            })
          });
          
          if (response.ok) {
            const result = await response.json();
            showNotification('Opening dashboard configurations folder...', 'info');
            
              // Also show list of available configurations
            if (result.files && result.files.length > 0) {
              const filesList = result.files.map(file => `• ${file}`).join('\n');
                showNotification(`Available configurations on server:\n${filesList}`, 'info');
            } else {
                showNotification('No dashboard configurations found on server', 'info');
            }
          } else {
            throw new Error('Backend folder access failed');
          }
        } catch (error) {
            console.error('Error accessing backend folder:', error);
            showNotification('Cannot access backend folder. Using local management.', 'warning');
          }
        } else {
          showNotification('Login to access server configurations', 'info');
        }
      });
    }

    // Save to Folder (Export local backup)
    if (saveToFolderBtn) {
      saveToFolderBtn.onclick = async () => {
        // Exportar snapshot completo
        const filtros = JSON.parse(localStorage.getItem('myFilters') || '[]');
        const filtrosGuardados = JSON.parse(localStorage.getItem('myFilters') || '{}');
        const vistas = JSON.parse(localStorage.getItem('tableViews') || '{}');
        const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        const quickFilters = JSON.parse(localStorage.getItem('quickFilters') || '{}');
        const customSummaries = JSON.parse(localStorage.getItem('customSummaries') || '{}');
        const tablas = getOriginalData ? getOriginalData() : [];
        const dashboardConfig = getDashboardConfig();
        const backup = {
          filtros,
          filtrosGuardados,
          vistas,
          favoritos,
          quickFilters,
          customSummaries,
          tablas,
          dashboardConfig,
          fecha: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'thebridge-snapshot.json';
        a.click();
        if (userSetUpStatusBtn) {
          userSetUpStatusBtn.textContent = '✅ Snapshot exported to file.';
          userSetUpStatusBtn.style.color = '#10B981';
        }
        showNotification('Snapshot exported to file', 'success');
      };
    }

    // Load from Folder (Import local backup)
    if (loadFromFolderBtn) {
      loadFromFolderBtn.onclick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = async (ev) => {
            try {
              const backup = JSON.parse(ev.target.result);
              if (backup.filtrosGuardados) localStorage.setItem('myFilters', JSON.stringify(backup.filtrosGuardados));
              if (backup.filtros) localStorage.setItem('myFilters', JSON.stringify(backup.filtros));
              if (backup.filtros && typeof setModuleFilterValues === 'function' && typeof applyFilters === 'function') {
                setModuleFilterValues(backup.filtros);
                applyFilters();
              }
              if (backup.vistas) {
                localStorage.setItem('tableViews', JSON.stringify(backup.vistas));
                if (typeof updateViewSelect === 'function') updateViewSelect();
              }
              if (backup.favoritos) localStorage.setItem('favoritos', JSON.stringify(backup.favoritos));
              if (backup.quickFilters) {
                localStorage.setItem('quickFilters', JSON.stringify(backup.quickFilters));
                if (typeof renderDashboardQuickFilters === 'function') renderDashboardQuickFilters();
              }
              if (backup.customSummaries) {
                localStorage.setItem('customSummaries', JSON.stringify(backup.customSummaries));
              }
              if (backup.dashboardConfig) saveDashboardConfig(backup.dashboardConfig);
              if (backup.tablas && Array.isArray(backup.tablas)) {
                if (typeof setOriginalData === 'function') {
                  setOriginalData(backup.tablas);
                  displayTable(backup.tablas);
                }
              }
              if (userSetUpStatusBtn) {
                userSetUpStatusBtn.textContent = '✅ Snapshot imported successfully. Reload page to apply all changes.';
                userSetUpStatusBtn.style.color = '#10B981';
              }
              showNotification('Snapshot imported successfully. Reload page to apply all changes.', 'success');
            } catch (error) {
              console.error('Error importing snapshot:', error);
              if (userSetUpStatusBtn) {
                userSetUpStatusBtn.textContent = '❌ Error importing snapshot.';
                userSetUpStatusBtn.style.color = '#d32f2f';
              }
              showNotification('Error importing snapshot', 'error');
            }
          };
          reader.readAsText(file);
        };
        input.click();
      };
    }

    // Edit Profile Button
    if (editProfileBtn) {
      editProfileBtn.onclick = () => {
        if (!window.currentUser) {
          showNotification('Please log in to edit profile', 'error');
          return;
        }
        
        // Show a simple edit profile modal
        const newName = prompt('Enter your new name:', window.currentUser.name || '');
        if (newName && newName.trim()) {
          // Update user profile
          window.currentUser.name = newName.trim();
          localStorage.setItem('thebridge_current_user', JSON.stringify(window.currentUser));
          
          // Also update the basic user credentials if they exist
          const basicUser = getUserCredentials(window.currentUser.email);
          if (basicUser) {
            saveUserCredentials(window.currentUser.email, basicUser.password, newName.trim());
          }
          
          // Update the users list if the user exists there
          const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
          const userIndex = users.findIndex(u => u.email === window.currentUser.email);
          if (userIndex !== -1) {
            users[userIndex].name = newName.trim();
            localStorage.setItem('thebridge_users', JSON.stringify(users));
          }
          
          // Save to backend if team is available
          if (window.currentTeam) {
            saveUserProfile(window.currentUser.email, window.currentTeam.id, {
              name: newName.trim(),
              email: window.currentUser.email,
              role: window.currentUser.role || 'member'
            });
          }
          
          // Refresh the modal content
          renderUserSetUpModalContent();
          
          showNotification('Profile updated successfully', 'success');
        }
      };
    }

    // Change Password Button
    if (changePasswordBtn) {
      changePasswordBtn.onclick = () => {
        if (!window.currentUser || !window.currentTeam) {
          showNotification('Please log in to change password', 'error');
          return;
        }
        
        const currentPassword = prompt('Enter current password:');
        if (!currentPassword) return;
        
        const newPassword = prompt('Enter new password:');
        if (!newPassword) return;
        
        const confirmPassword = prompt('Confirm new password:');
        if (newPassword !== confirmPassword) {
          showNotification('Passwords do not match', 'error');
          return;
        }
        
        // For demo purposes, just show success
        // In production, you'd validate the current password and update it
        showNotification('Password changed successfully (demo mode)', 'success');
      };
    }

    // Export User Data Button
    if (exportUserDataBtn) {
      exportUserDataBtn.onclick = async () => {
        if (!window.currentUser || !window.currentTeam) {
          showNotification('Please log in to export data', 'error');
          return;
        }
        
        try {
          // Get user data from backend
          const userProfile = await loadUserProfile(window.currentUser.email, window.currentTeam.id);
          const userSettings = await loadUserSettings(window.currentUser.email, window.currentTeam.id);
          const userFilters = await loadUserFilters(window.currentUser.email, window.currentTeam.id);
          
          const userData = {
            profile: userProfile || window.currentUser,
            settings: userSettings || {},
            filters: userFilters || [],
            exportDate: new Date().toISOString()
          };
          
          const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `user-data-${window.currentUser.email}-${new Date().toISOString().split('T')[0]}.json`;
          a.click();
          
          showNotification('User data exported successfully', 'success');
        } catch (error) {
          console.error('Error exporting user data:', error);
          showNotification('Error exporting user data', 'error');
        }
      };
    }

    // Logout Button
    if (logoutBtn) {
      logoutBtn.onclick = async () => {
        if (confirm('Are you sure you want to logout?')) {
          await clearTeamSession();
          showNotification('Logged out successfully', 'info');
          
          // Close modal
          userSetUpModal.classList.add('hidden');
          setTimeout(() => { userSetUpModal.style.display = 'none'; }, 300);
          
          // Show welcome screen
          showWelcomeScreen();
        }
      };
    }
  }
}

// Wait for DOM to be ready before setting up modals
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, setting up modals...');
setupDataVersionModal();
setupUserSetUpModal();
});

// Backup Modal Setup
function setupBackupModal() {
  const backupBtn = getElement('#backupBtn');
  const backupModal = getElement('#backupModal');
  const closeBackupBtn = getElement('#closeBackupModalBtn');
  const saveFilterBtn = getElement('#saveFilterBtn');
  const saveViewBtn = getElement('#saveViewBtn');
  const saveQuickFilterBtn = getElement('#saveQuickFilterBtn');
  const manageQuickFiltersBtn = getElement('#manageQuickFiltersBtn');
  const saveDashboardConfigBtn = getElement('#saveDashboardConfigBtn');
  const backupStatus = getElement('#backupStatus');
  const saveDataVersionBtn = getElement('#saveDataVersionBtn');

  if (!backupBtn || !backupModal || !closeBackupBtn) {
    console.warn('Required backup modal elements not found');
    return;
  }

  // Show modal
  backupBtn.addEventListener('click', () => {
    backupModal.style.display = 'flex';
    backupModal.classList.remove('hidden');
    renderDataVersionsList();
  });

  // Close modal
  closeBackupBtn.addEventListener('click', () => {
    backupModal.classList.add('hidden');
    setTimeout(() => {
      backupModal.style.display = 'none';
    }, 300);
  });

  // Guardar versión de datos
  if (saveDataVersionBtn) {
    saveDataVersionBtn.addEventListener('click', async () => {
      const data = getOriginalData ? getOriginalData() : [];
      if (!data || !data.length) {
        showNotification('No data loaded to save.', 'warning');
        return;
      }
      await saveDataVersion(data);
      renderDataVersionsList();
              showNotification('Data version saved.', 'success');
    });
  }

  // Save current filter
  if (saveFilterBtn) {
    saveFilterBtn.addEventListener('click', () => {
      // Check if user can modify data (admin only)
      if (typeof canUserModifyData === 'function' && !canUserModifyData()) {
        backupStatus.textContent = '❌ Solo los administradores pueden guardar filtros.';
        backupStatus.className = 'error';
        return;
      }
      
      const name = prompt('Enter a name for this filter:');
      if (name) {
        saveMyFilter(name);
        backupStatus.textContent = '✅ Filtro guardado correctamente.';
        backupStatus.className = 'success';
      }
    });
  }

  // Save current view
  if (saveViewBtn) {
    saveViewBtn.addEventListener('click', () => {
      const name = prompt('Enter a name for this view:');
      if (name) {
        saveView(name, getVisibleColumns());
        backupStatus.textContent = '✅ Vista guardada correctamente.';
        backupStatus.className = 'success';
      }
    });
  }

  // Save quick filter
  if (saveQuickFilterBtn) {
    saveQuickFilterBtn.addEventListener('click', () => {
      // Check if user can modify data (admin only)
      if (typeof canUserModifyData === 'function' && !canUserModifyData()) {
        backupStatus.textContent = '❌ Solo los administradores pueden guardar filtros rápidos.';
        backupStatus.className = 'error';
        return;
      }
      
      const name = prompt('Name for the quick filter:');
      if (name) {
        // Detect which hub is currently active
        const hubType = getCurrentHubType();
        
        saveQuickFilter(name, null, null, null, hubType);
        backupStatus.textContent = '✅ Filtro rápido guardado correctamente.';
        backupStatus.className = 'success';
      }
    });
  }

  // Manage quick filters
  if (manageQuickFiltersBtn) {
    manageQuickFiltersBtn.addEventListener('click', () => {
      // Show quick filters management UI
      const quickFilters = loadQuickFilters();
      
      // Detect which hub is currently active
      const hubType = getCurrentHubType();

      // Filter quick filters by hub type
      const filteredQuickFilters = Object.entries(quickFilters).filter(([name, filter]) => {
        return filter.hubType === hubType;
      });
      
      const names = filteredQuickFilters.map(([name, filter]) => name);
      if (names.length === 0) {
        backupStatus.textContent = 'No quick filters saved.';
        backupStatus.className = '';
        return;
      }
      // Create and show quick filters list
      const list = document.createElement('div');
      list.className = 'quick-filters-list';
      names.forEach(name => {
        const item = document.createElement('div');
        item.className = 'quick-filter-item';
        item.innerHTML = `
          <span>${name}</span>
          <button class="delete-btn" data-name="${name}">🗑️</button>
        `;
        list.appendChild(item);
      });
      // Show list in modal
      const modalContent = backupModal.querySelector('.modal-content');
      modalContent.appendChild(list);
      // Add delete handlers
      list.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const name = btn.dataset.name;
          if (confirm(`Delete quick filter "${name}"?`)) {
            deleteQuickFilter(name);
            btn.closest('.quick-filter-item').remove();
            backupStatus.textContent = '✅ Filtro rápido eliminado.';
            backupStatus.className = 'success';
          }
        });
      });
    });
  }

  // Save dashboard config
  if (saveDashboardConfigBtn) {
    saveDashboardConfigBtn.addEventListener('click', () => {
      const config = getDashboardConfig();
      saveDashboardConfig(config);
      backupStatus.textContent = '✅ Configuración del dashboard guardada.';
      backupStatus.className = 'success';
    });
  }
}

// Initialize backup modal
setupBackupModal();

// --- Snapshot Manager Modal ---
function setupSnapshotManagerModal() {
  const snapshotBtn = getElement('#snapshotManagerBtn');
  const snapshotModal = getElement('#snapshotManagerModal');
  const closeSnapshotBtn = getElement('#closeSnapshotManagerModalBtn');
  const saveSnapshotBtn = getElement('#saveSnapshotBtn');
  const restoreSnapshotBtn = getElement('#restoreSnapshotBtn');
  const snapshotStatus = getElement('#snapshotStatus');

  if (!snapshotBtn || !snapshotModal || !closeSnapshotBtn) return;

  // Abrir modal
  snapshotBtn.addEventListener('click', () => {
    snapshotModal.style.display = 'flex';
    snapshotModal.classList.remove('hidden');
    snapshotStatus.textContent = '';
    snapshotStatus.className = '';
  });
  // Cerrar modal
  closeSnapshotBtn.addEventListener('click', () => {
    snapshotModal.classList.add('hidden');
    setTimeout(() => { snapshotModal.style.display = 'none'; }, 300);
  });
  // Guardar snapshot
  if (saveSnapshotBtn) {
    saveSnapshotBtn.addEventListener('click', async () => {
      try {
        const filtros = JSON.parse(localStorage.getItem('myFilters') || '[]');
        const vistas = JSON.parse(localStorage.getItem('tableViews') || '{}');
        const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        const tablas = getOriginalData ? getOriginalData() : [];
        const dashboardConfig = getDashboardConfig();
        const backup = {
          filtros,
          vistas,
          favoritos,
          tablas,
          dashboardConfig,
          fecha: new Date().toISOString()
        };
        await saveToIndexedDB('backup', backup);
        snapshotStatus.textContent = '✅ Snapshot saved successfully.';
        snapshotStatus.className = 'success';
      } catch (e) {
        snapshotStatus.textContent = '❌ Error saving snapshot.';
        snapshotStatus.className = 'error';
      }
    });
  }
  // Restaurar snapshot
  if (restoreSnapshotBtn) {
    restoreSnapshotBtn.addEventListener('click', async () => {
      try {
        const backup = await loadFromIndexedDB('backup');
        if (!backup) {
          snapshotStatus.textContent = '❌ No snapshot found.';
          snapshotStatus.className = 'error';
          return;
        }
        if (backup.filtros) localStorage.setItem('myFilters', JSON.stringify(backup.filtros));
        if (backup.vistas) {
          localStorage.setItem('tableViews', JSON.stringify(backup.vistas));
          if (typeof updateViewSelect === 'function') updateViewSelect();
        }
        if (backup.favoritos) localStorage.setItem('favoritos', JSON.stringify(backup.favoritos));
        if (backup.dashboardConfig) saveDashboardConfig(backup.dashboardConfig);
        if (backup.tablas && Array.isArray(backup.tablas)) {
          if (typeof setOriginalData === 'function') {
            setOriginalData(backup.tablas);
            displayTable(backup.tablas);
          }
        }
        snapshotStatus.textContent = '✅ Snapshot restored. Reload the page to apply all changes.';
        snapshotStatus.className = 'success';
      } catch (e) {
        snapshotStatus.textContent = '❌ Error restoring snapshot.';
        snapshotStatus.className = 'error';
      }
    });
  }
}

// Inicializar modal de snapshot manager
setupSnapshotManagerModal(); 

// Add notification for refresh
document.getElementById('refreshTableBtn')?.addEventListener('click', () => {
  // Your existing refresh code here
  tableNotification.show('Table has been refreshed');
});

// Función para limpiar y reinicializar IndexedDB
function clearAndReinitializeIndexedDB() {
  return new Promise((resolve, reject) => {
    try {
      console.log('🧹 Clearing and reinitializing IndexedDB...');
      
      if (!window.indexedDB) {
        console.warn('⚠️ IndexedDB no disponible');
        resolve();
        return;
      }

      // Cerrar todas las conexiones existentes
      const deleteRequest = indexedDB.deleteDatabase('TheBridgeDB');
      
      deleteRequest.onsuccess = function() {
        console.log('✅ Database deleted, creating new one...');
        
        // Crear nueva base de datos con estructura correcta
        const request = indexedDB.open('TheBridgeDB', 2); // Incrementar versión
        
        request.onupgradeneeded = function(event) {
          const db = event.target.result;
          console.log('🔧 Creando object stores...');
          
          // Crear todos los object stores necesarios
          if (!db.objectStoreNames.contains('users')) {
            db.createObjectStore('users', { keyPath: 'email' });
          }
          if (!db.objectStoreNames.contains('teams')) {
            db.createObjectStore('teams', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('pending')) {
            db.createObjectStore('pending');
          }
          if (!db.objectStoreNames.contains('backups')) {
            db.createObjectStore('backups', { keyPath: 'key' });
          }
          if (!db.objectStoreNames.contains('versions')) {
            db.createObjectStore('versions', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'key' });
          }
          
          console.log('✅ Object stores creados:', Array.from(db.objectStoreNames));
        };
        
        request.onsuccess = function(event) {
          const db = event.target.result;
          console.log('✅ IndexedDB reinicializada correctamente');
          console.log('📋 Object stores disponibles:', Array.from(db.objectStoreNames));
          db.close();
          resolve();
        };
        
        request.onerror = function(event) {
          console.error('❌ Error creating new database:', event.target.error);
          reject(event.target.error);
        };
      };
      
      deleteRequest.onerror = function(event) {
        console.error('❌ Error deleting database:', event.target.error);
        reject(event.target.error);
      };
      
    } catch (error) {
      console.error('❌ Error en clearAndReinitializeIndexedDB:', error);
      reject(error);
    }
  });
}

// Función para verificar y reparar IndexedDB
async function verifyAndRepairIndexedDB() {
  try {
    console.log('🔍 Verificando IndexedDB...');
    
    if (!window.indexedDB) {
      console.warn('⚠️ IndexedDB no disponible');
      return;
    }

          // Force complete cleanup in development
    if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
      console.log('🛠️ Development environment detected, forcing complete cleanup...');
      await clearAndReinitializeIndexedDB();
      return;
    }

    // Intentar abrir la base de datos
    const request = indexedDB.open('TheBridgeDB');
    
    request.onerror = async function(event) {
      console.error('❌ Error abriendo IndexedDB, reinicializando...');
      await clearAndReinitializeIndexedDB();
    };
    
    request.onsuccess = function(event) {
      const db = event.target.result;
      const expectedStores = ['users', 'teams', 'pending', 'backups', 'versions', 'settings'];
      const existingStores = Array.from(db.objectStoreNames);
      
      console.log('📋 Object stores existentes:', existingStores);
      console.log('📋 Object stores esperados:', expectedStores);
      
      // Verificar si faltan object stores
      const missingStores = expectedStores.filter(store => !existingStores.includes(store));
      
      if (missingStores.length > 0) {
        console.warn('⚠️ Faltan object stores:', missingStores);
        console.log('🔄 Reinicializando IndexedDB...');
        db.close();
        clearAndReinitializeIndexedDB();
      } else {
        console.log('✅ IndexedDB verificado correctamente');
        db.close();
      }
    };
    
  } catch (error) {
    console.error('❌ Error verificando IndexedDB:', error);
    await clearAndReinitializeIndexedDB();
  }
}

// --- IndexedDB helpers para archivos grandes ---
function savePendingCSVToIndexedDB(content) {
  return new Promise((resolve, reject) => {
    try {
      // Check if IndexedDB is available
      if (!window.indexedDB) {
        console.warn('⚠️ IndexedDB not available, skipping save');
        resolve();
        return;
      }

    const request = indexedDB.open('TheBridgeDB', 1);
      
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pending')) {
        db.createObjectStore('pending');
      }
    };
      
    request.onsuccess = function(event) {
      const db = event.target.result;
      const tx = db.transaction('pending', 'readwrite');
      const store = tx.objectStore('pending');
      store.put(content, 'pendingCSV');
      tx.oncomplete = () => resolve();
        tx.onerror = (e) => {
          console.warn('⚠️ IndexedDB transaction error:', e);
          resolve(); // Don't reject, just resolve
        };
      };
      
      request.onerror = (e) => {
        console.warn('⚠️ IndexedDB open error:', e);
        resolve(); // Don't reject, just resolve
      };
    } catch (error) {
      console.warn('⚠️ IndexedDB error in savePendingCSVToIndexedDB:', error);
      resolve(); // Don't reject, just resolve
    }
  });
}
function loadPendingCSVFromIndexedDB() {
  return new Promise((resolve, reject) => {
    try {
      // Check if IndexedDB is available
      if (!window.indexedDB) {
        console.warn('⚠️ IndexedDB not available, skipping load');
        resolve(null);
        return;
      }

    const request = indexedDB.open('TheBridgeDB', 1);
      
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pending')) {
        db.createObjectStore('pending');
      }
    };
      
    request.onsuccess = function(event) {
      const db = event.target.result;
      const tx = db.transaction('pending', 'readonly');
      const store = tx.objectStore('pending');
      const getReq = store.get('pendingCSV');
      getReq.onsuccess = () => resolve(getReq.result);
        getReq.onerror = (e) => {
          console.warn('⚠️ IndexedDB get error:', e);
          resolve(null); // Don't reject, just resolve with null
        };
      };
      
      request.onerror = (e) => {
        console.warn('⚠️ IndexedDB open error:', e);
        resolve(null); // Don't reject, just resolve with null
      };
    } catch (error) {
      console.warn('⚠️ IndexedDB error in loadPendingCSVFromIndexedDB:', error);
      resolve(null); // Don't reject, just resolve with null
    }
  });
}
function clearPendingCSVFromIndexedDB() {
  return new Promise((resolve, reject) => {
    try {
      // Check if IndexedDB is available
      if (!window.indexedDB) {
        console.warn('⚠️ IndexedDB not available, skipping clear');
        resolve();
        return;
      }

    const request = indexedDB.open('TheBridgeDB', 1);
      
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pending')) {
        db.createObjectStore('pending');
      }
    };
      
    request.onsuccess = function(event) {
      const db = event.target.result;
      const tx = db.transaction('pending', 'readwrite');
      const store = tx.objectStore('pending');
      store.delete('pendingCSV');
      tx.oncomplete = () => resolve();
        tx.onerror = (e) => {
          console.warn('⚠️ IndexedDB transaction error:', e);
          resolve(); // Don't reject, just resolve
        };
      };
      
      request.onerror = (e) => {
        console.warn('⚠️ IndexedDB open error:', e);
        resolve(); // Don't reject, just resolve
      };
    } catch (error) {
      console.warn('⚠️ IndexedDB error in clearPendingCSVFromIndexedDB:', error);
      resolve(); // Don't reject, just resolve
    }
  });
}

// --- IndexedDB Recovery Function ---
function recoverIndexedDB() {
  return new Promise((resolve) => {
    try {
      if (!window.indexedDB) {
        console.warn('⚠️ IndexedDB not available');
        resolve();
        return;
      }

      console.log('🔄 Attempting to recover IndexedDB...');
      
      // Try to delete the database and recreate it
      const deleteRequest = indexedDB.deleteDatabase('TheBridgeDB');
      
      deleteRequest.onsuccess = function() {
        console.log('✅ IndexedDB deleted successfully');
        
        // Try to recreate the database
        const createRequest = indexedDB.open('TheBridgeDB', 1);
        
        createRequest.onupgradeneeded = function(event) {
          const db = event.target.result;
          
          // Create all necessary object stores
          if (!db.objectStoreNames.contains('pending')) {
            db.createObjectStore('pending');
          }
          if (!db.objectStoreNames.contains('users')) {
            db.createObjectStore('users');
          }
          if (!db.objectStoreNames.contains('teams')) {
            db.createObjectStore('teams');
          }
          if (!db.objectStoreNames.contains('dataVersions')) {
            db.createObjectStore('dataVersions');
          }
          if (!db.objectStoreNames.contains('backups')) {
            db.createObjectStore('backups');
          }
          
          console.log('✅ IndexedDB object stores created');
        };
        
        createRequest.onsuccess = function() {
          console.log('✅ IndexedDB recreated successfully');
          resolve();
        };
        
        createRequest.onerror = function(e) {
          console.warn('⚠️ Failed to recreate IndexedDB:', e);
          resolve();
        };
      };
      
      deleteRequest.onerror = function(e) {
        console.warn('⚠️ Failed to delete IndexedDB:', e);
        resolve();
      };
      
    } catch (error) {
      console.warn('⚠️ Error in IndexedDB recovery:', error);
      resolve();
    }
  });
}

// --- Week number and calendar popup in header ---
function getWeekNumber(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  return weekNo;
}

function updateWeekNumberDisplay() {
  const el = document.getElementById('weekNumberDisplay');
  if (!el) return;
  const now = new Date();
  const week = getWeekNumber(now);
  el.textContent = `Week ${week}`;
}

function renderCalendarPopup() {
  const popup = document.getElementById('calendarPopup');
  if (!popup) return;
  const now = new Date();
  const baseDate = new Date(now.getFullYear(), now.getMonth() + calendarMonthOffset, 1);
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  // Get first day of month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay(); // Monday=1, Sunday=7
  let html = `<div style="background:rgba(26, 35, 50, 0.95); color:#ffffff; border-radius:12px; box-shadow:0 8px 32px rgba(0,0,0,0.4); padding:1.5em; min-width:320px; font-size:1em; backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.1);">
    <div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8em;'>
      <button id='prevMonthBtn' style='background:rgba(71,178,229,0.2);border:1px solid rgba(71,178,229,0.3);font-size:1.3em;cursor:pointer;color:#47B2E5;border-radius:6px;padding:0.3em 0.6em;transition:all 0.3s ease;' title='Previous month'>&#8592;</button>
      <span style='font-weight:600;color:#ffffff;font-size:1.1em;'>${baseDate.toLocaleString('en-US', { month: 'long' })} ${year}</span>
      <button id='nextMonthBtn' style='background:rgba(71,178,229,0.2);border:1px solid rgba(71,178,229,0.3);font-size:1.3em;cursor:pointer;color:#47B2E5;border-radius:6px;padding:0.3em 0.6em;transition:all 0.3s ease;' title='Next month'>&#8594;</button>
      <button id='closeCalendarPopupBtn' style='background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);font-size:1.2em;cursor:pointer;margin-left:0.5em;color:#ffffff;border-radius:6px;padding:0.3em 0.6em;transition:all 0.3s ease;'>&times;</button>
    </div>
    <table style='width:100%;border-collapse:collapse;'>
      <thead><tr><th style='color:#47B2E5;font-weight:600;padding:0.5em 0.2em;border-bottom:1px solid rgba(71,178,229,0.3);'>Wk</th><th style='color:#ffffff;padding:0.5em 0.2em;border-bottom:1px solid rgba(255,255,255,0.1);'>Mon</th><th style='color:#ffffff;padding:0.5em 0.2em;border-bottom:1px solid rgba(255,255,255,0.1);'>Tue</th><th style='color:#ffffff;padding:0.5em 0.2em;border-bottom:1px solid rgba(255,255,255,0.1);'>Wed</th><th style='color:#ffffff;padding:0.5em 0.2em;border-bottom:1px solid rgba(255,255,255,0.1);'>Thu</th><th style='color:#ffffff;padding:0.5em 0.2em;border-bottom:1px solid rgba(255,255,255,0.1);'>Fri</th><th style='color:#ffffff;padding:0.5em 0.2em;border-bottom:1px solid rgba(255,255,255,0.1);'>Sat</th><th style='color:#ffffff;padding:0.5em 0.2em;border-bottom:1px solid rgba(255,255,255,0.1);'>Sun</th></tr></thead><tbody>`;
  let day = 1;
  let weekRow = 0;
  const today = new Date();
  while (day <= lastDay.getDate()) {
    html += '<tr>';
    // Número de semana
    const weekDate = new Date(year, month, day);
    html += `<td style='color:#47B2E5;font-weight:600;text-align:center;padding:0.4em 0.2em;'>${getWeekNumber(weekDate)}</td>`;
    // Días de la semana
    for (let i = 1; i <= 7; i++) {
      const cellDay = (weekRow === 0 && i < startDay) ? '' : (day <= lastDay.getDate() ? day : '');
      if (cellDay) {
        const cellDate = new Date(year, month, cellDay);
        let highlight = '';
        if (
          cellDate.getDate() === today.getDate() &&
          cellDate.getMonth() === today.getMonth() &&
          cellDate.getFullYear() === today.getFullYear()
        ) {
          highlight = "background:#47B2E5;color:#ffffff;font-weight:700;border-radius:8px;box-shadow:0 2px 8px rgba(71,178,229,0.3);";
        }
        html += `<td style='text-align:center;cursor:pointer;padding:0.4em 0.4em;border-radius:6px;color:#ffffff;transition:all 0.3s ease;${highlight}' data-date='${cellDate.toISOString()}' onmouseover='this.style.background="rgba(71,178,229,0.2)"' onmouseout='${highlight ? "" : "this.style.background=\"transparent\""}'>${cellDay}</td>`;
        day++;
      } else {
        html += '<td style="padding:0.4em;"></td>';
      }
    }
    html += '</tr>';
    weekRow++;
  }
  html += '</tbody></table>';
  html += `<div id='calendarDayInfo' style='margin-top:0.8em;color:#47B2E5;font-size:0.95em;min-height:1.2em;text-align:center;font-weight:500;'></div>`;
  html += '</div>';
  popup.innerHTML = html;

  // Navegación de meses
  const prevBtn = document.getElementById('prevMonthBtn');
  const nextBtn = document.getElementById('nextMonthBtn');
  const closeBtn = document.getElementById('closeCalendarPopupBtn');
  
  prevBtn.onclick = (e) => {
    e.stopPropagation();
    calendarMonthOffset--;
    renderCalendarPopup();
  };
  nextBtn.onclick = (e) => {
    e.stopPropagation();
    calendarMonthOffset++;
    renderCalendarPopup();
  };
  
  // Efectos hover para botones
  [prevBtn, nextBtn].forEach(btn => {
    btn.onmouseover = () => btn.style.background = 'rgba(71,178,229,0.4)';
    btn.onmouseout = () => btn.style.background = 'rgba(71,178,229,0.2)';
  });
  
  closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255,255,255,0.2)';
  closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(255,255,255,0.1)';
  
  // Cerrar popup
  closeBtn.onclick = (e) => {
    e.stopPropagation();
    popup.style.display = 'none';
    calendarMonthOffset = 0;
  };
  // Mostrar info de día al hacer hover
  popup.querySelectorAll('td[data-date]').forEach(td => {
    td.addEventListener('mouseenter', (e) => {
      const date = new Date(td.dataset.date);
      const info = document.getElementById('calendarDayInfo');
      if (info) info.textContent = `${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    });
    td.addEventListener('mouseleave', (e) => {
      const info = document.getElementById('calendarDayInfo');
      if (info) info.textContent = '';
    });
  });
}

function setupWeekNumberCalendar() {
  const weekDiv = document.getElementById('dateTimeInfo');
  const popup = document.getElementById('calendarPopup');
  if (!weekDiv || !popup) return;
  weekDiv.onclick = (e) => {
    e.stopPropagation();
    renderCalendarPopup();
    popup.style.display = 'block';
  };
  // Cerrar al hacer click fuera
  document.addEventListener('mousedown', (e) => {
    if (!popup.contains(e.target) && !weekDiv.contains(e.target)) {
      popup.style.display = 'none';
      calendarMonthOffset = 0;
    }
  });
}

updateWeekNumberDisplay();
setupWeekNumberCalendar();
setInterval(updateWeekNumberDisplay, 60 * 1000);

// --- Gestión de configuraciones de dashboard ---
function getAllDashboardConfigs() {
  try {
    return JSON.parse(localStorage.getItem('dashboardConfigs')) || {};
  } catch {
    return {};
  }
}
function saveAllDashboardConfigs(configs) {
  localStorage.setItem('dashboardConfigs', JSON.stringify(configs));
}
function showManageDashboardConfigModal() {
  console.log('Abriendo modal de gestión de configuraciones...');
  const modal = document.getElementById('manageDashboardConfigModal');
  const closeBtn = document.getElementById('closeManageDashboardConfigBtn');
  const listDiv = document.getElementById('dashboardConfigsList');
  const newNameInput = document.getElementById('newDashboardConfigName');
  const saveNewBtn = document.getElementById('saveNewDashboardConfigBtn');
  if (!modal || !closeBtn || !listDiv || !newNameInput || !saveNewBtn) {
    console.error('No se encontraron los elementos del modal de gestión de configuraciones');
    return;
  }
  function renderList() {
    const configs = getAllDashboardConfigs();
    const current = getDashboardConfig();
    if (Object.keys(configs).length === 0) {
      listDiv.innerHTML = '<div style="color:#888;font-style:italic;">No configs saved.</div>';
      return;
    }
    let html = '<ul style="list-style:none;padding:0;">';
    Object.entries(configs).forEach(([name, cfg]) => {
      html += `<li style='display:flex;align-items:center;gap:0.5em;margin-bottom:0.4em;'>
        <span style='flex:1;font-family:monospace;'>${name}</span>
        <button class='modal-btn secondary' data-load='${name}' style='padding:0.2em 0.7em;font-size:0.95em;'>Load</button>
        <button class='modal-btn' data-rename='${name}' style='padding:0.2em 0.7em;font-size:0.95em;'>Rename</button>
        <button class='modal-btn danger' data-delete='${name}' style='padding:0.2em 0.7em;font-size:0.95em;'>Delete</button>
      </li>`;
    });
    html += '</ul>';
    listDiv.innerHTML = html;
    // Listeners
    listDiv.querySelectorAll('[data-load]').forEach(btn => {
      btn.onclick = () => {
        const name = btn.getAttribute('data-load');
        const configs = getAllDashboardConfigs();
        if (configs[name]) {
          saveDashboardConfig(configs[name]);
          showNotification('Dashboard config loaded.', 'success');
        }
      };
    });
    listDiv.querySelectorAll('[data-delete]').forEach(btn => {
      btn.onclick = () => {
        const name = btn.getAttribute('data-delete');
        if (confirm(`Delete config '${name}'?`)) {
          const configs = getAllDashboardConfigs();
          delete configs[name];
          saveAllDashboardConfigs(configs);
          renderList();
        }
      };
    });
    listDiv.querySelectorAll('[data-rename]').forEach(btn => {
      btn.onclick = () => {
        const name = btn.getAttribute('data-rename');
        const newName = prompt('New name:', name);
        if (newName && newName !== name) {
          const configs = getAllDashboardConfigs();
          if (configs[newName]) {
            alert('A config with that name already exists.');
            return;
          }
          configs[newName] = configs[name];
          delete configs[name];
          saveAllDashboardConfigs(configs);
          renderList();
        }
      };
    });
  }
  renderList();
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  closeBtn.onclick = () => {
    modal.classList.add('hidden');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
  };
  saveNewBtn.onclick = () => {
    const name = newNameInput.value.trim();
    if (!name) return;
    const configs = getAllDashboardConfigs();
    if (configs[name]) {
      alert('A config with that name already exists.');
      return;
    }
    configs[name] = getDashboardConfig();
    saveAllDashboardConfigs(configs);
    newNameInput.value = '';
    renderList();
  };
}

// Helper function to detect which hub is currently active
function getCurrentHubType() {
  const dqDashboardModal = document.getElementById('dqDashboardModal');
  const dashboardModal = document.getElementById('dashboardModal');
  
  if (dqDashboardModal && !dqDashboardModal.classList.contains('hidden')) {
    return 'dq';
  } else if (dashboardModal && !dashboardModal.classList.contains('hidden')) {
    return 'ops';
  }
  
  return 'ops'; // default
}

// Quick Actions functionality
function setupQuickActions() {
  const quickFiltersGrid = document.querySelector('.quickfilters-grid');
  const addQuickFilterBtn = document.getElementById('addQuickFilterBtn');
  const savedFiltersList = document.querySelector('.saved-filters-list');

  if (!quickFiltersGrid || !addQuickFilterBtn || !savedFiltersList) return;

  // Handle predefined quick actions
  quickFiltersGrid.addEventListener('click', (e) => {
    const button = e.target.closest('.quickfilter-btn');
    if (!button) return;

    const action = button.dataset.action;
    if (!action) return;

    switch (action) {
      case 'pending':
        setModuleFilterValues({ status: ['Pending'] });
        break;
      case 'today':
        const today = new Date().toISOString().split('T')[0];
        setModuleFilterValues({ 
          date_start: today,
          date_end: today
        });
        break;
      case 'terminal':
        setModuleFilterValues({ location: ['Terminal'] });
        break;
      case 'changes':
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        setModuleFilterValues({
          modified_date_start: lastWeek.toISOString().split('T')[0]
        });
        break;
    }

    applyFilters();
    renderActiveFiltersSummaryChips();
  });

  // Add new quick filter
  addQuickFilterBtn.addEventListener('click', () => {
    // Check if user can modify data (admin only)
    if (typeof canUserModifyData === 'function' && !canUserModifyData()) {
      if (typeof window.showUnifiedNotification === 'function') {
        window.showUnifiedNotification('Only administrators can save quick filters', 'warning');
      }
      return;
    }
    
    const name = prompt('Enter a name for this quick filter:');
    if (!name) return;

    const currentFilters = getModuleFilterValues();
    if (Object.keys(currentFilters).length === 0) {
      if (typeof window.showUnifiedNotification === 'function') {
        window.showUnifiedNotification('Please set up some filters first before saving as a quick filter.', 'warning');
      }
      return;
    }

    // Detect which hub is currently active
    const hubType = getCurrentHubType();
    
    saveQuickFilter(name, null, null, null, hubType);
    renderSavedFilters();
  });

  // Render saved filters
  function renderSavedFilters() {
    const quickFilters = loadQuickFilters();
    savedFiltersList.innerHTML = '';

    // Detect which hub is currently active
    const hubType = getCurrentHubType();

    // Filter quick filters by hub type
    const filteredQuickFilters = Object.entries(quickFilters).filter(([name, filter]) => {
      // For backward compatibility: if hubType is not defined, consider it as 'ops'
      const filterHubType = filter.hubType || 'ops';
      return filterHubType === hubType;
    });

    filteredQuickFilters.forEach(([name, filter]) => {
      const item = document.createElement('div');
      item.className = 'saved-filter-item';
      item.innerHTML = `
        <span>${name}</span>
        <button class="delete-btn" title="Delete filter">×</button>
      `;

      // Apply filter
      item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete-btn')) {
          applyQuickFilter(name);
        }
      });

      // Delete filter
      const deleteBtn = item.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Check if user can modify data (admin only)
        if (typeof canUserModifyData === 'function' && !canUserModifyData()) {
          if (typeof window.showUnifiedNotification === 'function') {
            window.showUnifiedNotification('Only administrators can delete quick filters', 'warning');
          }
          return;
        }
        
        if (confirm(`Delete quick filter "${name}"?`)) {
          deleteQuickFilter(name);
          renderSavedFilters();
        }
      });

      savedFiltersList.appendChild(item);
    });
  }

  // Initial render
  renderSavedFilters();
}

// Removed duplicate event listener - handled in main dashboard setup 

// --- BARRA DE TARJETAS DE FILTROS ACUMULATIVOS EN OPS HUB ---
function renderOpsHubFilterChips() {
  const urgencyCardsContainer = document.querySelector('#dashboardModal .urgency-cards-container');
  if (!urgencyCardsContainer) return;
  
  // Limpiar contenedor
  urgencyCardsContainer.innerHTML = '';
  
  // Define tarjetas de urgencia
  const urgencyCards = [
    { label: 'Critical', key: 'Urgente', color: '#ffcdd2' },
    { label: 'Warning', key: 'Media', color: '#fff9c4' },
    { label: 'Good', key: 'Baja', color: '#c8e6c9' }
  ];
  
  // Carga quick filters guardados (solo del Ops Hub)
  let quickFilters = {};
  try {
    const allQuickFilters = JSON.parse(localStorage.getItem('quickFilters')) || {};
    // Filter only Ops Hub filters
    quickFilters = Object.entries(allQuickFilters)
      .filter(([name, filter]) => {
        // For backward compatibility: if hubType is not defined, consider it as 'ops'
        const filterHubType = filter.hubType || 'ops';
        return filterHubType === 'ops';
      })
      .reduce((acc, [name, filter]) => {
        acc[name] = filter;
        return acc;
      }, {});
  } catch { quickFilters = {}; }

  // Estado global de tarjetas activas
  if (!window.activeUrgencyCards) window.activeUrgencyCards = [];

  // Helper para calcular el número de registros si se añade una card
  function getPreviewCount(cardKey) {
    const data = getOriginalData();
    console.log('DEBUG - getPreviewCount for card:', cardKey);
    console.log('DEBUG - Original data length:', data?.length);
    
    if (!data || !data.length) return 0;
    const quickFiltersObj = quickFilters;
    // Si la card está activa, usa solo las activas
    const isActive = window.activeUrgencyCards.includes(cardKey);
    const previewCards = isActive
      ? window.activeUrgencyCards
      : [...window.activeUrgencyCards, cardKey];
    
    console.log('DEBUG - Active cards:', window.activeUrgencyCards);
    console.log('DEBUG - Preview cards:', previewCards);
    
    let combinedFilterValues = {};
    let combinedActiveFilters = {};
    previewCards.forEach(key => {
      const entry = Object.entries(quickFiltersObj).find(([name, obj]) => obj.linkedUrgencyCard === key);
      console.log('DEBUG - Found filter entry for card', key, ':', entry);
      
      if (entry) {
        const [, filterObj] = entry;
        console.log('DEBUG - Filter object:', filterObj);
        
        for (const k in filterObj.filterValues) {
          const value = filterObj.filterValues[k];
          if (combinedFilterValues[k]) {
            // Combinar valores de filtros de forma correcta (intersección)
            if (Array.isArray(combinedFilterValues[k]) && Array.isArray(value)) {
              // Si ambos son arrays, hacer intersección (valores comunes)
              const intersection = combinedFilterValues[k].filter(v => value.includes(v));
              combinedFilterValues[k] = intersection.length > 0 ? intersection : value;
            } else if (Array.isArray(combinedFilterValues[k])) {
              // Si solo el actual es array, verificar si el valor está incluido
              if (!combinedFilterValues[k].includes(value)) {
                combinedFilterValues[k] = []; // No hay intersección
              }
            } else if (Array.isArray(value)) {
              // Si solo el nuevo es array, verificar si el valor actual está incluido
              if (!value.includes(combinedFilterValues[k])) {
                combinedFilterValues[k] = []; // No hay intersección
              } else {
                combinedFilterValues[k] = combinedFilterValues[k]; // Mantener el valor actual
              }
            } else {
              // Si ambos son valores simples, deben ser iguales
              if (combinedFilterValues[k] !== value) {
                combinedFilterValues[k] = []; // No hay intersección
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
    
    console.log('DEBUG - Combined filter values:', combinedFilterValues);
    console.log('DEBUG - Combined active filters:', combinedActiveFilters);
    
    // Filtra los datos
    const filteredData = data.filter(row => {
      return Object.entries(combinedFilterValues).every(([key, value]) => {
        // Soporte para filtros de fecha con _start y _end
        if (key.endsWith('_start') || key.endsWith('_end')) {
          const baseKey = key.replace(/_(start|end)$/, '');
          const cellValue = row[baseKey];
          // Si el filtro es empty y no hay valor, cuenta como válido
          if ((cellValue === '' || cellValue === null || cellValue === undefined) && (combinedFilterValues[`${baseKey}_empty`] || value === '__EMPTY__')) {
            return true;
          }
          // Si no hay valor y no se busca empty, no cuenta
          if (!cellValue) return false;
          // Parsear fechas (soporta __TODAY__ y formatos flexibles)
          let filterDate = value;
          let cellDate = cellValue;
          if (typeof resolveDynamicDateExpr === 'function') {
            filterDate = resolveDynamicDateExpr(value);
          }
          const filterD = typeof parseFlexibleDate === 'function' ? parseFlexibleDate(filterDate) : new Date(filterDate);
          const cellD = typeof parseFlexibleDate === 'function' ? parseFlexibleDate(cellDate) : new Date(cellDate);
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
          // Si incluye __EMPTY__, cuenta también vacíos/null/undefined
          if (value.includes('__EMPTY__')) {
            return value.includes(row[key]) || row[key] === '' || row[key] === null || row[key] === undefined;
          }
          return value.includes(row[key]);
        }
        // Si el valor es __EMPTY__, cuenta vacíos/null/undefined
        if (value === '__EMPTY__') {
          return row[key] === '' || row[key] === null || row[key] === undefined;
        }
        return row[key] === value;
      });
    });
    
    console.log('DEBUG - Filtered data length:', filteredData.length);
    console.log('DEBUG - First few filtered rows:', filteredData.slice(0, 3));
    
    return filteredData.length;
  }

  urgencyCards.forEach(card => {
    const btn = document.createElement('button');
    btn.textContent = card.label;
    btn.className = 'dq-hub-chip';
    
    // ⚠️ IMPORTANTE: Agregar data-urgency para mantener colores tipo semáforo
    btn.setAttribute('data-urgency', card.key);
    
    const isActive = window.activeUrgencyCards.includes(card.key);
    
    // Busca filtro asociado
    const filterEntry = Object.entries(quickFilters).find(([name, obj]) => obj.linkedUrgencyCard === card.key);
    
    // Comprobar compatibilidad de columnas
    let compatible = false;
    if (filterEntry) {
      const filterObj = filterEntry[1];
      const currentHeaders = Object.keys(getOriginalData()[0] || {});
      const savedHeaders = filterObj.headers || [];
      const currentSet = new Set(currentHeaders);
      const savedSet = new Set(savedHeaders);
      compatible = currentSet.size === savedSet.size && [...currentSet].every(col => savedSet.has(col));
    }

    // ⚠️ MODIFICADO: NO aplicar estilos inline que sobrescriban los colores semáforo
    // Los colores se manejan ahora vía CSS y JavaScript automático
    if (isActive) {
      btn.classList.add('active');
      btn.innerHTML = card.label;
    } else {
      btn.classList.remove('active');
      btn.innerHTML = card.label;
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

    // Always allow clicks, but show visual feedback for incompatible cards
    if (!filterEntry) {
      btn.style.opacity = '0.5';
      btn.style.cursor = 'pointer';
      btn.title = 'No quick filter associated. Save one from the filters module.';
    } else if (!compatible) {
      btn.style.opacity = '0.5';
      btn.style.cursor = 'pointer';
      btn.title = 'This quick filter cannot be applied to the current CSV.';
    } else {
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.title = '';
    }

    // Mostrar número de registros
    if (filterEntry && compatible) {
      const countSpan = document.createElement('span');
      countSpan.style.display = 'none'; // Ocultar el número de registros
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

    // Always allow clicks and show appropriate notifications
    btn.onclick = () => {
      console.log('🔔 Ops Hub urgency card clicked:', card.label, 'compatible:', compatible);
      
      // Check compatibility first
      if (!compatible) {
        // Show incompatibility notification
        if (typeof window.showUnifiedNotification === 'function') {
          window.showUnifiedNotification(`This urgency card "${card.label}" cannot be applied to the current CSV.`, 'error');
        }
        return;
      }
      
      // Alterna la tarjeta en el array global
      if (isActive) {
        window.activeUrgencyCards = window.activeUrgencyCards.filter(k => k !== card.key);
        // Show notification for deactivated urgency card
        if (typeof window.showUnifiedNotification === 'function') {
          window.showUnifiedNotification(`Urgency card "${card.label}" deactivated!`, 'info');
        }
      } else {
        window.activeUrgencyCards.push(card.key);
        // Show notification for activated urgency card
        if (typeof window.showUnifiedNotification === 'function') {
          window.showUnifiedNotification(`Urgency card "${card.label}" activated!`, 'success');
      }
      }
      
      // Re-renderiza los chips y aplica los filtros acumulativos
      renderOpsHubFilterChips();
      applyOpsHubQuickFilters();
    };
    urgencyCardsContainer.appendChild(btn);
  });
  
  // 🎯 Disparar evento para que el script de colores se ejecute
  setTimeout(() => {
    document.dispatchEvent(new CustomEvent('opsHubRendered'));
  }, 50);
}

function applyOpsHubQuickFilters() {
  const data = getOriginalData();
  if (!data || !data.length) {
    displayTable([]);
    return;
  }
  // Load only Ops Hub quick filters
  const allQuickFilters = JSON.parse(localStorage.getItem('quickFilters')) || {};
  const quickFiltersObj = Object.entries(allQuickFilters)
    .filter(([name, filter]) => {
      // For backward compatibility: if hubType is not defined, consider it as 'ops'
      const filterHubType = filter.hubType || 'ops';
      return filterHubType === 'ops';
    })
    .reduce((acc, [name, filter]) => {
      acc[name] = filter;
      return acc;
    }, {});
  // Obtener quick filters activos del dashboard y de urgencia
  const activeUrgencyCards = window.activeUrgencyCards || [];
  const activeDashboardQuickFilters = window.activeDashboardQuickFilters || [];
  // Unir ambos arrays de nombres de quick filters (urgency usa linkedUrgencyCard)
  let combinedFilterValues = {};
  let combinedActiveFilters = {};
  // Primero, aplicar los quick filters del dashboard
  activeDashboardQuickFilters.forEach(name => {
    const filterObj = quickFiltersObj[name];
    if (filterObj) {
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
  // Luego, aplicar los quick filters de urgencia (pueden combinarse)
  activeUrgencyCards.forEach(cardKey => {
    const entry = Object.entries(quickFiltersObj).find(([name, obj]) => obj.linkedUrgencyCard === cardKey);
    if (entry) {
      const [, filterObj] = entry;
      for (const key in filterObj.filterValues) {
        const value = filterObj.filterValues[key];
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
  });
  // Guardar el estado actual del dashboard
  const dashboardPanel = document.getElementById('dashboardModal');
  const wasVisible = dashboardPanel && !dashboardPanel.classList.contains('hidden');
  // Aplicar los filtros
  setModuleFilterValues(combinedFilterValues);
  setModuleActiveFilters(combinedActiveFilters);
  // Aplicar filtros sin cerrar el modal
  const filteredData = getFilteredData();
  displayTable(filteredData);
  renderActiveFiltersSummaryChips();
  
  // Mostrar popup de resumen de filtros
  showOpsHubFilterSummary(data.length, filteredData.length, combinedActiveFilters);
  
  // 🎯 DISPARAR EVENTO PARA ANALYTICS DASHBOARD
  // Notificar al Analytics Dashboard que los filtros han cambiado
  if (window.analyticsDashboard && window.analyticsDashboard.isOpen()) {
    console.log('🔄 Triggering analytics update from Ops Hub filters...');
    setTimeout(() => {
      window.analyticsDashboard.onQuickFiltersChanged();
    }, 100);
  }
  
  // También disparar eventos globales para otros componentes
  window.dispatchEvent(new CustomEvent('filtersChanged', { 
    detail: { 
      activeQuickFilters: activeDashboardQuickFilters,
      activeUrgencyCards: activeUrgencyCards 
    } 
  }));
  
  // Restaurar el estado del dashboard si estaba visible
  if (wasVisible && dashboardPanel) {
    dashboardPanel.classList.remove('hidden');
  }
}

// --- COLOREADO DE FILAS EN LA TABLA PRINCIPAL SEGÚN URGENCIA ---
// (Eliminada la función local colorRowsByUrgencia, se usará la importada)
// ... existing code ...

// --- INICIALIZACIÓN EN EL OPS HUB ---
function setupOpsHubFilters() {
  // Limpiar y resetear todo el estado y DOM de filtros
  if (typeof resetFilterManager === 'function') {
    resetFilterManager();
  }
  // Regenerar el sidebar/modal de filtros limpio
  if (typeof generateFilterSidebar === 'function') {
    generateFilterSidebar(getCurrentHeaders());
  }
  // Renderizar los chips del Ops Hub
  renderOpsHubFilterChips();
  // Aplicar los filtros del Ops Hub
  applyOpsHubQuickFilters();
}

if (dashboardBtn) {
  dashboardBtn.addEventListener('click', () => {
    setTimeout(() => {
      setupOpsHubFilters();
      renderOpsHubFilterChips();
    }, 200);
  });
}

// Ensure Ops Hub button opens dashboard - Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  const dashboardToggleBtn = document.getElementById('dashboardToggleBtn');
  const dashboardModal = document.getElementById('dashboardModal');

  console.log('Dashboard setup (DOM ready):', { dashboardToggleBtn, dashboardModal });

  if (dashboardToggleBtn && dashboardModal) {
    // Remove any existing event listeners
    dashboardToggleBtn.onclick = null;
    
    dashboardToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Dashboard button clicked, opening modal...');
      
      // Remove hidden class and verify
      dashboardModal.classList.remove('hidden');
      console.log('Modal classes after opening:', dashboardModal.className);
      console.log('Modal display style:', window.getComputedStyle(dashboardModal).display);
      console.log('Modal visibility:', window.getComputedStyle(dashboardModal).visibility);
      
      // Execute all necessary setup functions
      setTimeout(() => {
        setupQuickActions();
        renderDashboardQuickFilters();
        if (typeof renderDashboardCharts === 'function') {
          renderDashboardCharts();
        }
        if (typeof updateDashboardKpis === 'function') {
          // updateDashboardKpis(); // KPIs section removed
        }
      }, 100);
    });
    
    console.log('Dashboard event listener attached successfully');
  } else {
    console.error('Dashboard elements not found:', { dashboardToggleBtn, dashboardModal });
  }
});

// Ensure dashboard close button works
const dashboardCloseBtn = document.getElementById('dashboardCloseBtn');
const dashboardModal = document.getElementById('dashboardModal');
if (dashboardCloseBtn && dashboardModal) {
  dashboardCloseBtn.onclick = () => {
    dashboardModal.classList.add('hidden');
  };
}

// Close modal when clicking outside
if (dashboardModal) {
  dashboardModal.onclick = (e) => {
    if (e.target === dashboardModal) {
      dashboardModal.classList.add('hidden');
    }
  };
}

// Hide dashboardModal when clicking or focusing outside
function handleDashboardPanelBlur(e) {
  if (!dashboardModal || dashboardModal.classList.contains('hidden')) return;
  
  // No cerrar si el clic fue en un quick card, en el panel de filtros, o en el popup de Ops Hub
  const isQuickCard = e.target.closest('.ops-hub-chip');
  const isFilterPanel = e.target.closest('.filter-panel');
  const isOpsHubPopup = e.target.closest('.ops-hub-filter-popup');
  
  // NO cerrar si el clic fue en el modal de copia o sus elementos
  const isCopyModal = e.target.closest('#copyOptionsModal');
  const isCopyModalContent = e.target.closest('#copyOptionsModal .modal-panel');
  
  // NO cerrar si el clic fue en una notificación
  const isNotification = e.target.closest('#tableNotification');
  const isNotificationContent = e.target.closest('.notification-content');
  
  // NO cerrar si el clic fue en cualquier otro modal que no debería cerrar el dashboard
  const isOtherModal = e.target.closest('.modal-overlay:not(#dashboardModal)');
  const isOtherModalContent = e.target.closest('.modal-panel');
  
  if (isQuickCard || isFilterPanel || isOpsHubPopup || isCopyModal || isCopyModalContent || 
      isNotification || isNotificationContent || isOtherModal || isOtherModalContent) {
    return;
  }
  
  if (!dashboardModal.contains(e.target) && e.target.id !== 'dashboardToggleBtn') {
    dashboardModal.classList.add('hidden');
  }
}

// Añadir el evento de blur al documento
document.addEventListener('mousedown', handleDashboardPanelBlur);
document.addEventListener('focusin', handleDashboardPanelBlur);

// --- Renderiza los KPIs y luego los chips de urgencia ---
function renderDashboardKpisAndChips() {
  // KPIs section removed by user request
  // if (typeof renderDashboardKpis === 'function') {
  //   renderDashboardKpis();
  // }
  // Siempre renderiza los chips de urgencia después del título
  renderOpsHubFilterChips();
}

// --- Hook para renderizar los chips después de los KPIs y al abrir el dashboard ---
if (dashboardBtn) {
  dashboardBtn.addEventListener('click', () => {
    setTimeout(() => {
      setupOpsHubFilters();
      renderDashboardKpisAndChips();
    }, 200);
  });
}

// Si hay otras funciones que renderizan los KPIs, fuerza el render de los chips después
if (typeof renderDashboardQuickFilters === 'function') {
  const originalRenderDashboardQuickFilters = renderDashboardQuickFilters;
  window.renderDashboardQuickFilters = function() {
    originalRenderDashboardQuickFilters();
    renderOpsHubFilterChips();
  };
}

// --- Asegura que resolveDynamicDateExpr está definida globalmente ---
if (typeof resolveDynamicDateExpr !== 'function') {
  function resolveDynamicDateExpr(val) {
    if (val === '__TODAY__') {
      const d = new Date();
      return d.toISOString().slice(0, 10);
    }
    // Puedes agregar más expresiones dinámicas aquí si lo necesitas
    return val;
  }
}

function applyQuickFilter(name) {
  // Check if this is a duplicate detection quick filter
  const duplicateQuickFilters = JSON.parse(localStorage.getItem('duplicateQuickFilters') || '{}');
  const duplicateFilter = duplicateQuickFilters[name];
  
  if (duplicateFilter && duplicateFilter.type === 'duplicate_detection') {
    // Handle duplicate detection quick filter
    applyDuplicateDetectionQuickFilter(name, duplicateFilter);
    return;
  }
  
  // Detect which hub is currently active
  const isDqHub = document.querySelector('#dqDashboardModal:not(.hidden)');
  const isOpsHub = document.querySelector('#dashboardModal:not(.hidden)');
  
  let hubType;
  if (isDqHub) {
    hubType = 'dq';
  } else if (isOpsHub) {
    hubType = 'ops';
  } else {
    hubType = 'ops'; // Fallback
  }
  
  // Regular quick filter logic
  if (hubType === 'dq') {
    // For DQ Hub
    if (!window.activeDqDashboardQuickFilters) window.activeDqDashboardQuickFilters = [];
    if (!window.activeDqDashboardQuickFilters.includes(name)) {
      window.activeDqDashboardQuickFilters.push(name);
    }
    // Apply DQ Hub filters
    if (window.dqHubManager && typeof window.dqHubManager.applyDqCombinedFilters === 'function') {
      window.dqHubManager.applyDqCombinedFilters();
    }
  } else {
    // For Ops Hub
  if (!window.activeDashboardQuickFilters) window.activeDashboardQuickFilters = [];
  if (!window.activeDashboardQuickFilters.includes(name)) {
    window.activeDashboardQuickFilters.push(name);
  }
    // Apply Ops Hub filters
  applyOpsHubQuickFilters();
  }
  
  // Cierra el modal de filtros si está abierto
  const filterModal = document.getElementById('filterModal');
  const filterOverlay = document.getElementById('filterModalOverlay');
  if (filterModal && filterOverlay) {
    filterModal.classList.add('hidden');
    filterOverlay.classList.add('hidden');
    filterModal.style.display = 'none';
    filterOverlay.style.display = 'none';
    filterOverlay.classList.remove('visible');
    filterOverlay.classList.remove('blur');
    filterOverlay.style.backdropFilter = 'none';
  }
  
  // Show notification
  if (typeof window.showUnifiedNotification === 'function') {
    window.showUnifiedNotification(`Quick filter "${name}" applied successfully to ${hubType.toUpperCase()} Hub!`, 'success');
  }
}

function applyDuplicateDetectionQuickFilter(name, filterConfig) {
  try {
    console.log('Applying duplicate detection quick filter:', name, filterConfig);
    
    // Get current filtered data (not original data)
    const currentData = getFilteredData ? getFilteredData() : [];
    if (!currentData || currentData.length === 0) {
      showNotification('No data available for duplicate detection.', 'warning');
      return;
    }
    
    // Find duplicate records based on the configured columns
    const duplicateColumns = filterConfig.duplicateColumns || [];
    if (duplicateColumns.length === 0) {
      showNotification('No columns configured for duplicate detection.', 'warning');
      return;
    }
    
    // Find duplicates using the same logic as showDuplicates
    const duplicates = findDuplicateRecords(currentData, duplicateColumns);
    
    if (duplicates.length === 0) {
      showNotification('No duplicates found with the current configuration.', 'info');
      return;
    }
    
    // Apply duplicates as a filter to the main table (no analysis panel)
    applyDuplicatesAsFilter(duplicates, duplicateColumns, name, false);
    
    // Show notification
    if (typeof window.showUnifiedNotification === 'function') {
      window.showUnifiedNotification(`Applied duplicate filter: ${duplicates.length} duplicate records found.`, 'success');
    }
    
  } catch (error) {
    console.error('Error applying duplicate detection quick filter:', error);
    showNotification('Error applying duplicate detection filter.', 'error');
  }
}

function applyDuplicatesAsFilter(duplicates, duplicateColumns, filterName, showAnalysisPanel = false) {
  try {
    // Get the current filtered data (this preserves other active filters)
    const currentData = window.getFilteredData ? window.getFilteredData() : [];
    const originalData = window.getOriginalData ? window.getOriginalData() : [];
    
    console.log('🔍 Data check:', {
      currentDataLength: currentData ? currentData.length : 0,
      originalDataLength: originalData ? originalData.length : 0,
      hasGetFilteredData: typeof window.getFilteredData === 'function',
      hasGetOriginalData: typeof window.getOriginalData === 'function'
    });
    
    if (!currentData || !currentData.length) {
      console.error('No current data available');
      return;
    }
    
    if (!originalData || !originalData.length) {
      console.error('No original data available');
      return;
    }
    
    // Create a set of duplicate row indices for fast lookup
    const duplicateIndices = new Set();
    duplicates.forEach(row => {
      if (row._originalIndex !== undefined) {
        duplicateIndices.add(row._originalIndex);
      }
    });
    
    // Add duplicate filter to active filters (like a normal filter)
    const duplicateFilter = {
      type: 'duplicate',
      columns: duplicateColumns,
      name: filterName,
      duplicateIndices: duplicateIndices
    };
    
    // Add to active filters
    if (typeof setActiveFilters === 'function') {
      const currentActiveFilters = window.getActiveFilters ? window.getActiveFilters() : [];
      setActiveFilters([...currentActiveFilters, duplicateFilter]);
      console.log('✅ Duplicate filter added to active filters');
    }
    
    // ALSO set the global duplicate filter for the FilterManager
    window.activeDuplicateFilter = {
      name: filterName,
      duplicateColumns: duplicateColumns,
      duplicateKeys: new Set(duplicates.map(row => {
        const rowKey = duplicateColumns.map(col => row[col] || '').join('|');
        return rowKey;
      }))
    };
    console.log('✅ Global duplicate filter set for FilterManager');
    
    // Apply the filter (this will call applyFilters internally)
    if (typeof applyFilters === 'function') {
      applyFilters();
    }
    
    // Update the active filters summary to show the duplicate filter
    const activeFiltersSummary = document.getElementById('activeFiltersSummary');
    console.log('🔍 Looking for activeFiltersSummary:', activeFiltersSummary);
    if (activeFiltersSummary) {
      console.log('✅ Found activeFiltersSummary, creating chip');
      
      // Remove any existing duplicate filter chip first
      const existingChip = activeFiltersSummary.querySelector('.duplicate-filter-chip');
      if (existingChip) {
        existingChip.remove();
      }
      
      const duplicateFilterChip = document.createElement('div');
      duplicateFilterChip.className = 'filter-tag duplicate-filter-chip';
      duplicateFilterChip.style.cssText = `
        background: #1a2332 !important;
        border: 1.5px solid #10B981 !important;
        color: #10B981 !important;
        padding: 4px 8px !important;
        border-radius: 4px !important;
        margin: 2px !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        font-size: 12px !important;
        font-weight: 500 !important;
      `;
      
      duplicateFilterChip.innerHTML = `
        <span>Duplicates: ${duplicateColumns.join(', ')}</span>
        <button onclick="removeDuplicateFilter()" class="filter-tag-remove" style="
          background: none !important;
          border: none !important;
          color: #10B981 !important;
          cursor: pointer !important;
          font-size: 14px !important;
          font-weight: bold !important;
          padding: 0 !important;
          margin-left: 4px !important;
        ">×</button>
      `;
      
      activeFiltersSummary.appendChild(duplicateFilterChip);
      console.log('✅ Duplicate filter chip added to activeFiltersSummary');
      
      // Make sure the active filters summary is visible
      activeFiltersSummary.style.display = 'flex';
      activeFiltersSummary.style.visibility = 'visible';
      activeFiltersSummary.style.opacity = '1';
    } else {
      console.error('❌ activeFiltersSummary not found!');
    }
    
    // Show analysis panel only if requested (for analysis tabs, not for simple filters)
    if (showAnalysisPanel) {
      // Analyze differences for the analysis panel
      const differences = findDuplicateRecordsWithDifferences(originalData, duplicateColumns);
      
      // Create analysis info
      const analysisInfo = {
        data: duplicates,
        duplicateColumns: duplicateColumns,
        differences: differences,
        filterName: filterName
      };
      
      // Add the analysis panel
      setTimeout(() => {
        addDuplicateAnalysisPanel(analysisInfo);
      }, 200);
    }
    
    // Show notification
    showNotification(`Applied duplicate filter: ${duplicates.length} duplicate records shown.`, 'success');
    
  } catch (error) {
    console.error('Error applying duplicates as filter:', error);
    showNotification('Error applying duplicate filter to main table.', 'error');
  }
}

// Function to remove duplicate filter and restore previous filter state
window.removeDuplicateFilter = function() {
  try {
    // Remove the duplicate filter from active filters
    if (typeof setActiveFilters === 'function') {
      const currentActiveFilters = window.getActiveFilters ? window.getActiveFilters() : [];
      const filteredActiveFilters = currentActiveFilters.filter(filter => filter.type !== 'duplicate');
      setActiveFilters(filteredActiveFilters);
      console.log('✅ Duplicate filter removed from active filters');
    }
    
    // ALSO clear the global duplicate filter for the FilterManager
    window.activeDuplicateFilter = null;
    console.log('✅ Global duplicate filter cleared for FilterManager');
    
    // Reapply all filters to restore the previous state
    if (typeof applyFilters === 'function') {
      console.log('🔄 Reapplying filters after removing duplicate filter');
      applyFilters();
    }
    
    // Remove the duplicate filter chip
    const activeFiltersSummary = document.getElementById('activeFiltersSummary');
    if (activeFiltersSummary) {
      const duplicateChip = activeFiltersSummary.querySelector('.duplicate-filter-chip');
      if (duplicateChip) {
        duplicateChip.remove();
        console.log('✅ Duplicate filter chip removed');
      } else {
        console.log('⚠️ No duplicate filter chip found to remove');
      }
    }
    
    // Show notification
    showNotification('Duplicate filter removed. Other filters maintained.', 'success');
    
    // Debug: Log the final state
    setTimeout(() => {
      const finalData = window.getFilteredData ? window.getFilteredData() : [];
      const finalOriginal = window.getOriginalData ? window.getOriginalData() : [];
      console.log('🔍 Final state after removal:', {
        finalDataLength: finalData.length,
        finalOriginalLength: finalOriginal.length
      });
    }, 100);
    
  } catch (error) {
    console.error('Error removing duplicate filter:', error);
    showNotification('Error removing duplicate filter.', 'error');
  }
};

// Function to create duplicate analysis page HTML
function createDuplicateAnalysisPage(data, duplicateColumns, differences, filterName) {
  const columns = Object.keys(data[0] || {});
  const differencesList = differences.differences;
  
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Duplicate Analysis: ${filterName}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 20px;
          background: #f5f5f5;
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .header p {
          margin: 10px 0 0 0;
          opacity: 0.9;
        }
        .controls {
          padding: 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          gap: 15px;
          align-items: center;
          flex-wrap: wrap;
        }
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary {
          background: #007bff;
          color: white;
        }
        .btn-primary:hover {
          background: #0056b3;
        }
        .btn-success {
          background: #28a745;
          color: white;
        }
        .btn-success:hover {
          background: #1e7e34;
        }
        .btn-warning {
          background: #ffc107;
          color: #212529;
        }
        .btn-warning:hover {
          background: #e0a800;
        }
        .btn-info {
          background: #17a2b8;
          color: white;
        }
        .btn-info:hover {
          background: #117a8b;
        }
        .table-container {
          overflow-x: auto;
          padding: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        th, td {
          padding: 12px 8px;
          text-align: left;
          border-bottom: 1px solid #dee2e6;
        }
        th {
          background: #f8f9fa;
          font-weight: 600;
          color: #495057;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        tr:hover {
          background: #f8f9fa;
        }
        .duplicate-column {
          background: #fff3cd !important;
          color: #856404 !important;
          font-weight: 600;
        }
        .different-value {
          background: #ffebee !important;
          color: #c62828 !important;
          font-weight: bold !important;
          border-left: 3px solid #c62828 !important;
        }
        .duplicate-column.different-value {
          background: #ffebee !important;
          color: #c62828 !important;
        }
        .summary {
          padding: 20px;
          background: #e3f2fd;
          border-bottom: 1px solid #bbdefb;
        }
        .summary h3 {
          margin: 0 0 15px 0;
          color: #1976d2;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        .summary-item {
          background: white;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #1976d2;
        }
        .summary-item h4 {
          margin: 0 0 8px 0;
          color: #1976d2;
          font-size: 14px;
        }
        .summary-item p {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        .differences-panel {
          padding: 20px;
          background: #fff3cd;
          border-bottom: 1px solid #ffeaa7;
          display: none;
        }
        .differences-panel.show {
          display: block;
        }
        .differences-panel h3 {
          margin: 0 0 15px 0;
          color: #856404;
        }
        .difference-group {
          background: white;
          margin: 10px 0;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #ffc107;
        }
        .difference-group h4 {
          margin: 0 0 10px 0;
          color: #856404;
        }
        .difference-columns {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .difference-column {
          background: #ffebee;
          color: #c62828;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }
        .loading {
          text-align: center;
          padding: 40px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔍 Duplicate Analysis</h1>
          <p>${filterName} - ${data.length} duplicate records found</p>
        </div>
        
        <div class="summary">
          <h3>📊 Summary</h3>
          <div class="summary-grid">
            <div class="summary-item">
              <h4>Total Duplicates</h4>
              <p>${data.length}</p>
            </div>
            <div class="summary-item">
              <h4>Duplicate Groups</h4>
              <p>${differencesList.length}</p>
            </div>
            <div class="summary-item">
              <h4>Columns Analyzed</h4>
              <p>${duplicateColumns.length}</p>
            </div>
            <div class="summary-item">
              <h4>Groups with Differences</h4>
              <p>${differencesList.filter(([key, diffObj]) => Object.keys(diffObj).length > 0).length}</p>
            </div>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" onclick="copyToClipboard()">📋 Copy to Clipboard</button>
          <button class="btn btn-success" onclick="exportToExcel()">📊 Export to Excel</button>
          <button class="btn btn-warning" onclick="toggleDifferences()">🔍 Analyze Differences</button>
          <button class="btn btn-info" onclick="window.print()">🖨️ Print</button>
        </div>
        
        <div class="differences-panel" id="differencesPanel">
          <h3>🔍 Differences Analysis</h3>
          ${differencesList.map(([key, diffObj]) => {
            const diffColumns = Object.keys(diffObj);
            if (diffColumns.length === 0) return '';
            return `
              <div class="difference-group">
                <h4>Duplicate Group: ${key}</h4>
                <p><strong>Different columns:</strong></p>
                <div class="difference-columns">
                  ${diffColumns.map(col => `<span class="difference-column">${col}</span>`).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
        
        <div class="table-container">
          <table>
            <thead>
              <tr>
                ${columns.map(col => {
                  const isDuplicateCol = duplicateColumns.includes(col);
                  const hasDifferences = differencesList.some(([key, diffObj]) => diffObj[col]);
                  let className = '';
                  if (hasDifferences) {
                    className = 'duplicate-column different-value';
                  } else if (isDuplicateCol) {
                    className = 'duplicate-column';
                  }
                  return `<th class="${className}">${col}</th>`;
                }).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  ${columns.map(col => {
                    const isDuplicateCol = duplicateColumns.includes(col);
                    const rowKey = duplicateColumns.map(c => row[c]).join('|');
                    const differences = differencesList.find(([key, diffObj]) => key === rowKey);
                    const hasDiff = differences && differences[1][col];
                    
                    let className = '';
                    if (hasDiff) {
                      className = 'different-value';
                    } else if (isDuplicateCol) {
                      className = 'duplicate-column';
                    }
                    
                    return `<td class="${className}">${row[col] || ''}</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      
      <script>
        function toggleDifferences() {
          const panel = document.getElementById('differencesPanel');
          panel.classList.toggle('show');
        }
        
        function copyToClipboard() {
          const table = document.querySelector('table');
          const html = table.outerHTML;
          const text = Array.from(table.querySelectorAll('tr')).map(row => 
            Array.from(row.querySelectorAll('th, td')).map(cell => cell.textContent.trim()).join('\\t')
          ).join('\\n');
          
          navigator.clipboard.write([
            new ClipboardItem({
              'text/plain': new Blob([text], { type: 'text/plain' }),
              'text/html': new Blob([html], { type: 'text/html' })
            })
          ]).then(() => {
            alert('Table copied to clipboard!');
          }).catch(() => {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Table copied to clipboard!');
          });
        }
        
        function exportToExcel() {
          const table = document.querySelector('table');
          const html = table.outerHTML;
          const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'duplicate-analysis.xls';
          a.click();
          URL.revokeObjectURL(url);
        }
      </script>
    </body>
    </html>
  `;
  
  return html;
}

function addDuplicateTab(tabName, duplicateData, duplicateColumns) {
  // Add to main tabs
  mainTabs.forEach(tab => tab.active = false);
  mainTabs.push({
    name: tabName,
    type: 'duplicates',
    active: true,
    data: duplicateData,
    columns: duplicateColumns
  });
  
  // Render tabs
  renderMainTabsBar();
  
  // Display duplicate data
  displayTable(duplicateData);
  toggleElements('#tableContainer', 'show');
  
  // Add info about the duplicate detection
  const infoDiv = document.createElement('div');
  infoDiv.style.cssText = `
    background: rgba(255, 193, 7, 0.1);
    border: 1px solid #ffc107;
    border-radius: 6px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 0.9rem;
  `;
  infoDiv.innerHTML = `
    <strong>Duplicate Detection Results:</strong><br>
    • Total duplicate records: ${duplicateData.length.toLocaleString()}<br>
    • Fields used for detection: ${duplicateColumns.join(', ')}<br>
    • Records are considered duplicates when ALL selected fields match
  `;
  
  // Insert before table
  const tableContainer = document.getElementById('tableContainer');
  if (tableContainer) {
    tableContainer.insertBefore(infoDiv, tableContainer.firstChild);
  }
}

// --- Comparación: integración de vista dinámica ---
let comparisonViewCount = 0;
let comparisonViews = {};

window.addEventListener('comparisonResultsReady', (e) => {
  const data = e.detail.data;
  if (!Array.isArray(data) || !data.length) {
    showNotification('No comparison data to show.', 'warning');
    return;
  }
  comparisonViewCount++;
  const viewName = `Comparison #${comparisonViewCount}`;
  comparisonViews[viewName] = data;
  addComparisonViewToSelector(viewName);
  setComparisonViewActive(viewName);
});

function addComparisonViewToSelector(viewName) {
  const viewSelect = document.getElementById('viewSelect');
  if (!viewSelect) return;
  // Añade la opción si no existe
  if (!viewSelect.querySelector(`option[value="${viewName}"]`)) {
    const option = document.createElement('option');
    option.value = viewName;
    option.textContent = viewName + ' ✕';
    viewSelect.appendChild(option);
  }
}

function setComparisonViewActive(viewName) {
  const viewSelect = document.getElementById('viewSelect');
  if (!viewSelect) return;
  viewSelect.value = viewName;
  displayTable(comparisonViews[viewName]);
  toggleElements('#tableContainer', 'show');
}

// Permitir cerrar la vista de comparación al seleccionarla y pulsar de nuevo
const viewSelect = document.getElementById('viewSelect');
if (viewSelect) {
  viewSelect.addEventListener('change', (e) => {
    const selected = viewSelect.value;
    if (comparisonViews[selected]) {
      displayTable(comparisonViews[selected]);
      toggleElements('#tableContainer', 'show');
    } else {
      // Vista normal
      const filteredData = applyFilters();
      displayTable(filteredData);
    }
  });
  // Cerrar vista de comparación al hacer doble click en la opción
  viewSelect.addEventListener('dblclick', (e) => {
    const selected = viewSelect.value;
    if (comparisonViews[selected]) {
      // Elimina la opción
      const opt = viewSelect.querySelector(`option[value="${selected}"]`);
      if (opt) opt.remove();
      delete comparisonViews[selected];
      // Vuelve a la vista principal
      viewSelect.value = '__all__';
      const filteredData = applyFilters();
      displayTable(filteredData);
    }
  });
}

// --- Tabs visuales para vistas ---
let mainTabs = [{ name: 'Main', type: 'main', active: true }];
let comparisonTabCount = 0;
let comparisonTabData = {};
let originalStateBackup = null;

function renderMainTabsBar() {
  const bar = document.getElementById('mainTabsBar');
  if (!bar) return;
  bar.innerHTML = '';
  
  // Contenedor para las tabs (izquierda)
  const tabsContainer = document.createElement('div');
  tabsContainer.style.display = 'flex';
  tabsContainer.style.gap = '0.5em';
  tabsContainer.style.alignItems = 'center';
  tabsContainer.style.flex = '1';
  
  mainTabs.forEach(tab => {
    const tabBtn = document.createElement('button');
    tabBtn.className = 'main-tab-btn' + (tab.active ? ' active' : '');
    tabBtn.textContent = tab.name;
    tabBtn.style.padding = '0.18em 1.2em';
    tabBtn.style.borderRadius = '7px 7px 0 0';
    tabBtn.style.border = 'none';
    tabBtn.style.borderRadius = '0';
    tabBtn.style.borderBottom = tab.active ? '2.5px solid #47B2E5' : '2.5px solid transparent';
    tabBtn.style.boxShadow = tab.active ? '0 4px 16px #47B2E5' : 'none';
    tabBtn.style.fontWeight = tab.active ? '700' : '400';
    tabBtn.style.position = 'relative';
    tabBtn.style.cursor = 'pointer';
    tabBtn.onclick = () => activateMainTab(tab.name);
    // Botón de cerrar para tabs de comparación y duplicados
    if (tab.type === 'comparison') {
      const closeBtn = document.createElement('span');
      closeBtn.textContent = '✕';
      closeBtn.style.marginLeft = '0.7em';
      closeBtn.style.color = '#10B981'; // verde
      closeBtn.style.fontWeight = 'bold';
      closeBtn.style.cursor = 'pointer';
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        closeComparisonTab(tab.name);
      };
      tabBtn.appendChild(closeBtn);
    } else if (tab.type === 'duplicates') {
      const closeBtn = document.createElement('span');
      closeBtn.textContent = '✕';
      closeBtn.style.marginLeft = '0.7em';
      closeBtn.style.color = '#10B981'; // verde
      closeBtn.style.fontWeight = 'bold';
      closeBtn.style.cursor = 'pointer';
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        closeDuplicatesTab(tab.name);
      };
      tabBtn.appendChild(closeBtn);
    } else if (tab.type === 'editable') {
      const closeBtn = document.createElement('span');
      closeBtn.textContent = '✕';
      closeBtn.style.marginLeft = '0.7em';
      closeBtn.style.color = '#10B981'; // verde
      closeBtn.style.fontWeight = 'bold';
      closeBtn.style.cursor = 'pointer';
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        closeEditableTab(tab.name);
      };
      tabBtn.appendChild(closeBtn);
    }
    tabsContainer.appendChild(tabBtn);
  });
  
  // --- Botón Create Editable Tab ---
  // OCULTO: No mostrar el botón en producción
  /*
  const filters = getTableActiveFilters ? getTableActiveFilters() : {};
  const hasFilters = filters && Object.keys(filters).length > 0;
  const editableBtn = document.createElement('button');
  editableBtn.id = 'createEditableTabBtn';
  editableBtn.textContent = 'Create Editable Tab';
  editableBtn.className = 'brand-btn';
  editableBtn.style.marginLeft = '1em';
  editableBtn.style.fontWeight = '600';
  editableBtn.style.fontSize = '1em';
  editableBtn.style.display = 'none'; // SIEMPRE OCULTO
  editableBtn.onclick = () => {
    createEditableWorkspaceTab();
  };
  tabsContainer.appendChild(editableBtn);
  */
  // Contenedor para los chips de filtros (derecha)
  const filtersContainer = document.createElement('div');
  filtersContainer.id = 'activeFiltersSummary';
  filtersContainer.style.display = 'flex';
  filtersContainer.style.flexWrap = 'wrap';
  filtersContainer.style.gap = '0.3rem';
  filtersContainer.style.alignItems = 'center';
  filtersContainer.style.justifyContent = 'flex-end';
  filtersContainer.style.maxWidth = '60%';
  bar.appendChild(tabsContainer);
  bar.appendChild(filtersContainer);
  // Renderizar chips de filtros
  setTimeout(() => {
    if (typeof renderActiveFiltersSummaryChips === 'function') {
      renderActiveFiltersSummaryChips();
    }
  }, 0);
}

function activateMainTab(tabName) {
  mainTabs.forEach(tab => tab.active = (tab.name === tabName));
  renderMainTabsBar();
  if (tabName === 'Main') {
    // Clear original column order when returning to main tab
    window.originalColumnOrder = null;
    
    // LIMPIAR datos de análisis de duplicados para que no se apliquen colores especiales
    // PERO mantener los datos de filtros normales
    window.currentDuplicateDifferences = null;
    window.currentDuplicateColumns = null;
    window.duplicateAnalysisMode = false; // Flag para indicar si estamos en modo análisis
    
    // IMPORTANTE: NO limpiar los filtros de duplicados normales
    // Los filtros normales se manejan a través de activeFilters, no de estas variables
    
    // Restaurar estado original
    if (originalStateBackup) {
      setOriginalData(originalStateBackup.data);
      setCurrentHeaders(originalStateBackup.headers);
      setVisibleColumns(originalStateBackup.visibleColumns);
      resetFilterManager();
      filterManager = initializeFilterManager(originalStateBackup.data);
      initializeReportService();
      displayTable(originalStateBackup.data);
      toggleElements('#tableContainer', 'show');
      if (typeof updateViewSelect === 'function') updateViewSelect();
      if (typeof renderDashboardQuickFilters === 'function') renderDashboardQuickFilters();
      originalStateBackup = null;
    } else {
      const filteredData = applyFilters();
      displayTable(filteredData);
      toggleElements('#tableContainer', 'show');
    }
  } else if (comparisonTabData[tabName]) {
    // Guardar estado original solo la primera vez
    if (!originalStateBackup) {
      originalStateBackup = {
        data: getOriginalData(),
        headers: getCurrentHeaders(),
        visibleColumns: getVisibleColumns()
      };
    }
    // Cargar dataset de comparación como si fuera un CSV nuevo
    const compData = comparisonTabData[tabName];
    setOriginalData(compData);
    setCurrentHeaders(Object.keys(compData[0] || {}));
    setVisibleColumns(Object.keys(compData[0] || {}));
    resetFilterManager();
    filterManager = initializeFilterManager(compData);
    initializeReportService();
    displayTable(compData);
    toggleElements('#tableContainer', 'show');
    if (typeof updateViewSelect === 'function') updateViewSelect();
    if (typeof renderDashboardQuickFilters === 'function') renderDashboardQuickFilters();
  } else if (window.duplicatesTabData && window.duplicatesTabData[tabName]) {
    // Guardar estado original solo la primera vez
    if (!originalStateBackup) {
      originalStateBackup = {
        data: getOriginalData(),
        headers: getCurrentHeaders(),
        visibleColumns: getVisibleColumns()
      };
    }
    // Cargar dataset de duplicados con análisis
    const duplicatesInfo = window.duplicatesTabData[tabName];
    const duplicatesData = duplicatesInfo.data;
    
    // Set the duplicate analysis info for the table display
    window.currentDuplicateDifferences = duplicatesInfo.differences.differences;
    window.currentDuplicateColumns = duplicatesInfo.duplicateColumns;
    window.duplicateAnalysisMode = true; // Activar modo análisis para colores especiales
    
    // IMPORTANTE: Limpiar el filtro global para que no afecte a la pestaña Main
    window.activeDuplicateFilter = null;
    console.log('🔍 Cleared global duplicate filter for analysis tab');
    
    console.log('🔍 Setting duplicate analysis info:', {
      differences: window.currentDuplicateDifferences,
      columns: window.currentDuplicateColumns,
      totalDifferences: window.currentDuplicateDifferences.length,
      sampleDifferences: window.currentDuplicateDifferences.slice(0, 3), // Mostrar primeros 3 grupos
      analysisMode: window.duplicateAnalysisMode
    });
    
    setOriginalData(duplicatesData);
    setCurrentHeaders(Object.keys(duplicatesData[0] || {}));
    setVisibleColumns(Object.keys(duplicatesData[0] || {}));
    resetFilterManager();
    filterManager = initializeFilterManager(duplicatesData);
    initializeReportService();
    
    // First display the table to ensure it's visible
    console.log('🔍 Displaying duplicate data table with', duplicatesData.length, 'records');
    displayTable(duplicatesData);
    toggleElements('#tableContainer', 'show');
    
    // Wait a moment for the table to render, then add the analysis panel
    // Only add panel for analysis tabs, not for simple duplicate filters
    if (tabName.includes('Analysis') || tabName.includes('Duplicates:')) {
      setTimeout(() => {
        console.log('🔍 Adding duplicate analysis panel');
        addDuplicateAnalysisPanel(duplicatesInfo);
      }, 200);
    }
    
    if (typeof updateViewSelect === 'function') updateViewSelect();
    if (typeof renderDashboardQuickFilters === 'function') renderDashboardQuickFilters();
  } else if (window.editableTabData && window.editableTabData[tabName]) {
    // Guardar estado original solo la primera vez
    if (!originalStateBackup) {
      originalStateBackup = {
        data: getOriginalData(),
        headers: getCurrentHeaders(),
        visibleColumns: getVisibleColumns()
      };
    }
    // Cargar dataset editable
    const tabData = window.editableTabData[tabName];
    setOriginalData(tabData.data);
    setCurrentHeaders(tabData.columns);
    setVisibleColumns(tabData.columns);
    if (tabData.filters && typeof setActiveFilters === 'function') setActiveFilters(tabData.filters);
    if (tabData.view && typeof setCurrentView === 'function') setCurrentView(tabData.view);
    resetFilterManager();
    filterManager = initializeFilterManager(tabData.data);
    initializeReportService();
    displayTable(tabData.data, { editable: true });
    toggleElements('#tableContainer', 'show');
    if (typeof updateViewSelect === 'function') updateViewSelect();
    if (typeof renderDashboardQuickFilters === 'function') renderDashboardQuickFilters();
  }
}

function closeComparisonTab(tabName) {
  mainTabs = mainTabs.filter(tab => tab.name !== tabName);
  delete comparisonTabData[tabName];
  // Activa la principal y restaura estado
  activateMainTab('Main');
}

function addDuplicateAnalysisPanel(duplicatesInfo) {
  // Remove any existing analysis panels
  const existingPanels = document.querySelectorAll('.duplicate-analysis-panel');
  existingPanels.forEach(panel => {
    console.log('🔍 Removing existing duplicate analysis panel');
    panel.remove();
  });
  
  // DISABLED: Purple analysis panel removed as requested
  // The panel will no longer be created or displayed
  console.log('🔍 Duplicate analysis panel creation disabled');
}

function toggleDifferencesPanel() {
  const panel = document.getElementById('differencesPanel');
  if (panel) {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }
}

// Función para filtrar por diferencias en una columna específica
window.filterByColumnDifferences = function(column) {
  if (!window.currentDuplicateDifferences || !window.currentDuplicateColumns) {
    showNotification('No duplicate analysis data available', 'warning');
    return;
  }
  
  // Obtener solo las filas que tienen diferencias en esta columna
  const data = window.getOriginalData ? window.getOriginalData() : [];
  const filteredData = data.filter(row => {
    const rowKey = window.currentDuplicateColumns.map(col => row[col]).join('|');
    const differences = window.currentDuplicateDifferences.find(([key, diffObj]) => key === rowKey);
    return differences && differences[1][column];
  });
  
  if (filteredData.length === 0) {
    showNotification(`No records with differences in column "${column}"`, 'warning');
    return;
  }
  
  // Mostrar solo las filas con diferencias en esta columna
  if (typeof displayTable === 'function') {
    displayTable(filteredData);
  } else if (window.displayTable) {
    window.displayTable(filteredData);
  }
  
  showNotification(`Showing ${filteredData.length} records with differences in "${column}"`, 'success');
};

// Función para filtrar solo columnas de duplicados
window.filterByDuplicateColumns = function() {
  if (!window.currentDuplicateColumns) {
    showNotification('No duplicate columns available', 'warning');
    return;
  }
  
  // Obtener solo las columnas de duplicados
  const currentColumns = window.getVisibleColumns ? window.getVisibleColumns() : [];
  const duplicateColumns = currentColumns.filter(col => window.currentDuplicateColumns.includes(col));
  
  if (duplicateColumns.length === 0) {
    showNotification('No duplicate columns to show', 'warning');
    return;
  }
  
  // Establecer solo las columnas de duplicados como visibles
  if (typeof window.setVisibleColumns === 'function') {
    window.setVisibleColumns(duplicateColumns);
  }
  
  showNotification(`Showing only duplicate columns: ${duplicateColumns.join(', ')}`, 'success');
};

// Función para ordenar columnas por color
window.sortByColor = function() {
  if (!window.currentDuplicateColumns || !window.currentDuplicateDifferences) {
    showNotification('No duplicate analysis data available', 'warning');
    return;
  }
  
  const currentColumns = window.getVisibleColumns ? window.getVisibleColumns() : [];
  
  // Guardar el orden original antes de ordenar (solo la primera vez)
  if (!window.originalColumnOrder) {
    window.originalColumnOrder = [...currentColumns];
    console.log('💾 Saved original column order:', window.originalColumnOrder);
  }
  
  // Categorizar columnas por tipo
  const duplicateColumns = [];
  const differenceColumns = [];
  const normalColumns = [];
  
  currentColumns.forEach(col => {
    if (window.currentDuplicateColumns.includes(col)) {
      duplicateColumns.push(col);
    } else if (window.currentDuplicateDifferences.some(([key, diffObj]) => diffObj[col])) {
      differenceColumns.push(col);
    } else {
      normalColumns.push(col);
    }
  });
  
  // Reorganizar columnas: Duplicados -> Diferencias -> Normales
  const sortedColumns = [...duplicateColumns, ...differenceColumns, ...normalColumns];
  
  // Aplicar el nuevo orden
  if (typeof window.setVisibleColumns === 'function') {
    window.setVisibleColumns(sortedColumns);
  }
  
  // Mostrar resumen
  const summary = [];
  if (duplicateColumns.length > 0) {
    summary.push(`${duplicateColumns.length} duplicate columns`);
  }
  if (differenceColumns.length > 0) {
    summary.push(`${differenceColumns.length} difference columns`);
  }
  if (normalColumns.length > 0) {
    summary.push(`${normalColumns.length} normal columns`);
  }
  
  showNotification(`Columns sorted by color: ${summary.join(', ')}`, 'success');
};

// Función para restaurar el orden original de las columnas
window.resetColumnOrder = function() {
  if (!window.originalColumnOrder) {
    showNotification('No original order saved to reset', 'warning');
    return;
  }
  
  // Restaurar el orden original
  if (typeof window.setVisibleColumns === 'function') {
    window.setVisibleColumns(window.originalColumnOrder);
  }
  
  console.log('🔄 Restored original column order:', window.originalColumnOrder);
  showNotification('Column order restored to original', 'success');
};

function closeDuplicatesTab(tabName) {
  mainTabs = mainTabs.filter(tab => tab.name !== tabName);
  if (window.duplicatesTabData) {
    delete window.duplicatesTabData[tabName];
  }
  
  // Clear duplicate analysis info
  window.currentDuplicateDifferences = null;
  window.currentDuplicateColumns = null;
  
  // Clear original column order
  window.originalColumnOrder = null;
  
  // Remove all duplicate analysis panels
  const existingPanels = document.querySelectorAll('.duplicate-analysis-panel');
  existingPanels.forEach(panel => {
    console.log('🔍 Removing duplicate analysis panel');
    panel.remove();
  });
  
  // Activa la principal y restaura estado
  activateMainTab('Main');
}

function closeEditableTab(tabName) {
  mainTabs = mainTabs.filter(tab => tab.name !== tabName);
  if (window.editableTabData) {
    delete window.editableTabData[tabName];
  }
  // Activa la principal y restaura estado
  activateMainTab('Main');
}

// Hook para integración con comparación
window.addEventListener('comparisonResultsReady', (e) => {
  const data = e.detail.data;
  if (!Array.isArray(data) || !data.length) {
    showNotification('No comparison data to show.', 'warning');
    return;
  }
  comparisonTabCount++;
  const tabName = `Comparison #${comparisonTabCount}`;
  mainTabs.forEach(tab => tab.active = false);
  mainTabs.push({ name: tabName, type: 'comparison', active: true });
  comparisonTabData[tabName] = data;
  renderMainTabsBar();
  activateMainTab(tabName);
});

  // Render inicial de tabs
  renderMainTabsBar();

// === DASHBOARD CHARTS INTEGRATION ===

function setupDashboardCharts() {
  // Configurar botón de snapshot manual
  const snapshotBtn = document.getElementById('snapshotBtn');
  if (snapshotBtn) {
    snapshotBtn.addEventListener('click', async () => {
      snapshotBtn.disabled = true;
      snapshotBtn.textContent = '📸 Creating...';
      
      try {
        await createManualSnapshot();
        snapshotBtn.textContent = '✅ Created!';
        setTimeout(() => {
          snapshotBtn.textContent = '📸 Snapshot';
          snapshotBtn.disabled = false;
        }, 2000);
        
        showNotification('📸 Snapshot created successfully!', 'success');
      } catch (error) {
        console.error('Error creating snapshot:', error);
        snapshotBtn.textContent = '❌ Error';
        setTimeout(() => {
          snapshotBtn.textContent = '📸 Snapshot';
          snapshotBtn.disabled = false;
        }, 2000);
        
        showNotification('Error creating snapshot', 'error');
      }
    });
  }
  
  // Removed duplicate event listener - charts are rendered via main dashboard setup
}

function updateDashboardKpis() {
  const kpisContainer = document.getElementById('dashboardKpis');
  if (!kpisContainer) return;
  
  const data = getFilteredData() || getOriginalData() || [];
  if (!data.length) {
    kpisContainer.innerHTML = '<div class="no-data">No data available</div>';
    return;
  }
  
  // Calcular KPIs
  const kpis = calculateDashboardKpis(data);
  
  // Renderizar KPIs
  kpisContainer.innerHTML = `
    <div class="kpi-card-enhanced">
      <div class="kpi-title-enhanced">Total Records</div>
      <div class="kpi-value-enhanced">${kpis.total}</div>
      <div class="kpi-change ${kpis.totalChange >= 0 ? 'positive' : 'negative'}">
        ${kpis.totalChange >= 0 ? '↗' : '↘'} ${Math.abs(kpis.totalChange)}% vs yesterday
      </div>
    </div>
    
    <div class="kpi-card-enhanced ${kpis.urgentCount > 0 ? 'urgent' : 'success'}">
          <div class="kpi-title-enhanced">Critical Items</div>
      <div class="kpi-value-enhanced">${kpis.urgentCount}</div>
      <div class="kpi-change ${kpis.urgentChange <= 0 ? 'positive' : 'negative'}">
        ${kpis.urgentChange <= 0 ? '↘' : '↗'} ${Math.abs(kpis.urgentChange)}% vs yesterday
      </div>
    </div>
    
    <div class="kpi-card-enhanced success">
      <div class="kpi-title-enhanced">Completion Rate</div>
      <div class="kpi-value-enhanced">${kpis.completionRate}%</div>
      <div class="kpi-change ${kpis.completionChange >= 0 ? 'positive' : 'negative'}">
        ${kpis.completionChange >= 0 ? '↗' : '↘'} ${Math.abs(kpis.completionChange)}% vs yesterday
      </div>
    </div>
    
    <div class="kpi-card-enhanced">
      <div class="kpi-title-enhanced">Active Filters</div>
      <div class="kpi-value-enhanced">${(window.activeDashboardQuickFilters || []).length}</div>
      <div class="kpi-change">
        ${kpis.filteredPercentage}% of total data
      </div>
    </div>
  `;
}

function calculateDashboardKpis(data) {
  const total = data.length;
  const originalData = getOriginalData() || [];
  const filteredPercentage = originalData.length > 0 
    ? Math.round((total / originalData.length) * 100) 
    : 100;
    
  // Detectar columnas de urgencia y estado
  const headers = Object.keys(data[0] || {});
  const urgencyCol = headers.find(h => 
    h.toLowerCase().includes('urgenc') || 
    h.toLowerCase().includes('priority')
  );
  const statusCol = headers.find(h => 
    h.toLowerCase().includes('status') || 
    h.toLowerCase().includes('estado') ||
    h.toLowerCase().includes('complete')
  );
  
  // Contar urgentes
  let urgentCount = 0;
  if (urgencyCol) {
    urgentCount = data.filter(row => {
      const urgency = (row[urgencyCol] || '').toString().toLowerCase();
      return urgency.includes('urgent') || urgency.includes('alta') || urgency.includes('high');
    }).length;
  }
  
  // Calcular tasa de completado
  let completionRate = 0;
  if (statusCol) {
    const completedCount = data.filter(row => {
      const status = (row[statusCol] || '').toString().toLowerCase();
      return status.includes('complete') || status.includes('done') || 
             status.includes('finish') || status.includes('closed');
    }).length;
    completionRate = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  }
  
  // Obtener snapshots para comparación
  const snapshots = getDashboardSnapshots();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().split('T')[0];
  
  const yesterdaySnapshot = snapshots.find(s => s.date === yesterdayKey);
  
  // Calcular cambios
  let totalChange = 0;
  let urgentChange = 0;
  let completionChange = 0;
  
  if (yesterdaySnapshot) {
    const yesterdayTotal = yesterdaySnapshot.totalRecords || 0;
    const yesterdayUrgent = yesterdaySnapshot.metrics?.byUrgency || {};
    const yesterdayUrgentCount = Object.values(yesterdayUrgent).reduce((sum, count) => sum + count, 0);
    
    if (yesterdayTotal > 0) {
      totalChange = Math.round(((total - yesterdayTotal) / yesterdayTotal) * 100);
    }
    if (yesterdayUrgentCount > 0) {
      urgentChange = Math.round(((urgentCount - yesterdayUrgentCount) / yesterdayUrgentCount) * 100);
    }
  }
  
  return {
    total,
    urgentCount,
    completionRate,
    filteredPercentage,
    totalChange,
    urgentChange,
    completionChange
  };
}

// Hacer funciones accesibles globalmente
window.getOriginalData = getOriginalData;
window.getFilteredData = getFilteredData;
window.loadQuickFilters = loadQuickFilters;
window.closeDuplicatesTab = closeDuplicatesTab;
window.closeEditableTab = closeEditableTab;

// Cierre universal de modales al hacer click en el overlay (blur)
document.addEventListener('mousedown', function(e) {
  const overlay = e.target.closest('.modal-overlay');
  if (overlay && e.target === overlay) {
    overlay.classList.add('hidden');
    overlay.style.display = 'none';
  }
});

// --- TABS DE LA TABLA PRINCIPAL Y WORKSPACES ---
function setupTableTabs() {
  const tabsContainer = document.getElementById('tableTabs');
  if (!tabsContainer) return;
  tabsContainer.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.table-tab');
    if (!tabBtn) return;
    // Quitar clase active de todas
    tabsContainer.querySelectorAll('.table-tab').forEach(btn => btn.classList.remove('active'));
    tabBtn.classList.add('active');
    const tabId = tabBtn.getAttribute('data-tab');
    // Mostrar/ocultar tablas según la pestaña activa
    if (tabId === 'main') {
      document.getElementById('tableContainer').style.display = '';
      // Ocultar todas las tablas editables si existen
      document.querySelectorAll('.editable-workspace-table').forEach(el => el.style.display = 'none');
    } else {
      document.getElementById('tableContainer').style.display = 'none';
      // Mostrar solo la tabla editable correspondiente
      document.querySelectorAll('.editable-workspace-table').forEach(el => {
        el.style.display = (el.getAttribute('data-workspace') === tabId) ? '' : 'none';
      });
    }
  });
}
// Ejecutar al cargar la app
window.addEventListener('DOMContentLoaded', setupTableTabs);

// --- BOTÓN PARA CREAR PESTAÑA EDITABLE ---
function addCreateEditableTabButton() {
  // Evita duplicados
  if (document.getElementById('createEditableTabBtn')) return;
  const mainTabsBar = document.getElementById('mainTabsBar');
  if (!mainTabsBar) return;
  const btn = document.createElement('button');
  btn.id = 'createEditableTabBtn';
  btn.textContent = 'Create Editable Tab';
  btn.className = 'brand-btn';
  btn.style.marginLeft = '1em';
  btn.style.fontWeight = '600';
  btn.style.fontSize = '1em';
  btn.style.display = ''; // SIEMPRE VISIBLE
  btn.onclick = () => {
    createEditableWorkspaceTab();
  };
  mainTabsBar.appendChild(btn);
}

// Lógica para crear la pestaña editable (sólo esqueleto por ahora)
function createEditableWorkspaceTab() {
  // Aquí se implementará la lógica para crear la nueva pestaña editable con los datos filtrados
  alert('Nueva pestaña editable creada (demo)');
}

// Hook para actualizar el botón cuando cambian los filtros
if (typeof window !== 'undefined') {
  window.addEventListener('filtersChanged', addCreateEditableTabButton);
  window.addEventListener('DOMContentLoaded', () => {
    addCreateEditableTabButton();
  });
}

// Hook para actualizar la barra de tabs cuando cambian los filtros
if (typeof window !== 'undefined') {
  window.addEventListener('filtersChanged', renderMainTabsBar);
  window.addEventListener('DOMContentLoaded', renderMainTabsBar);
}

// Función para abrir el modal de opciones de copiar
function openCopyOptionsModal() {
  const modal = document.getElementById('copyOptionsModal');
  const closeBtn = document.getElementById('closeCopyOptionsBtn');
  const selectAllBtn = document.getElementById('selectAllCopyBtn');
  const deselectAllBtn = document.getElementById('deselectAllCopyBtn');
  const copyWithoutDedupeBtn = document.getElementById('copyWithoutDedupeBtn');
  const copyWithDedupeBtn = document.getElementById('copyWithDedupeBtn');
  const dedupeSelect = document.getElementById('copyDedupeColumnsSelect');
  
  if (!modal) {
    console.error('Copy options modal not found');
    return;
  }
  
  // NO cerrar el popup del Ops Hub - solo ocultarlo temporalmente
  const opsHubPopup = document.querySelector('.ops-hub-filter-popup.show');
  if (opsHubPopup) {
    opsHubPopup.style.display = 'none';
  }
  
  // Poblar el select con las columnas disponibles
  const headers = getVisibleColumns();
  dedupeSelect.innerHTML = '';
  headers.forEach(header => {
    const option = document.createElement('option');
    option.value = header;
    option.textContent = header;
    dedupeSelect.appendChild(option);
  });
  
  // Función para restaurar el popup del Ops Hub
  const restoreOpsHubPopup = () => {
    if (opsHubPopup) {
      opsHubPopup.style.display = '';
    }
  };
  
  // Event listeners
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.add('hidden');
      restoreOpsHubPopup();
    };
  }
  
  if (selectAllBtn) {
    selectAllBtn.onclick = () => {
      Array.from(dedupeSelect.options).forEach(option => {
        option.selected = true;
      });
    };
  }
  
  if (deselectAllBtn) {
    deselectAllBtn.onclick = () => {
      Array.from(dedupeSelect.options).forEach(option => {
        option.selected = false;
      });
    };
  }
  
  if (copyWithoutDedupeBtn) {
    copyWithoutDedupeBtn.onclick = async () => {
      copyWithoutDedupeBtn.disabled = true;
      copyWithoutDedupeBtn.textContent = 'Copying...';
      try {
        const result = await copyTableToClipboard();
        if (typeof window.showUnifiedNotification === 'function') {
          window.showUnifiedNotification('Data copied to clipboard!', 'success');
        }
        // Cerrar el popup de filters applied si está visible
        const opsHubPopup = document.querySelector('.ops-hub-filter-popup.show');
        if (opsHubPopup) opsHubPopup.remove();
        modal.classList.add('hidden');
        restoreOpsHubPopup();
      } catch (e) {
        showNotification('Error copying to clipboard: ' + e.message, 'error');
      } finally {
        copyWithoutDedupeBtn.disabled = false;
        copyWithoutDedupeBtn.textContent = 'Copy Without Deduplication';
      }
    };
  }
  
  if (copyWithDedupeBtn) {
    copyWithDedupeBtn.onclick = async () => {
      const selectedColumns = Array.from(dedupeSelect.selectedOptions).map(opt => opt.value);
      if (selectedColumns.length === 0) {
        showNotification('Please select at least one column for deduplication', 'error');
        return;
      }
      
      copyWithDedupeBtn.disabled = true;
      copyWithDedupeBtn.textContent = 'Copying...';
      try {
        // Crear una función temporal de copiar con deduplicación
        const result = await copyTableToClipboardWithDedupe(selectedColumns);
        if (typeof window.showUnifiedNotification === 'function') {
          window.showUnifiedNotification('Data copied to clipboard!', 'success');
        }
        // Cerrar el popup de filters applied si está visible
        const opsHubPopup = document.querySelector('.ops-hub-filter-popup.show');
        if (opsHubPopup) opsHubPopup.remove();
        modal.classList.add('hidden');
        restoreOpsHubPopup();
      } catch (e) {
        showNotification('Error copying to clipboard: ' + e.message, 'error');
      } finally {
        copyWithDedupeBtn.disabled = false;
        copyWithDedupeBtn.textContent = 'Copy with Deduplication';
      }
    };
  }
  
  // Cerrar al hacer click fuera del modal
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      restoreOpsHubPopup();
    }
  };
  
  // Mostrar el modal
  modal.classList.remove('hidden');
}

// Función para copiar con deduplicación
async function copyTableToClipboardWithDedupe(dedupeColumns) {
  try {
    // Obtener datos filtrados
    let data = (typeof getFilteredData === 'function' ? getFilteredData() : getOriginalData());
    const headers = getVisibleColumns();
    
    // Aplicar deduplicación
    if (dedupeColumns && dedupeColumns.length > 0) {
      data = removeDuplicates(data, dedupeColumns);
    }

    // Crear formato de Excel (TSV - Tab Separated Values)
    const excelData = [
      headers, // Primera fila: encabezados
      ...data.map(row => headers.map(h => row[h] !== undefined ? row[h] : ''))
    ];

    // Convertir a texto con formato Excel (TSV)
    const excelText = excelData.map(row => 
      row.map(cell => {
        // Escapar comillas dobles y envolver en comillas si contiene tab, nueva línea o comillas
        const cellStr = String(cell);
        if (cellStr.includes('\t') || cellStr.includes('\n') || cellStr.includes('"')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join('\t')
    ).join('\n');

    // Crear HTML con formato de tabla simple para Excel
    const htmlTable = `
      <table style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 11px;">
        <thead>
          <tr>${headers.map(h => `<th style="border: 1px solid #000000; padding: 4px; background-color: #e3f2fd; font-weight: bold; text-align: center;">${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${data.map(row => 
            `<tr>${headers.map(h => `<td style="border: 1px solid #000000; padding: 4px; text-align: left;">${row[h] !== undefined ? row[h] : ''}</td>`).join('')}</tr>`
          ).join('')}
        </tbody>
      </table>
    `;

    // Copiar al portapapeles con formato Excel
    await navigator.clipboard.write([
      new window.ClipboardItem({
        'text/html': new Blob([htmlTable], { type: 'text/html' }),
        'text/plain': new Blob([excelText], { type: 'text/plain' })
      })
    ]);

    const dedupeMessage = dedupeColumns && dedupeColumns.length > 0 
      ? ` (${data.length} rows after removing duplicates by: ${dedupeColumns.join(', ')})`
      : '';

    return {
      success: true,
      message: `Data copied to clipboard in Excel format${dedupeMessage}`
    };
  } catch (error) {
    console.error('Error al copiar la tabla:', error);
    return {
      success: false,
      message: 'Error al copiar la tabla: ' + error.message
    };
  }
}

// Función para remover duplicados (reutilizada del reportService)
function removeDuplicates(data, columns) {
  const seen = new Set();
  return data.filter(row => {
    const key = columns.map(col => row[col] || '').join('|');
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

// Eliminado: función applyFilterHeaderStyles y observer que aplicaba estilos a los headers de filtros

// --- NOTIFICACIÓN DE COPIADO LIMPIA ---
function showCopyNotification(message) {
    // Elimina cualquier notificación anterior
    const old = document.getElementById('copyNotificationOverlay');
    if (old) old.remove();
    
    // Crea overlay
    const overlay = document.createElement('div');
    overlay.id = 'copyNotificationOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'transparent';
    overlay.style.backdropFilter = 'none';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'flex-start';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '99999';
    overlay.style.pointerEvents = 'none';
    
    // Crea notificación
    const notification = document.createElement('div');
    notification.style.background = '#1a2332';
    notification.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.25)';
    notification.style.padding = '1rem 1.5rem';
    notification.style.color = '#fff';
    notification.style.fontFamily = 'Inter, Segoe UI, Arial, sans-serif';
    notification.style.fontWeight = '600';
    notification.style.fontSize = '1rem';
    notification.style.maxWidth = '90vw';
    notification.style.textAlign = 'center';
    notification.style.marginTop = '2rem';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.pointerEvents = 'auto';
    notification.innerHTML = message;
    
    overlay.appendChild(notification);
    document.body.appendChild(overlay);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto-ocultar después de 2 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (overlay.parentNode) overlay.remove();
        }, 300);
    }, 2000);
}

// ... existing code ...
window.showCopyNotification = showCopyNotification;
// ... existing code ...

// ... existing code ...
// Función para actualizar el color del botón de refresco de la tabla según filtros activos
function updateRefreshButtonColor() {
  const refreshBtn = document.getElementById('resetAllFiltersBtn');
  if (!refreshBtn) return;
  try {
    // Detecta si hay filtros activos en la tabla
    const tableActiveFilters = getTableActiveFilters && getTableActiveFilters();
    const hasActive = tableActiveFilters && Object.keys(tableActiveFilters).length > 0;
    if (hasActive) {
      refreshBtn.classList.add('has-active-filters');
    } else {
      refreshBtn.classList.remove('has-active-filters');
    }
  } catch (error) {
    console.error('Error updating refresh button color:', error);
  }
}

// ... existing code ...
// Hook para actualizar el color del botón de refresco cuando cambian los filtros de la tabla
window.updateRefreshButtonColor = updateRefreshButtonColor;
// Llama al actualizar filtros
if (typeof window.updateActiveFiltersSummary === 'function') {
  const oldUpdate = window.updateActiveFiltersSummary;
  window.updateActiveFiltersSummary = function() {
    oldUpdate();
    updateRefreshButtonColor();
  };
} else {
  // Fallback: actualiza al cargar
  document.addEventListener('DOMContentLoaded', updateRefreshButtonColor);
}
// ... existing code ...

// ... existing code ...
document.addEventListener('DOMContentLoaded', function() {
  const loadBtn = document.getElementById('loadNewCSVBtn');
  const bar = document.getElementById('csvLoadingBar');
  if (loadBtn && bar) {
    loadBtn.addEventListener('click', function() {
      bar.style.display = 'block';
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = '90%'; }, 100);
      setTimeout(() => { bar.style.width = '100%'; }, 1500);
      setTimeout(() => { bar.style.display = 'none'; bar.style.width = '0'; }, 2000);
    });
  }
});
// ... existing code ...

// ... existing code ...
window.getModuleActiveFilters = getModuleActiveFilters;
window.setModuleActiveFilters = setModuleActiveFilters;
window.getModuleFilterValues = getModuleFilterValues;
window.setModuleFilterValues = setModuleFilterValues;
window.getFilteredData = getFilteredData;
window.displayTable = displayTable;
window.renderActiveFiltersSummaryChips = renderActiveFiltersSummaryChips;
window.getOriginalData = getOriginalData;
window.getCurrentHeaders = getCurrentHeaders;
// ... existing code ...

// Show Duplicates functionality
function showDuplicates(data, columns) {
  const duplicates = findDuplicateRecords(data, columns);
  
  if (duplicates.length === 0) {
    showNotification('No duplicate records found with the selected columns.', 'info');
    return;
  }
  
  displayDuplicatesModal(duplicates, columns);
}

function findDuplicateRecords(data, columns) {
  const seen = new Map();
  const duplicates = [];
  
  data.forEach((row, index) => {
    const key = columns.map(col => row[col] || '').join('|');
    
    if (seen.has(key)) {
      // This is a duplicate
      if (!seen.get(key).isDuplicate) {
        // Mark the first occurrence as duplicate too
        seen.get(key).row._isDuplicate = true;
        duplicates.push(seen.get(key).row);
      }
      duplicates.push({ ...row, _originalIndex: index, _isDuplicate: true });
    } else {
      seen.set(key, { row: { ...row, _originalIndex: index, _isDuplicate: false }, isDuplicate: false });
    }
  });
  
  return duplicates;
}

// Make functions available globally
window.findDuplicateRecords = findDuplicateRecords;
window.findDuplicateRecordsWithDifferences = findDuplicateRecordsWithDifferences;
window.applyDuplicatesAsFilter = applyDuplicatesAsFilter;
window.getFilteredData = getFilteredData;
window.applyFilters = applyFilters;

function displayDuplicatesModal(duplicates, columns, differences = null) {
  console.log('🔍 displayDuplicatesModal called with:', { duplicates: duplicates.length, columns, differences: differences ? differences.length : 0 });
  
  const summaryDiv = document.getElementById('duplicatesSummary');
  const tableContainer = document.getElementById('duplicatesTableContainer');
  
  if (!summaryDiv || !tableContainer) {
    console.error('Required elements for duplicates modal not found');
    return;
  }
  
  // Generate summary
  const uniqueGroups = new Set();
  duplicates.forEach(row => {
    const key = columns.map(col => row[col] || '').join('|');
    uniqueGroups.add(key);
  });
  
  let summary = `
    <div style="color:#2e7d32; font-weight:600; margin-bottom:0.5rem;">✓ Duplicate Records Found</div>
    <div style="color:#388e3c; font-size:0.9rem;">
      Found ${duplicates.length} duplicate records across ${uniqueGroups.size} unique groups<br>
      Based on columns: ${columns.join(', ')}
    </div>
  `;
  
  // Add differences summary if available
  if (differences && differences.length > 0) {
    const groupsWithDifferences = differences.length;
    const allDifferentColumns = new Set();
    differences.forEach(([key, diffObj]) => {
      Object.keys(diffObj).forEach(col => allDifferentColumns.add(col));
    });
    
    summary += `
      <div style="color:#f57c00; font-weight:600; margin-top:0.5rem;">⚠ Inconsistencies Detected</div>
      <div style="color:#ef6c00; font-size:0.9rem;">
        ${groupsWithDifferences} groups have different values in other columns<br>
        Columns with differences: ${Array.from(allDifferentColumns).join(', ')}
      </div>
    `;
  }
  
  summaryDiv.innerHTML = summary;
  
  // Generate table
  const tableHtml = generateDuplicatesTable(duplicates, columns, differences);
  tableContainer.innerHTML = tableHtml;
}

function generateDuplicatesTable(duplicates, columns, differences = null) {
  if (duplicates.length === 0) {
    return '<div style="color:#888; text-align:center; padding:2rem;">No duplicates found</div>';
  }
  
  // Get all headers including the duplicate columns
  const headers = Object.keys(duplicates[0]).filter(header => !header.startsWith('_'));
  
  // Generate header row
  const headerRow = headers.map(header => {
    const isDuplicateColumn = columns.includes(header);
    const hasDifferences = differences && differences.some(([key, diffObj]) => diffObj[header]);
    let style = isDuplicateColumn ? 
      'background:#fff3cd; color:#856404; font-weight:600;' : 
      'background:#e3f2fd; color:#1976d2; font-weight:600;';
    
    if (hasDifferences) {
      style = 'background:#ffebee; color:#c62828; font-weight:600;';
    }
    
    return `<th style="padding:10px 12px; ${style} text-align:left; border:1px solid #e3f2fd; font-size:0.95em;">${header}</th>`;
  }).join('');
  
  // Generate data rows
  const dataRows = duplicates.map(row => {
    const cells = headers.map(header => {
      const value = row[header] || '';
      const isDuplicateColumn = columns.includes(header);
      const isDuplicateRow = row._isDuplicate;
      const hasDifferences = differences && differences.some(([key, diffObj]) => diffObj[header]);
      
      let cellStyle = 'padding:8px 12px; border:1px solid #e3f2fd; color:#333; font-size:0.95em; max-width:200px; overflow:hidden; text-overflow:ellipsis; text-align:left;';
      
      if (isDuplicateColumn) {
        cellStyle += 'background:#fff3cd;';
      }
      if (isDuplicateRow) {
        cellStyle += 'background:#ffebee;';
      }
      if (hasDifferences) {
        cellStyle += 'background:#ffcdd2; border-left:3px solid #c62828;';
      }
      
      const displayValue = value.length > 100 ? value.substring(0, 100) + '...' : value;
      return `<td style="${cellStyle}">${displayValue}</td>`;
    }).join('');
    
    return `<tr>${cells}</tr>`;
  }).join('');
  
  return `
    <table style="width:100%; border-collapse:collapse; font-size:0.9em; background:#fff; text-align:left;">
      <thead>
        <tr>${headerRow}</tr>
      </thead>
      <tbody>
        ${dataRows}
      </tbody>
    </table>
  `;
}

// Setup createEditableTabBtn event listener
function setupCreateEditableTabBtn() {
  const createEditableTabBtn = document.getElementById('createEditableTabBtn');
  if (createEditableTabBtn) {
    createEditableTabBtn.addEventListener('click', () => {
      // Verificar que hay datos cargados
      const data = getFilteredData();
      if (!data || !data.length) {
        showNotification('No data available to create editable tab.', 'warning');
        return;
      }

      // Obtener datos, filtros y columnas actuales
      const columns = typeof getVisibleColumns === 'function' ? getVisibleColumns() : Object.keys(data[0] || {});
      const filters = typeof getActiveFilters === 'function' ? getActiveFilters() : null;
      const view = typeof getCurrentView === 'function' ? getCurrentView() : null;

      // Crear nombre de la pestaña
      if (!window.editableTabCount) window.editableTabCount = 0;
      window.editableTabCount++;
      const tabName = `Tab ${window.editableTabCount}`;

      // Desactivar otras pestañas
      mainTabs.forEach(tab => tab.active = false);

      // Guardar datos de la nueva pestaña editable
      if (!window.editableTabData) window.editableTabData = {};
      window.editableTabData[tabName] = {
        data: JSON.parse(JSON.stringify(data)),
        columns: [...columns],
        filters: filters ? JSON.parse(JSON.stringify(filters)) : null,
        view: view ? JSON.parse(JSON.stringify(view)) : null
      };

      // Añadir la nueva pestaña
      mainTabs.push({ name: tabName, type: 'editable', active: true });
      renderMainTabsBar();
      activateMainTab(tabName);
      showNotification(`Created new tab "${tabName}".`, 'success');
    });
  }
}

// Call setup function when DOM is ready
document.addEventListener('DOMContentLoaded', setupCreateEditableTabBtn);
// Also call it after table is loaded
window.addEventListener('tableLoaded', setupCreateEditableTabBtn);

// ... existing code ...
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('copySummaryBtnToolbar');
  if (btn) {
    btn.onclick = function() {
      if (window.openCopyOptionsModal) {
        window.openCopyOptionsModal();
      } else if (typeof openCopyOptionsModal === 'function') {
        openCopyOptionsModal();
      } else {
        alert('No se encontró la función de copiar con deduplicado.');
      }
    };
  }
});
// ... existing code ...

// Global Unified Notification System
window.showUnifiedNotification = function(message, type = 'info') {
  console.log(`🔔 showUnifiedNotification called: ${type} - ${message}`);
  
  // Remove any existing notification
  const existingNotification = document.getElementById('tableNotification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'tableNotification';
  notification.className = 'notification';
  
  // Set notification content based on type
  let icon = '';
  let bgColor = '#1a2332';
  
  switch (type) {
    case 'success':
      icon = '✓';
      bgColor = 'linear-gradient(135deg, #47B2E5 0%, #3A9BD4 100%)';
      break;
    case 'error':
      icon = '✗';
      bgColor = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
      break;
    case 'warning':
      icon = '⚠';
      bgColor = 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)';
      break;
    case 'info':
    default:
      icon = 'ℹ';
      bgColor = 'linear-gradient(135deg, #47B2E5 0%, #1976d2 100%)';
      break;
  }
  
  notification.innerHTML = `
    <div class="notification-content" style="display: flex; align-items: center; gap: 0.75rem; width: 100%;">
      <div style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: rgba(255, 255, 255, 0.2); flex-shrink: 0;">
        <span style="font-size: 1rem; color: #ffffff; font-weight: bold;">${icon}</span>
      </div>
      <span id="notificationMessage" style="flex: 1; line-height: 1.4;">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()" style="color: #ffffff; background: none; border: none; font-size: 1.25rem; cursor: pointer; opacity: 0.8; transition: opacity 0.2s; padding: 4px; border-radius: 4px; hover:opacity: 1;">×</button>
    </div>
  `;
  
  // Apply styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    z-index: 10000;
    background: ${bgColor};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    padding: 1.2rem 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 320px;
    max-width: 600px;
    color: #ffffff;
    font-weight: 600;
    font-size: 1rem;
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Show notification with animation
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);
  
  // Auto-hide after 4 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(-50%) translateY(-100%)';
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 400);
    }
  }, 4000);
  
  console.log(`✅ Notification displayed: ${type} - ${message}`);
};



// ... existing code ...

function findDuplicateRecordsWithDifferences(data, duplicateColumns, checkColumns = []) {
  const seen = new Map();
  const duplicates = [];
  const differences = new Map();
  
  // Agrupar por clave de duplicados
  const groups = new Map();
  
  data.forEach((row, index) => {
    const key = duplicateColumns.map(col => row[col] || '').join('|');
    
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push({ ...row, _originalIndex: index });
  });
  
  // Analizar diferencias dentro de cada grupo
  groups.forEach((groupRows, key) => {
    if (groupRows.length > 1) { // Solo grupos con más de 1 fila
      const columnDifferences = {};
      const columnsToCheck = checkColumns.length > 0 ? checkColumns : Object.keys(groupRows[0]).filter(col => !duplicateColumns.includes(col) && col !== '_originalIndex');
      
      columnsToCheck.forEach(col => {
        const values = groupRows.map(row => row[col]);
        const uniqueValues = [...new Set(values)];
        
        if (uniqueValues.length > 1) {
          // Hay diferencias en esta columna para este grupo
          columnDifferences[col] = {
            values: uniqueValues,
            count: uniqueValues.length
          };
        }
      });
      
      if (Object.keys(columnDifferences).length > 0) {
        differences.set(key, columnDifferences);
      }
      
      // Agregar todas las filas del grupo como duplicados
      groupRows.forEach(row => {
        duplicates.push({ 
          ...row, 
          _isDuplicate: true, 
          _hasDifferences: Object.keys(columnDifferences).length > 0 
        });
      });
    }
  });
  
  console.log('🔍 Duplicate analysis results:', {
    totalDuplicates: duplicates.length,
    groupsWithDifferences: differences.size,
    differences: Array.from(differences.entries()),
    sampleGroup: Array.from(groups.entries())[0]
  });
  
  return {
    duplicates,
    differences: Array.from(differences.entries()),
    summary: {
      totalDuplicates: duplicates.length,
      groupsWithDifferences: differences.size,
      totalGroups: groups.size
    }
  };
}

// ... existing code ...

// ===== BACKEND CONFIGURATION =====

// Backend URL configuration
                      window.backendUrl = window.backendConfig ? window.backendConfig.getMainBackendUrl() : 'https://the-bridge-9g01.onrender.com';

// ===== TEAM MANAGEMENT SYSTEM =====

// Global team state
window.currentTeam = null;
window.teamBackendConnected = false;
window.currentUser = null;

// User profile management functions
async function saveUserProfile(userId, teamId, profileData) {
  try {
    const response = await fetch(`${window.backendUrl}/api/users/${userId}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId,
        ...profileData
      })
    });
    
    const result = await response.json();
    if (result.success) {
      console.log('✅ User profile saved successfully');
      return true;
    } else {
      console.error('❌ Error saving user profile:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Error saving user profile:', error);
    return false;
  }
}

async function loadUserProfile(userId, teamId) {
  try {
    console.log('📂 Loading user profile from OneDrive/localStorage...');
    const profile = await loadFromUnifiedBackend(`user-profile-${userId}.json`, {
      teamId: teamId,
      userEmail: userId,
      fileType: 'users'
    });
    
    if (profile) {
      console.log('✅ User profile loaded successfully');
      return profile;
    } else {
      console.log('📂 No user profile found');
      return null;
    }
  } catch (error) {
    console.log('📂 No user profile found in OneDrive/localStorage');
    return null;
  }
}

async function saveUserFilters(userId, teamId, filters) {
  try {
    console.log('💾 Saving user filters to OneDrive/localStorage...');
    await saveToUnifiedBackend(filters, `user-filters-${userId}.json`, {
      teamId: teamId,
      userEmail: userId,
      fileType: 'users'
    });
    
      console.log('✅ User filters saved successfully');
      return true;
  } catch (error) {
    console.error('❌ Error saving user filters:', error);
    return false;
  }
}

async function loadUserFilters(userId, teamId) {
  try {
    console.log('📂 Loading user filters from OneDrive/localStorage...');
    const filters = await loadFromUnifiedBackend(`user-filters-${userId}.json`, {
      teamId: teamId,
      userEmail: userId,
      fileType: 'users'
    });
    
    if (filters) {
      console.log('✅ User filters loaded successfully');
      return filters;
    } else {
      console.log('📂 No user filters found');
      return [];
    }
  } catch (error) {
    console.log('📂 No user filters found in OneDrive/localStorage');
    return [];
  }
}

async function saveUserSettings(userId, teamId, settings) {
  try {
    console.log('💾 Saving user settings to OneDrive/localStorage...');
    await saveToUnifiedBackend(settings, `user-settings-${userId}.json`, {
      teamId: teamId,
      userEmail: userId,
      fileType: 'users'
    });
    
      console.log('✅ User settings saved successfully');
      return true;
  } catch (error) {
    console.error('❌ Error saving user settings:', error);
    return false;
  }
}

async function loadUserSettings(userId, teamId) {
  try {
    console.log('📂 Loading user settings from OneDrive/localStorage...');
    const settings = await loadFromUnifiedBackend(`user-settings-${userId}.json`, {
      teamId: teamId,
      userEmail: userId,
      fileType: 'users'
    });
    
    if (settings) {
      console.log('✅ User settings loaded successfully');
      return settings;
    } else {
      console.log('📂 No user settings found');
      return {};
    }
  } catch (error) {
    console.log('📂 No user settings found in OneDrive/localStorage');
    return {};
  }
}

// Apply user settings to the application
function applyUserSettings(settings) {
  try {
    console.log('🔄 Applying user settings:', settings);
    
    // Apply theme
    if (settings.theme) {
      document.body.setAttribute('data-theme', settings.theme);
      console.log('✅ Applied theme:', settings.theme);
    }
    
    // Apply column settings
    if (settings.columns && settings.columns.visible && settings.columns.visible.length > 0) {
      setVisibleColumns(settings.columns.visible);
      console.log('✅ Applied visible columns:', settings.columns.visible.length);
    }
    
    // Apply dashboard layout
    if (settings.dashboard && settings.dashboard.layout) {
      // Apply dashboard layout if available
      console.log('✅ Applied dashboard layout:', settings.dashboard.layout);
    }
    
    // Apply saved filters if they exist
    if (settings.filters && Array.isArray(settings.filters) && settings.filters.length > 0) {
      console.log('✅ Applying saved filters:', settings.filters.length);
      // Store filters in localStorage for the filter manager to pick up
      localStorage.setItem('myFilters', JSON.stringify(settings.filters));
      
      // Apply filters if filter manager is available
      if (window.filterManager) {
        settings.filters.forEach(filter => {
          if (filter.column && filter.values) {
            window.filterManager.setColumnFilter(filter.column, filter.values);
          }
        });
      }
    }
    
    // Apply quick filters if they exist
    if (settings.quickFilters && Object.keys(settings.quickFilters).length > 0) {
      console.log('✅ Applying saved quick filters:', Object.keys(settings.quickFilters).length);
      localStorage.setItem('quickFilters', JSON.stringify(settings.quickFilters));
    }
    
    // Apply custom summaries if they exist
    if (settings.customSummaries && Object.keys(settings.customSummaries).length > 0) {
      console.log('✅ Applying saved custom summaries:', Object.keys(settings.customSummaries).length);
      localStorage.setItem('customSummaries', JSON.stringify(settings.customSummaries));
    }
    
    // Apply other settings as needed
    if (settings.autoSave !== undefined) {
      window.autoSaveEnabled = settings.autoSave;
      console.log('✅ Applied auto save setting:', settings.autoSave);
    }
    
    if (settings.notifications !== undefined) {
      window.notificationsEnabled = settings.notifications;
      console.log('✅ Applied notifications setting:', settings.notifications);
    }
    
    console.log('✅ User settings applied successfully');
  } catch (error) {
    console.error('❌ Error applying user settings:', error);
  }
}

// Auto-save user settings when they change
async function autoSaveUserSettings(settings) {
  if (!window.currentUser || !window.currentTeam) return;
  
  try {
    const currentSettings = window.userSettings || {};
    const updatedSettings = { ...currentSettings, ...settings };
    
    const success = await saveUserSettings(window.currentUser.email, window.currentTeam.id, updatedSettings);
    if (success) {
      window.userSettings = updatedSettings;
      console.log('✅ User settings auto-saved');
    }
  } catch (error) {
    console.error('❌ Error auto-saving user settings:', error);
  }
}

// Auto-save user filters when they change
async function autoSaveUserFilters(filters) {
  if (!window.currentUser || !window.currentTeam) return;
  
  try {
    const success = await saveUserFilters(window.currentUser.email, window.currentTeam.id, filters);
    if (success) {
      window.userFilters = filters;
      console.log('✅ User filters auto-saved');
    }
  } catch (error) {
    console.error('❌ Error auto-saving user filters:', error);
  }
}

// Save team to IndexedDB
function saveTeamToIndexedDB(teamData) {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open('TheBridgeDB', 1);
      
      request.onerror = () => {
        console.warn('⚠️ IndexedDB not available for team');
        resolve(false);
      };
      
      request.onsuccess = (event) => {
        try {
          const db = event.target.result;
          
          // Create teams store if it doesn't exist
          if (!db.objectStoreNames.contains('teams')) {
            const version = db.version + 1;
            db.close();
            const upgradeRequest = indexedDB.open('TheBridgeDB', version);
            upgradeRequest.onupgradeneeded = (event) => {
              const db = event.target.result;
              if (!db.objectStoreNames.contains('teams')) {
                db.createObjectStore('teams', { keyPath: 'id' });
              }
            };
            upgradeRequest.onsuccess = () => {
              saveTeamToIndexedDB(teamData).then(resolve);
            };
            return;
          }
          
          const transaction = db.transaction(['teams'], 'readwrite');
          const store = transaction.objectStore('teams');
          const putRequest = store.put(teamData);
          
          putRequest.onsuccess = () => {
            console.log('✅ Team saved to IndexedDB:', teamData.id);
            resolve(true);
          };
          
          putRequest.onerror = () => {
            console.warn('⚠️ Failed to save team to IndexedDB');
            resolve(false);
          };
        } catch (error) {
          console.warn('⚠️ IndexedDB transaction error for team:', error);
          resolve(false);
        }
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('teams')) {
          db.createObjectStore('teams', { keyPath: 'id' });
        }
      };
    } catch (error) {
      console.warn('⚠️ IndexedDB error for team:', error);
      resolve(false);
    }
  });
}

// Save team to cookies
function saveTeamToCookies(teamData) {
  try {
    const cookieName = `thebridge_team_${teamData.id}`;
    const cookieValue = JSON.stringify(teamData);
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 10); // 10 years
    
    document.cookie = `${cookieName}=${encodeURIComponent(cookieValue)}; expires=${expiryDate.toUTCString()}; path=/`;
    console.log('✅ Team saved to persistent cookies:', teamData.id);
    return true;
  } catch (error) {
    console.warn('⚠️ Error saving team to cookies:', error);
    return false;
  }
}

// Get team from IndexedDB
function getTeamFromIndexedDB(teamId) {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open('TheBridgeDB', 1);
      
      request.onerror = () => {
        resolve(null);
      };
      
      request.onsuccess = (event) => {
        try {
          const db = event.target.result;
          
          if (!db.objectStoreNames.contains('teams')) {
            resolve(null);
            return;
          }
          
          const transaction = db.transaction(['teams'], 'readonly');
          const store = transaction.objectStore('teams');
          const getRequest = store.get(teamId);
          
          getRequest.onsuccess = () => {
            resolve(getRequest.result);
          };
          
          getRequest.onerror = () => {
            resolve(null);
          };
        } catch (error) {
          resolve(null);
        }
      };
    } catch (error) {
      resolve(null);
    }
  });
}

// Get team from cookies
function getTeamFromCookies(teamId) {
  try {
    const cookieName = `thebridge_team_${teamId}`;
    const cookies = document.cookie.split(';');
    
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        return JSON.parse(decodeURIComponent(value));
      }
    }
    return null;
  } catch (error) {
    console.warn('⚠️ Error reading team from cookies:', error);
    return null;
  }
}

// Team storage functions (unified - OneDrive + localStorage)
async function saveTeamProfile(teamData) {
  try {
    console.log('💾 Saving team profile:', teamData.id);
    
    // 1. Save to localStorage (always as backup)
    const teams = JSON.parse(localStorage.getItem('thebridge_teams') || '{}');
    teams[teamData.id] = teamData;
    localStorage.setItem('thebridge_teams', JSON.stringify(teams));
    console.log('✅ Team saved to localStorage');
    
    // 2. Save to OneDrive using unified storage system
    let onedriveSuccess = false;
    try {
      const fileName = `team-${teamData.id}.json`;
      const result = await saveToUnifiedBackend(teamData, fileName, {
        teamId: teamData.id,
        userEmail: teamData.adminEmail || window.currentUser?.email || 'admin@example.com',
        fileType: 'teams'
      });
      
      if (result.success) {
        console.log('✅ Team saved to OneDrive:', result.path);
        onedriveSuccess = true;
      } else {
        console.warn('⚠️ Could not save team to OneDrive, but saved locally');
      }
    } catch (error) {
      console.warn('⚠️ Error saving team to OneDrive:', error);
      console.log('📱 Team saved locally only');
    }
    
    // 3. Save to IndexedDB for persistence
    try {
      await saveTeamToIndexedDB(teamData);
    } catch (error) {
      console.warn('⚠️ Error saving to IndexedDB:', error);
    }
    
    // 4. Create immediate backup
    try {
    if (window.createSimpleBackup) {
      window.createSimpleBackup();
      }
    } catch (error) {
      console.warn('⚠️ Error creating backup:', error);
    }
    
    console.log('✅ Team profile saved successfully');
    return onedriveSuccess; // Return true only if OneDrive worked
  } catch (error) {
    console.error('❌ Error saving team profile:', error);
    return false;
  }
}

// User team management functions
function addUserToTeam(userEmail, teamId) {
  try {
    const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
    const userIndex = users.findIndex(user => user.email === userEmail);
    
    if (userIndex !== -1) {
      const user = users[userIndex];
      if (!user.teams) {
        user.teams = [];
      }
      
      if (!user.teams.includes(teamId)) {
        user.teams.push(teamId);
        users[userIndex] = user;
        localStorage.setItem('thebridge_users', JSON.stringify(users));
        
        // Update current user if it's the same user
        if (window.currentUser && window.currentUser.email === userEmail) {
          window.currentUser = user;
          localStorage.setItem('thebridge_current_user', JSON.stringify(user));
        }
        
        console.log(`✅ User ${userEmail} added to team ${teamId}`);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error adding user to team:', error);
    return false;
  }
}

function removeUserFromTeam(userEmail, teamId) {
  try {
    const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
    const userIndex = users.findIndex(user => user.email === userEmail);
    
    if (userIndex !== -1) {
      const user = users[userIndex];
      if (user.teams) {
        user.teams = user.teams.filter(id => id !== teamId);
        users[userIndex] = user;
        localStorage.setItem('thebridge_users', JSON.stringify(users));
        
        // Update current user if it's the same user
        if (window.currentUser && window.currentUser.email === userEmail) {
          window.currentUser = user;
          localStorage.setItem('thebridge_current_user', JSON.stringify(user));
        }
        
        console.log(`✅ User ${userEmail} removed from team ${teamId}`);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error removing user from team:', error);
    return false;
  }
}

async function getTeamProfile(teamId) {
  try {
    console.log('🔍 Getting team profile for:', teamId);
    
    // 1. First try localStorage
    const teams = JSON.parse(localStorage.getItem('thebridge_teams') || '{}');
    const team = teams[teamId];
    if (team) {
      console.log('✅ Team found in localStorage:', teamId);
      return team;
    }
    
    // 2. Try OneDrive if authenticated
    if (await shouldUseOneDriveAsBackend()) {
      try {
        console.log('☁️ Trying to load team from OneDrive:', teamId);
        const fileName = `team-${teamId}.json`;
        const teamData = await loadFromUnifiedBackend(fileName, {
          teamId: teamId,
          userEmail: window.currentUser?.email || 'admin@example.com',
          fileType: 'teams'
        });
        
        if (teamData && teamData.id) {
          console.log('✅ Team found in OneDrive:', teamId);
          // Cache in localStorage for future access
          teams[teamId] = teamData;
          localStorage.setItem('thebridge_teams', JSON.stringify(teams));
          return teamData;
        }
      } catch (error) {
        console.warn('⚠️ Could not load team from OneDrive:', error);
      }
    }
    
    // 3. If not found, try IndexedDB
    const indexedDBTeam = await getTeamFromIndexedDB(teamId);
    if (indexedDBTeam) {
      console.log('✅ Team found in IndexedDB:', teamId);
      // Restore to localStorage for consistency
      teams[teamId] = indexedDBTeam;
      localStorage.setItem('thebridge_teams', JSON.stringify(teams));
      return indexedDBTeam;
    }
    
    // 4. If not found, try cookies
    const cookieTeam = getTeamFromCookies(teamId);
    if (cookieTeam) {
      console.log('✅ Team found in cookies:', teamId);
      // Restore to localStorage for consistency
      teams[teamId] = cookieTeam;
      localStorage.setItem('thebridge_teams', JSON.stringify(teams));
      return cookieTeam;
    }
    
    console.log('❌ Team not found anywhere:', teamId);
    return null;
  } catch (error) {
    console.error('❌ Error getting team profile:', error);
    return null;
  }
}

async function getAllTeams() {
  try {
    console.log('🔍 Getting all teams...');
    
    // 1. First try to load from OneDrive if available
    if (await shouldUseOneDriveAsBackend()) {
      try {
        console.log('☁️ Loading teams from OneDrive...');
        const teams = await loadTeamsFromOneDrive();
        if (teams && teams.length > 0) {
          console.log('✅ Teams loaded from OneDrive:', teams.length);
          return teams;
        }
      } catch (error) {
        console.warn('⚠️ Could not load teams from OneDrive:', error);
      }
    }
    
    // 2. Fallback to localStorage
    const teamsData = localStorage.getItem('thebridge_teams');
    console.log('🔍 Raw teams data from localStorage:', teamsData);
    
    const teams = JSON.parse(teamsData || '{}');
    console.log('🔍 Parsed teams object:', teams);
    
    const teamValues = Object.values(teams);
    console.log('🔍 Team values array:', teamValues);
    
    return teamValues;
  } catch (error) {
    console.error('Error getting all teams:', error);
    return [];
  }
}

// Load teams from OneDrive
async function loadTeamsFromOneDrive() {
  try {
    if (!window.OneDriveCustomPathIntegration) {
      throw new Error('OneDrive integration not available');
    }
    
    const onedrive = new window.OneDriveCustomPathIntegration();
    if (!onedrive.isAuthenticated) {
      throw new Error('OneDrive not authenticated');
    }
    
    const folderPath = getOneDrivePath('teams');
    const teams = [];
    
    // Try to load team files from OneDrive
    try {
      const teamFiles = await onedrive.listFiles(folderPath);
      
      for (const file of teamFiles) {
        if (file.name.endsWith('.json') && file.name.startsWith('team-')) {
          try {
            const content = await onedrive.loadFile(`${folderPath}/${file.name}`);
            const teamData = JSON.parse(content);
            teams.push(teamData);
          } catch (error) {
            console.warn('⚠️ Could not load team file:', file.name, error);
          }
        }
      }
    } catch (error) {
      console.warn('⚠️ Could not list team files from OneDrive:', error);
    }
    
    return teams;
  } catch (error) {
    console.error('❌ Error loading teams from OneDrive:', error);
    throw error;
  }
}

async function getTeamByCode(teamCode) {
  const teams = await getAllTeams();
  return teams.find(team => team.code === teamCode);
}

async function getTeamByIdentifier(identifier) {
  const teams = await getAllTeams();
  return teams.find(team => 
    team.name.toLowerCase() === identifier.toLowerCase() || 
    team.code === identifier
  );
}

// Team authentication functions
function generateTeamId() {
  return 'team_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function hashPassword(password) {
  // Simple hash for demo - in production use bcrypt or similar
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

function validatePassword(password) {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password);
}

// Team profile creation (simplified - no backend dependency)
function setupTeamProfileModal() {
  const modal = document.getElementById('teamProfileModal');
  const closeBtn = document.getElementById('closeTeamProfileBtn');
  const createBtn = document.getElementById('createTeamProfileBtn');
  const testBtn = document.getElementById('testTeamConfigBtn');
  const storageSelect = document.getElementById('teamStorageLocationSelect');
  const customPathSection = document.getElementById('teamCustomPathSection');
  const customPathInput = document.getElementById('teamCustomPathInput');
  const statusDiv = document.getElementById('teamProfileStatus');

  if (!modal || !closeBtn || !createBtn) {
    console.log('❌ Required team profile modal elements not found');
    return;
  }

  console.log('✅ Setting up team profile modal...');

  // Close modal
  closeBtn.onclick = () => {
    window.closeModalProperly(modal);
  };

  // Always show custom path section since it's the only option
  if (customPathSection) {
    customPathSection.style.display = 'block';
  }
  
  // Show/hide custom path section (keep for compatibility)
  if (storageSelect) {
  storageSelect.onchange = () => {
    if (storageSelect.value === 'custom') {
      customPathSection.style.display = 'block';
    } else {
      customPathSection.style.display = 'none';
    }
  };
  }

  // Select folder button functionality (simplified for OneDrive)
  const selectFolderBtn = document.getElementById('selectTeamFolderBtn');
  if (selectFolderBtn) {
    selectFolderBtn.onclick = async () => {
      try {
        statusDiv.textContent = 'Configuring OneDrive folder...';
        statusDiv.style.color = '#1976d2';
        
        // Set default OneDrive path
        const defaultPath = 'TheBridge/Data';
        customPathInput.value = defaultPath;
        statusDiv.textContent = `✅ OneDrive folder configured: ${defaultPath}`;
          statusDiv.style.color = '#10B981';
        console.log('✅ OneDrive folder configured:', defaultPath);
        
      } catch (error) {
        console.error('Error configuring OneDrive folder:', error);
        statusDiv.textContent = '❌ Error configuring OneDrive folder';
        statusDiv.style.color = '#d32f2f';
      }
    };
  }

  // Test configuration (simplified for OneDrive)
  if (testBtn) {
  testBtn.onclick = async () => {
      const customPath = customPathInput.value || 'TheBridge/Data';
    
      statusDiv.textContent = 'Testing OneDrive configuration...';
    statusDiv.style.color = '#1976d2';

    try {
        // Test OneDrive connection
        if (typeof OneDriveCustomPathIntegration !== 'undefined' && window.oneDriveAccessToken) {
          const onedrive = new OneDriveCustomPathIntegration();
          onedrive.accessToken = window.oneDriveAccessToken;
          
          // Test folder creation
          await onedrive.ensureFolder(customPath);
          
          statusDiv.textContent = `✅ OneDrive configuration test successful! Path: ${customPath}`;
        statusDiv.style.color = '#10B981';
      } else {
          statusDiv.textContent = '❌ OneDrive not available or not authenticated';
        statusDiv.style.color = '#d32f2f';
      }
    } catch (error) {
        console.error('Error testing OneDrive configuration:', error);
        statusDiv.textContent = `❌ OneDrive configuration test failed: ${error.message}`;
        statusDiv.style.color = '#d32f2f';
    }
  };
  }

  // Create team profile
  createBtn.onclick = async () => {
    const teamName = document.getElementById('teamNameInput').value.trim();
    const adminEmail = document.getElementById('adminEmailInput').value.trim();

    // Validation
    if (!teamName) {
      statusDiv.textContent = '❌ Team name is required';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    if (!adminEmail || !isValidEmail(adminEmail)) {
      statusDiv.textContent = '❌ Valid email is required';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    // Check if team name already exists
    try {
      const existingTeam = await getTeamByIdentifier(teamName);
      if (existingTeam) {
        statusDiv.textContent = '❌ Team name already exists';
      statusDiv.style.color = '#d32f2f';
      return;
    }
    } catch (error) {
      console.error('Error checking team name:', error);
      statusDiv.textContent = '❌ Error checking team name';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    statusDiv.textContent = 'Creating team profile...';
    statusDiv.style.color = '#1976d2';

    try {
      // Generate team ID
      const teamId = generateTeamId();
      
      // Create team profile
        const teamData = {
        id: teamId,
          name: teamName,
        code: teamName.replace(/\s+/g, '').toUpperCase().substring(0, 6), // Auto-generate code from name
        description: `Team workspace for ${teamName}`,
          adminEmail: adminEmail,
          createdAt: new Date().toISOString(),
          members: [{
            email: adminEmail,
          name: adminEmail.split('@')[0], // Use email prefix as name
            role: 'admin',
            joinedAt: new Date().toISOString()
          }]
        };

      // Save team profile (will work even if OneDrive fails)
      const saveResult = await saveTeamProfile(teamData);
      
          // Add admin user to the team
          addUserToTeam(adminEmail, teamData.id);
          
          // Set team session with admin user
          const adminUser = {
            email: adminEmail,
        name: adminEmail.split('@')[0],
        role: 'admin',
        teamId: teamId,
        teamName: teamName
      };
      
      // Set current user and team
      window.currentUser = adminUser;
      window.currentTeam = teamData;
      
      // Save to localStorage
      localStorage.setItem('thebridge_current_user', JSON.stringify(adminUser));
      localStorage.setItem('thebridge_current_team', JSON.stringify(teamData));
      
      // Show success message (even if OneDrive failed)
      if (saveResult) {
        statusDiv.textContent = '✅ Team created successfully!';
        statusDiv.style.color = '#10B981';
        } else {
        statusDiv.textContent = '✅ Team created (local storage only)';
        statusDiv.style.color = '#FF9800';
      }
      
      // Close modal and show main interface
      setTimeout(async () => {
        window.closeModalProperly(modal);
        await updateTeamManagementButtonText();
        showMainInterface();
      }, 1500);
      
    } catch (error) {
      console.error('Error creating team:', error);
      statusDiv.textContent = '❌ Error creating team profile';
      statusDiv.style.color = '#d32f2f';
    }
  };
}

// Team login modal
function setupTeamLoginModal() {
  console.log('Setting up team login modal...');
  const modal = document.getElementById('teamLoginModal');
  const closeBtn = document.getElementById('closeTeamLoginBtn');
  const loginBtn = document.getElementById('teamLoginBtn');
  const joinBtn = document.getElementById('teamJoinBtn');
  const loginTab = document.getElementById('teamLoginTab');
  const joinTab = document.getElementById('teamJoinTab');
  const loginPanel = document.getElementById('teamLoginPanel');
  const joinPanel = document.getElementById('teamJoinPanel');
  const statusDiv = document.getElementById('teamLoginStatus');

  console.log('Elements found:', {
    modal: !!modal,
    closeBtn: !!closeBtn,
    loginBtn: !!loginBtn,
    joinBtn: !!joinBtn,
    loginTab: !!loginTab,
    joinTab: !!joinTab,
    loginPanel: !!loginPanel,
    joinPanel: !!joinPanel,
    statusDiv: !!statusDiv
  });

  if (!modal || !closeBtn || !loginBtn || !joinBtn || !loginTab || !joinTab || !loginPanel || !joinPanel || !statusDiv) {
    console.log('Some elements not found, returning early');
    return;
  }

  // Close modal
  closeBtn.onclick = () => {
    window.closeModalProperly(modal);
  };

  // Close modal when clicking outside
  modal.onclick = (e) => {
    if (e.target === modal) {
      window.closeModalProperly(modal);
    }
  };

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      window.closeModalProperly(modal);
    }
  });

  // Tab switching
  loginTab.addEventListener('click', (e) => {
    console.log('Access Team tab clicked via addEventListener');
    e.preventDefault();
    e.stopPropagation();
    loginTab.classList.add('active');
    loginTab.style.color = '#E8F4F8';
    loginTab.style.borderBottomColor = '#47B2E5';
    joinTab.classList.remove('active');
    joinTab.style.color = '#B0BEC5';
    joinTab.style.borderBottomColor = 'transparent';
    loginPanel.style.display = 'block';
    joinPanel.style.display = 'none';
    loginBtn.style.display = 'block';
    joinBtn.style.display = 'none';
  });

  joinTab.addEventListener('click', (e) => {
    console.log('Join New Team tab clicked via addEventListener');
    e.preventDefault();
    e.stopPropagation();
    joinTab.classList.add('active');
    joinTab.style.color = '#E8F4F8';
    joinTab.style.borderBottomColor = '#47B2E5';
    loginTab.classList.remove('active');
    loginTab.style.color = '#B0BEC5';
    loginTab.style.borderBottomColor = 'transparent';
    joinPanel.style.display = 'block';
    loginPanel.style.display = 'none';
    joinBtn.style.display = 'block';
    loginBtn.style.display = 'none';
  });



  // Team access
  loginBtn.onclick = async () => {
    console.log('🔍 Access Team button clicked!');
    
    const teamSelect = document.getElementById('teamLoginSelect');
    const emailInput = document.getElementById('teamLoginEmail');
    const email = emailInput.value.trim();

    console.log('🔍 Team Access Debug:', {
      teamSelectValue: teamSelect.value,
      teamSelectText: teamSelect.options[teamSelect.selectedIndex]?.text,
      email: email,
      emailReadOnly: emailInput.readOnly,
      teamSelectExists: !!teamSelect,
      emailInputExists: !!emailInput
    });

    if (!teamSelect.value) {
      statusDiv.textContent = '❌ Please select a team';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    // If email is not pre-filled (user not logged in), require it
    if (!email && !emailInput.readOnly) {
      statusDiv.textContent = '❌ Please enter your email';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    // If email is pre-filled but empty, this shouldn't happen but handle it
    if (!email) {
      statusDiv.textContent = '❌ Email is required';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    if (!isValidEmail(email)) {
      statusDiv.textContent = '❌ Please enter a valid email address';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    // Handle Guest Team access
    if (teamSelect.value === 'guest-team') {
      console.log('🔍 Guest Team access requested');
      
      // Create guest user if not exists
      const guestUser = {
        email: email,
        name: email.split('@')[0].toUpperCase(),
        role: 'guest',
        joinedAt: new Date().toISOString()
      };
      
      // Create guest team
      const guestTeam = {
        id: 'guest-team',
        name: 'Guest Team',
        code: 'GUEST',
        description: 'Temporary guest access',
        createdAt: new Date().toISOString(),
        members: [guestUser]
      };
      
      // Set guest session
      setTeamSession(guestTeam, guestUser);
      
      statusDiv.textContent = '✅ Guest access granted!';
      statusDiv.style.color = '#10B981';
      
      setTimeout(() => {
        window.closeModalProperly(modal);
        showNotification('Welcome to Guest Team!', 'success');
      }, 1000);
      
      return;
    }

    const team = await getTeamProfile(teamSelect.value);
    console.log('🔍 Team Lookup:', {
      teamId: teamSelect.value,
      teamFound: !!team,
      teamData: team
    });
    
    if (!team) {
      statusDiv.textContent = '❌ Team not found';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    // Check if user is a member
    const member = team.members.find(m => m.email.toLowerCase() === email.toLowerCase());
    if (!member) {
      statusDiv.textContent = '❌ You are not a member of this team';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    // Direct access without password
    console.log('🔍 Setting team session for:', team.name, 'with member:', member.email);
    setTeamSession(team, member);
    
    statusDiv.textContent = '✅ Team access granted!';
    statusDiv.style.color = '#10B981';
    console.log('✅ Team access granted successfully');
    
    // Auto-load configurations from backend
    setTimeout(async () => {
      try {
        console.log('🔄 Auto-loading configurations for team:', team.name);
        statusDiv.textContent = '🔄 Loading your configurations...';
        statusDiv.style.color = '#FFC107';
        
        await autoLoadTeamConfigurations(team.id, member.email);
        
        statusDiv.textContent = '✅ Configurations loaded!';
        statusDiv.style.color = '#10B981';
        
        setTimeout(() => {
          window.closeModalProperly(modal);
          showNotification(`Welcome to team "${team.name}"! Configurations loaded.`, 'success');
        }, 1000);
        
      } catch (error) {
        console.error('❌ Error auto-loading configurations:', error);
        statusDiv.textContent = '✅ Team access granted! (No saved configurations)';
        statusDiv.style.color = '#10B981';
        
        setTimeout(() => {
          window.closeModalProperly(modal);
          showNotification(`Welcome to team "${team.name}"!`, 'success');
        }, 1000);
      }
    }, 500);
  };

  console.log('Team login modal setup complete');

  // Join new team
  joinBtn.onclick = async () => {
    const teamCode = document.getElementById('teamJoinCode').value.trim();
    const email = document.getElementById('teamJoinEmail').value.trim();
    const name = document.getElementById('teamJoinName').value.trim();
    const password = document.getElementById('teamJoinPassword').value;
    // Force users to always be 'user' role when joining teams
    const selectedRole = 'user';

    if (!teamCode || !email || !name || !password) {
      statusDiv.textContent = '❌ All fields are required';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    if (!isValidEmail(email)) {
      statusDiv.textContent = '❌ Valid email is required';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    if (!validatePassword(password)) {
      statusDiv.textContent = '❌ Password must be at least 8 characters with uppercase, lowercase, and number';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    const team = getTeamByCode(teamCode);
    if (!team) {
      statusDiv.textContent = '❌ Invalid team code';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    // Check if user is already a member
    const existingMember = team.members.find(m => m.email.toLowerCase() === email.toLowerCase());
    if (existingMember) {
      statusDiv.textContent = '❌ You are already a member of this team';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    // Add new member
    team.members.push({
      email: email,
      name: name,
      role: selectedRole,
      joinedAt: new Date().toISOString()
    });

    if (await saveTeamProfile(team)) {
      // Add user to the team
      addUserToTeam(email, team.id);
      
      const newUser = {
        email: email,
        name: name,
        role: selectedRole
      };
      setTeamSession(team, newUser);
      
      statusDiv.textContent = '✅ Successfully joined team!';
      statusDiv.style.color = '#10B981';
      
      setTimeout(() => {
        modal.classList.add('hidden');
        setTimeout(() => modal.style.display = 'none', 300);
        showNotification(`Welcome to team "${team.name}"!`, 'success');
      }, 1000);
    } else {
      statusDiv.textContent = '❌ Error joining team';
      statusDiv.style.color = '#d32f2f';
    }
  };

  // Create team - Get the button element first (FIXED VERSION)
  const createBtn = document.getElementById('teamCreateBtn');
  if (createBtn) {
  createBtn.onclick = async () => {
    const teamName = document.getElementById('teamCreateName').value.trim();
    const teamCode = document.getElementById('teamCreateCode').value.trim();
    const teamDescription = document.getElementById('teamCreateDescription').value.trim();
    const adminEmail = document.getElementById('teamCreateEmail').value.trim();
    const adminName = document.getElementById('teamCreateAdminName').value.trim();
    const password = document.getElementById('teamCreatePassword').value;
    const passwordConfirm = document.getElementById('teamCreatePasswordConfirm').value;

    if (!teamName || !teamCode || !adminEmail || !adminName || !password || !passwordConfirm) {
      statusDiv.textContent = '❌ All fields are required';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    if (!isValidEmail(adminEmail)) {
      statusDiv.textContent = '❌ Valid email is required';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    if (password !== passwordConfirm) {
      statusDiv.textContent = '❌ Passwords do not match';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    if (!validatePassword(password)) {
      statusDiv.textContent = '❌ Password must be at least 8 characters with uppercase, lowercase, and number';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    // Check if team code already exists
    const existingTeam = getTeamByCode(teamCode);
    if (existingTeam) {
      statusDiv.textContent = '❌ Team code already exists';
      statusDiv.style.color = '#d32f2f';
      return;
    }

    // Create new team
    const newTeam = {
      id: generateTeamId(),
      name: teamName,
      code: teamCode,
      description: teamDescription,
      createdAt: new Date().toISOString(),
      members: [{
        email: adminEmail,
        name: adminName,
        role: 'admin',
        joinedAt: new Date().toISOString()
      }]
    };

    if (await saveTeamProfile(newTeam)) {
      // Add admin user to the team
      addUserToTeam(adminEmail, newTeam.id);
      
      const newUser = {
        email: adminEmail,
        name: adminName,
        role: 'admin'
      };
      setTeamSession(newTeam, newUser);
      
      statusDiv.textContent = '✅ Team created successfully!';
      statusDiv.style.color = '#10B981';
      
      setTimeout(() => {
        modal.classList.add('hidden');
        setTimeout(() => modal.style.display = 'none', 300);
        showNotification(`Team "${teamName}" created successfully!`, 'success');
      }, 1000);
    } else {
      statusDiv.textContent = '❌ Error creating team';
      statusDiv.style.color = '#d32f2f';
    }
  };
  }
}

// Show team profile modal
function showTeamProfileModal() {
  const modal = document.getElementById('teamProfileModal');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
    
    // Clear form with null checks - only clear elements that exist
    const teamNameInput = document.getElementById('teamNameInput');
    const adminEmailInput = document.getElementById('adminEmailInput');
    const teamProfileStatus = document.getElementById('teamProfileStatus');
    
    if (teamNameInput) teamNameInput.value = '';
    if (adminEmailInput) adminEmailInput.value = '';
    if (teamProfileStatus) teamProfileStatus.textContent = '';
    
    console.log('✅ Team profile modal shown successfully');
  } else {
    console.error('❌ Team profile modal not found');
  }
}

// Show team management menu
function showTeamManagementMenu() {
  const options = [
    { text: 'Switch Team', action: () => showTeamLoginModal() },
    { text: 'Create New Team', action: () => showTeamProfileModal() },
    { text: 'Sync Configuration', action: () => showOneDriveConfiguration() },
    { text: 'Logout', action: async () => await clearTeamSession() }
  ];
  
  // Only show admin options for admins
  if (window.currentUser && window.currentUser.role === 'admin') {
    options.splice(3, 0, { text: 'Invite Member', action: () => showInviteMemberModal() });
            options.splice(3, 0, { text: 'Edit Team Code', action: async () => await showEditTeamCodeModal() });
  }
  
  // Create a simple dropdown menu
  const menu = document.createElement('div');
  menu.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1a2332;
    border: 1px solid rgba(71, 178, 229, 0.3);
    border-radius: 8px;
    padding: 1rem;
    z-index: 10000;
    min-width: 200px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;
  
  menu.innerHTML = `
    <div style="color: #E8F4F8; font-weight: 600; margin-bottom: 1rem; text-align: center;">
      Team Management
    </div>
    ${options.map(option => `
      <button style="
        width: 100%;
        padding: 0.75rem;
        margin: 0.25rem 0;
        background: rgba(71, 178, 229, 0.1);
        border: 1px solid rgba(71, 178, 229, 0.3);
        color: #47B2E5;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.9rem;
      " onmouseover="this.style.background='rgba(71, 178, 229, 0.2)'" 
         onmouseout="this.style.background='rgba(71, 178, 229, 0.1)'">
        ${option.text}
      </button>
    `).join('')}
    <button style="
      width: 100%;
      padding: 0.75rem;
      margin: 0.25rem 0;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #B0BEC5;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.9rem;
    " onclick="this.parentElement.remove()">
      Cancel
    </button>
  `;
  
  // Add click handlers
  const buttons = menu.querySelectorAll('button');
  buttons.forEach((button, index) => {
    if (index < options.length) {
      button.onclick = () => {
        menu.remove();
        options[index].action();
      };
    }
  });
  
  // Add backdrop
  const backdrop = document.createElement('div');
  backdrop.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  `;
  backdrop.onclick = () => {
    backdrop.remove();
    menu.remove();
  };
  
  document.body.appendChild(backdrop);
  document.body.appendChild(menu);
}

// Show edit team code modal
async function showEditTeamCodeModal() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;
  
  modal.innerHTML = `
    <div style="
      background: #1a2332;
      border: 1px solid rgba(71, 178, 229, 0.3);
      border-radius: 12px;
      padding: 2rem;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    ">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h3 style="color: #E8F4F8; margin: 0; font-size: 1.5rem;">Edit Team Code</h3>
        <button id="closeEditCodeModal" style="
          background: none;
          border: none;
          color: #B0BEC5;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">×</button>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500;">Current Team Code</label>
        <div style="
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 0.75rem;
          color: #E8F4F8;
          font-weight: 500;
          margin-bottom: 1rem;
        ">${window.currentTeam.code || 'No code set'}</div>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500;">New Team Code</label>
        <input type="text" id="newTeamCode" placeholder="e.g., OPS001, DQ002" style="
          width: 100%;
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid rgba(71, 178, 229, 0.3);
          background: rgba(26, 35, 50, 0.8);
          color: #E8F4F8;
          font-size: 1rem;
        ">
        <div style="font-size:0.9em; color:#B0BEC5; margin-top:0.5rem;">
          Enter a short, unique code for your team (3-10 characters recommended)
        </div>
      </div>
      
      <div id="editCodeStatus" style="margin-bottom: 1rem; font-size: 0.9rem;"></div>
      
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button id="cancelEditCode" style="
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #B0BEC5;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        ">Cancel</button>
        <button id="saveTeamCode" style="
          background: linear-gradient(135deg, #47B2E5 0%, #1976d2 100%);
          border: none;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        ">Save Code</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add event listeners
  const closeBtn = modal.querySelector('#closeEditCodeModal');
  const cancelBtn = modal.querySelector('#cancelEditCode');
  const saveBtn = modal.querySelector('#saveTeamCode');
  const newCodeInput = modal.querySelector('#newTeamCode');
  const statusDiv = modal.querySelector('#editCodeStatus');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modal.remove();
    });
  }
  
  if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      const newCode = newCodeInput.value.trim();
      
      if (!newCode) {
        statusDiv.textContent = '❌ Team code is required';
        statusDiv.style.color = '#d32f2f';
        return;
      }
      
      if (newCode.length < 3) {
        statusDiv.textContent = '❌ Team code must be at least 3 characters';
        statusDiv.style.color = '#d32f2f';
        return;
      }
      
      if (newCode.length > 20) {
        statusDiv.textContent = '❌ Team code must be less than 20 characters';
        statusDiv.style.color = '#d32f2f';
        return;
      }
      
      // Check if code is already used by another team
      const existingTeam = getTeamByCode(newCode);
      if (existingTeam && existingTeam.id !== window.currentTeam.id) {
        statusDiv.textContent = '❌ This team code is already in use';
        statusDiv.style.color = '#d32f2f';
        return;
      }
      
      // Update team code
      window.currentTeam.code = newCode;
      
      if (await saveTeamProfile(window.currentTeam)) {
        statusDiv.textContent = '✅ Team code updated successfully!';
        statusDiv.style.color = '#10B981';
        
        if (typeof window.showUnifiedNotification === 'function') {
          window.showUnifiedNotification('Team code updated successfully!', 'success');
        }
        
        setTimeout(() => {
          modal.remove();
        }, 1500);
      } else {
        statusDiv.textContent = '❌ Error updating team code';
        statusDiv.style.color = '#d32f2f';
      }
    });
  }
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Show invite member modal
function showInviteMemberModal() {
  // Create modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;
  
  modal.innerHTML = `
    <div style="
      background: #1a2332;
      border: 1px solid rgba(71, 178, 229, 0.3);
      border-radius: 12px;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    ">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h3 style="color: #E8F4F8; margin: 0; font-size: 1.5rem;">Invite Member to ${window.currentTeam.name}</h3>
        <button id="closeInviteModalHeader" style="
          background: none;
          border: none;
          color: #B0BEC5;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">×</button>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500;">Team Code</label>
        <div style="
          background: rgba(71, 178, 229, 0.1);
          border: 1px solid rgba(71, 178, 229, 0.3);
          border-radius: 6px;
          padding: 0.75rem;
          color: #47B2E5;
          font-weight: 600;
          font-family: monospace;
          font-size: 1.1rem;
          text-align: center;
          margin-bottom: 1rem;
        ">${window.currentTeam.code || 'No code set'}</div>
        <p style="color: #B0BEC5; font-size: 0.9rem; margin: 0;">
          Share this code with the person you want to invite. They can use it to join your team.
        </p>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500;">Team Name</label>
        <div style="
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 0.75rem;
          color: #E8F4F8;
          font-weight: 500;
        ">${window.currentTeam.name}</div>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500;">Invite as Role</label>
        <div style="display: flex; gap: 0.5rem;">
          <label style="
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 6px;
            color: #10B981;
            cursor: pointer;
            flex: 1;
          ">
            <input type="radio" name="inviteRole" value="user" checked style="margin: 0;">
            <span>User</span>
          </label>
          <label style="
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            background: rgba(71, 178, 229, 0.1);
            border: 1px solid rgba(71, 178, 229, 0.3);
            border-radius: 6px;
            color: #47B2E5;
            cursor: pointer;
            flex: 1;
          ">
            <input type="radio" name="inviteRole" value="admin" style="margin: 0;">
            <span>Admin</span>
          </label>
        </div>
        <p style="color: #B0BEC5; font-size: 0.8rem; margin: 0.5rem 0 0 0;">
          Select the role for the new member. Admins can invite others and manage the team.
        </p>
        <div style="
          background: rgba(71, 178, 229, 0.1);
          border: 1px solid rgba(71, 178, 229, 0.3);
          border-radius: 6px;
          padding: 0.75rem;
          margin-top: 1rem;
        ">
          <p style="color: #47B2E5; font-size: 0.8rem; margin: 0; font-weight: 500;">
            💡 Note: The invited person can choose their role during the join process, but this selection serves as a recommendation.
          </p>
        </div>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500;">Current Members</label>
        <div style="max-height: 150px; overflow-y: auto;">
          ${window.currentTeam.members.map(member => `
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0.5rem;
              margin: 0.25rem 0;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 4px;
              border-left: 3px solid ${member.role === 'admin' ? '#47B2E5' : '#10B981'};
            ">
              <div>
                <div style="color: #E8F4F8; font-weight: 500;">${member.name}</div>
                <div style="color: #B0BEC5; font-size: 0.8rem;">${member.email}</div>
              </div>
              <span style="
                background: ${member.role === 'admin' ? 'rgba(71, 178, 229, 0.2)' : 'rgba(16, 185, 129, 0.2)'};
                color: ${member.role === 'admin' ? '#47B2E5' : '#10B981'};
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                font-weight: 500;
              ">${member.role}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button id="closeInviteModal" style="
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #B0BEC5;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        ">Close</button>
        <button id="copyInviteInfo" style="
          background: linear-gradient(135deg, #47B2E5 0%, #1976d2 100%);
          border: none;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        ">Copy Invite Info</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add event listeners
  const closeBtn = modal.querySelector('#closeInviteModal');
  const closeHeaderBtn = modal.querySelector('#closeInviteModalHeader');
  const copyBtn = modal.querySelector('#copyInviteInfo');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
  }
  
  if (closeHeaderBtn) {
    closeHeaderBtn.addEventListener('click', () => {
      modal.remove();
    });
  }
  
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyTeamInviteInfo();
    });
  }
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Copy team invite information to clipboard
function copyTeamInviteInfo() {
  // Get selected role
  const selectedRole = document.querySelector('input[name="inviteRole"]:checked')?.value || 'user';
  const roleText = selectedRole === 'admin' ? 'Admin' : 'User';
  
  const inviteText = `Join my team on The Bridge!

Team Name: ${window.currentTeam.name}
Team Code: ${window.currentTeam.code || 'No code set'}
Invited Role: ${roleText}

To join:
1. Open The Bridge application
2. Click "Team Login" on the welcome screen
3. Enter the team code above
4. Fill in your details and join!

${window.currentTeam.description ? `Description: ${window.currentTeam.description}` : ''}

Note: You will be added as a ${roleText.toLowerCase()}. ${selectedRole === 'admin' ? 'As an admin, you can invite other members and manage the team.' : 'As a user, you can view and work with team data.'}`;

  navigator.clipboard.writeText(inviteText).then(() => {
    if (typeof window.showUnifiedNotification === 'function') {
      window.showUnifiedNotification(`Invite information copied to clipboard! (${roleText} role)`, 'success');
    } else {
      console.log(`Invite information copied to clipboard! (${roleText} role)`);
    }
  }).catch(() => {
    if (typeof window.showUnifiedNotification === 'function') {
      window.showUnifiedNotification('Failed to copy to clipboard', 'error');
    } else {
      console.error('Failed to copy to clipboard');
    }
  });
}

// Show team login modal
async function showTeamLoginModal() {
  console.log('Showing team login modal...');
  const modal = document.getElementById('teamLoginModal');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
    
    // Ensure modal is properly positioned and clickable
    modal.style.zIndex = '9999';
    modal.style.pointerEvents = 'auto';
    
    // Ensure modal panel is clickable
    const modalPanel = modal.querySelector('.modal-panel');
    if (modalPanel) {
      modalPanel.style.pointerEvents = 'auto';
      modalPanel.style.zIndex = '10000';
    }
    
    // Clear form (but don't clear team select - it will be populated by loadTeamsIntoDropdown)
    document.getElementById('teamJoinCode').value = '';
    document.getElementById('teamJoinName').value = '';
    document.getElementById('teamJoinPassword').value = '';
    // Reset role selection to default
    const userRoleRadio = document.querySelector('input[name="joinRole"][value="user"]');
    if (userRoleRadio) userRoleRadio.checked = true;
    document.getElementById('teamLoginStatus').textContent = '';
    
    // Check if user is already logged in and pre-fill email
    const currentUser = getCurrentUserEmail();
    const teamLoginEmail = document.getElementById('teamLoginEmail');
    const teamJoinEmail = document.getElementById('teamJoinEmail');
    
    if (currentUser) {
      // User is logged in, pre-fill email fields
      if (teamLoginEmail) {
        teamLoginEmail.value = currentUser;
        teamLoginEmail.readOnly = true;
        teamLoginEmail.style.backgroundColor = 'rgba(71, 178, 229, 0.1)';
        teamLoginEmail.style.color = '#47B2E5';
        teamLoginEmail.title = 'Email pre-filled from your login session';
      }
      if (teamJoinEmail) {
        teamJoinEmail.value = currentUser;
        teamJoinEmail.readOnly = true;
        teamJoinEmail.style.backgroundColor = 'rgba(71, 178, 229, 0.1)';
        teamJoinEmail.style.color = '#47B2E5';
        teamJoinEmail.title = 'Email pre-filled from your login session';
      }
    } else {
      // User is not logged in, clear and enable email fields
      if (teamLoginEmail) {
        teamLoginEmail.value = '';
        teamLoginEmail.readOnly = false;
        teamLoginEmail.style.backgroundColor = 'rgba(26, 35, 50, 0.8)';
        teamLoginEmail.style.color = '#E8F4F8';
        teamLoginEmail.title = '';
      }
      if (teamJoinEmail) {
        teamJoinEmail.value = '';
        teamJoinEmail.readOnly = false;
        teamJoinEmail.style.backgroundColor = 'rgba(26, 35, 50, 0.8)';
        teamJoinEmail.style.color = '#E8F4F8';
        teamJoinEmail.title = '';
      }
    }
    
    // Load teams into dropdown (only if not already loaded)
    const teamSelect = document.getElementById('teamLoginSelect');
    if (teamSelect && teamSelect.options.length <= 1) {
      await loadTeamsIntoDropdown();
    } else {
      console.log('✅ Teams already loaded in dropdown, skipping reload');
    }
    
    // Show login tab by default
    const loginTab = document.getElementById('teamLoginTab');
    const joinTab = document.getElementById('teamJoinTab');
    
    console.log('Tabs found when showing modal:', {
      loginTab: !!loginTab,
      joinTab: !!joinTab
    });
    
    if (loginTab) {
      console.log('Access Team tab found, clicking it...');
      loginTab.click();
    } else {
      console.log('Access Team tab not found!');
    }
  } else {
    console.log('Modal not found!');
  }
}

// Load teams into dropdown
async function loadTeamsIntoDropdown() {
  const teamSelect = document.getElementById('teamLoginSelect');
  if (!teamSelect) return;
  
  // Store current selection if any
  const currentValue = teamSelect.value;
  const currentText = teamSelect.options[teamSelect.selectedIndex]?.text;
  
  // Clear existing options
  teamSelect.innerHTML = '<option value="">Select your team...</option>';
  
  // Get all teams
  const teams = getAllTeams();
  
  console.log('🔍 Available teams:', teams);
  
  // Create a test team if no teams exist (for debugging)
  if (teams.length === 0) {
    console.log('🔧 Creating test team for debugging...');
    const testTeam = {
      id: 'test_team_1',
      name: 'Test Team',
      code: 'TEST',
      description: 'Test team for debugging',
      createdAt: new Date().toISOString(),
      members: [{
        email: 'pablo@gmail.com',
        name: 'Pablo',
        role: 'admin',
        joinedAt: new Date().toISOString()
      }]
    };
    
    await saveTeamProfile(testTeam);
    teams.push(testTeam);
    console.log('✅ Test team created:', testTeam);
  }
  
  if (teams.length === 0) {
    teamSelect.innerHTML = '<option value="">No teams available</option>';
    return;
  }
  
  // Add Guest Team option first
  const guestOption = document.createElement('option');
  guestOption.value = 'guest-team';
  guestOption.textContent = 'Guest Team (GUEST)';
  teamSelect.appendChild(guestOption);
  
  // Add teams to dropdown
  teams.forEach(team => {
    const option = document.createElement('option');
    option.value = team.id;
    option.textContent = `${team.name} (${team.code})`;
    teamSelect.appendChild(option);
  });
  
  // Restore previous selection if it still exists
  if (currentValue && teams.some(team => team.id === currentValue)) {
    teamSelect.value = currentValue;
    console.log(`✅ Restored previous selection: ${currentText}`);
  }
  
  // Log final state
  console.log(`🔍 Final dropdown state: value="${teamSelect.value}", text="${teamSelect.options[teamSelect.selectedIndex]?.text}"`);
  
  console.log(`✅ Loaded ${teams.length} teams into dropdown`);
}

// Team session management
async function setTeamSession(team, user) {
  window.currentTeam = team;
  window.currentUser = user;
  window.teamBackendConnected = true;
  
  // Set login type if not already set
  if (!user.loginType) {
    user.loginType = getCurrentLoginType();
  }
  
  // Save session to localStorage
  localStorage.setItem('thebridge_current_team', JSON.stringify(team));
  localStorage.setItem('thebridge_current_user', JSON.stringify(user));
  
  // Load user profile and settings
  try {
    const userProfile = await loadUserProfile(user.email, team.id);
    const userSettings = await loadUserSettings(user.email, team.id);
    const userFilters = await loadUserFilters(user.email, team.id);
    

    
    if (userProfile) {
      window.currentUser = { ...user, ...userProfile };
      localStorage.setItem('thebridge_current_user', JSON.stringify(window.currentUser));
      console.log('✅ User profile loaded and updated:', window.currentUser);
      console.log('🔍 Profile details:', {
        name: userProfile.name,
        email: userProfile.email,
        role: userProfile.role,
        fullProfile: userProfile
      });
    } else {
      // Create new user profile if it doesn't exist
      const newProfile = {
        name: user.name,
        email: user.email,
        role: user.role || 'member',
        preferences: {}
      };
      
      await saveUserProfile(user.email, team.id, newProfile);
      window.currentUser = { ...user, ...newProfile };
      localStorage.setItem('thebridge_current_user', JSON.stringify(window.currentUser));
      console.log('✅ New user profile created:', window.currentUser);
    }
    
    // Ensure the user object has all required fields
    if (!window.currentUser.role) {
      window.currentUser.role = 'member';
      localStorage.setItem('thebridge_current_user', JSON.stringify(window.currentUser));
    }
    
    if (userSettings) {
      window.userSettings = userSettings;
      // Apply user settings
      applyUserSettings(userSettings);
    }
    
    if (userFilters && userFilters.length > 0) {
      window.userFilters = userFilters;
      // Apply user filters if needed
      console.log('✅ Loaded user filters:', userFilters.length);
      
      // Store filters in localStorage for immediate use
      localStorage.setItem('myFilters', JSON.stringify(userFilters));
    }
    
    console.log('✅ User profile and settings loaded');
  } catch (error) {
    console.warn('⚠️ Could not load user profile:', error);
  }
  
  // Update UI AFTER all data is loaded
  console.log('🔄 Updating UI with loaded user data:', window.currentUser);
  await updateTeamStatusBar();
  await updateTeamManagementButtonText();
  
  // Hide welcome screen and show main app
  hideWelcomeScreen();
  
  // 🎯 NEW: Load latest version automatically
  let dataLoaded = false;
  try {
    console.log('🔄 Loading latest version for team:', team.name);
    const loadResult = await loadLatestVersionForTeam();
    
    // Check if data was actually loaded
    if (loadResult === true || (window.rawData && window.rawData.length > 0)) {
      dataLoaded = true;
      console.log('✅ Data loaded successfully:', window.rawData ? window.rawData.length : 0, 'records');
    }
    
    // 🎯 CRITICAL FIX: Load last dashboard state ALWAYS, regardless of data
    try {
      console.log('🔄 Loading last dashboard state...');
      await loadLastDashboardState();
    } catch (dashboardError) {
      console.warn('⚠️ Could not load last dashboard state:', dashboardError);
    }
  } catch (error) {
    console.warn('⚠️ Could not load latest version:', error);
  }
  
  // 🎯 CRITICAL FIX: Always ensure main interface is shown
  if (!dataLoaded) {
    console.log('🔄 No data loaded, showing empty main interface...');
    
    // Show table container even if empty
    const tableContainer = document.getElementById('tableContainer');
    if (tableContainer) {
      tableContainer.style.display = 'block';
      tableContainer.classList.remove('hidden');
    }
    
    // Show main app interface
    const mainApp = document.querySelector('.main-app');
    if (mainApp) {
      mainApp.style.display = 'block';
    }
    
    // Initialize empty table state
    if (typeof displayTable === 'function') {
      displayTable([]);
    }
    
    // Show notification that user is logged in but no data
    showUnifiedNotification(`Welcome back to ${team.name}! No data loaded. You can upload a CSV file to get started.`, 'info');
  } else {
    // Show success notification for successful data load
  showUnifiedNotification(`Welcome back to ${team.name}!`, 'success');
  }
}

async function clearTeamSession() {
  window.currentTeam = null;
  window.currentUser = null;
  window.teamBackendConnected = false;
  
  // Clear session from localStorage
  localStorage.removeItem('thebridge_current_team');
  localStorage.removeItem('thebridge_current_user');
  
  // Update UI
  updateTeamStatusBar();
  await updateTeamManagementButtonText();
  
  // Show notification
  showNotification('Logged out from team', 'info');
}

async function loadTeamSession() {
  try {
    const teamData = localStorage.getItem('thebridge_current_team');
    const userData = localStorage.getItem('thebridge_current_user');
    
    if (teamData && userData) {
      const team = JSON.parse(teamData);
      const user = JSON.parse(userData);
      
      // Verify team still exists
      const existingTeam = await getTeamProfile(team.id);
      if (existingTeam) {
        // Set the session data for display purposes
        window.currentTeam = team;
        window.currentUser = user;
        
        // Try to enhance user data with additional sources
        if (user.email) {
          // Try to get name from basic user credentials
          const basicUser = getUserCredentials(user.email);
          if (basicUser && basicUser.name && !user.name) {
            user.name = basicUser.name;
            window.currentUser = user;
            localStorage.setItem('thebridge_current_user', JSON.stringify(user));
          }
          
          // Try to get name from users list
          if (!user.name) {
            const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
            const foundUser = users.find(u => u.email === user.email);
            if (foundUser && foundUser.name) {
              user.name = foundUser.name;
              window.currentUser = user;
              localStorage.setItem('thebridge_current_user', JSON.stringify(user));
            }
          }
        }
        
        // Update the status bar to show the session info
        // Delay this to ensure all data is properly loaded
        setTimeout(async () => {
          await updateTeamStatusBar();
        }, 300);
        
        // Don't auto-set session, just return true to indicate session exists
        // The session will be set manually when user chooses to resume
        return true;
      } else {
        // Team doesn't exist anymore, clear the session
        console.log('Team no longer exists, clearing session');
        await clearTeamSession();
      }
    }
  } catch (error) {
    console.error('Error loading team session:', error);
    // Clear corrupted session data
    await clearTeamSession();
  }
  
  return false;
}

// 🎯 NEW: Function to load latest version for team (OneDrive/localStorage only)
async function loadLatestVersionForTeam() {
  if (!window.currentTeam) {
    console.log('No team selected, cannot load latest version');
    return;
  }
  
  try {
    console.log('📂 Loading latest version from OneDrive/localStorage...');
    
    // Try to load from OneDrive first, then localStorage
    const latestVersionData = await loadFromUnifiedBackend('latest-version.json', {
      teamId: window.currentTeam.id,
      userEmail: window.currentUser?.email,
      fileType: 'versions'
    });
    
    if (!latestVersionData || !latestVersionData.data) {
      console.log('📂 No versions found for this team');
      return;
    }
    
    const latest = latestVersionData;
    console.log('✅ Latest version found:', latest.name, `(${latest.data.length} records)`);
    
    // Load the data into the main table
    if (latest.data && Array.isArray(latest.data)) {
      // Set the data globally
      window.rawData = latest.data;
      window.currentTableData = latest.data;
      
      // Also set in the store for compatibility
      if (typeof setOriginalData === 'function') {
        setOriginalData(latest.data);
      }
      
      // Update the table display
      displayTable(latest.data);
      
      // Update file info
      updateFileInfo(latest.data.length, latest.name);
      
      // Show notification
      showUnifiedNotification(`Loaded latest version: ${latest.name} (${latest.data.length} records)`, 'success');
      
      console.log('✅ Latest version loaded successfully into table');
      return true; // Indicate success
    } else {
      console.warn('⚠️ Latest version data is not valid:', latest);
      return false; // Indicate failure
    }
    
  } catch (error) {
    console.error('❌ Error loading latest version:', error);
    // Don't show error notification as this is automatic
  }
}

// 🎯 NEW: Function to resume last session with complete dashboard state
async function resumeLastSession() {
  try {
    console.log('🔄 Attempting to resume last session...');
    
    // First, try to load persistent session
    const persistentSession = loadPersistentSession();
    
    if (persistentSession && persistentSession.email) {
      console.log('✅ Found persistent session for:', persistentSession.email);
      
      // Set current user from persistent session
      window.currentUser = persistentSession.userProfile;
      setCurrentUserEmail(persistentSession.email);
      
      // Try to load user profile from backend
      if (window.backendUrl) {
        try {
          const backendProfile = await loadUserProfile(persistentSession.email, 'default-team');
          if (backendProfile) {
            window.currentUser = {
              ...window.currentUser,
              ...backendProfile
            };
            console.log('✅ User profile loaded from backend');
          }
        } catch (error) {
          console.warn('⚠️ Could not load profile from backend:', error);
        }
      }
      
      // Show user buttons
      showLogoutBtn();
      
      // Try to load team session
      const hasTeamSession = await loadTeamSession();
      if (hasTeamSession && window.currentTeam) {
        console.log('✅ Team session restored:', window.currentTeam.name);
        
        // 🎯 NEW: Hide welcome screen immediately
        hideWelcomeScreen();
    
        // Load latest version data
    await loadLatestVersionForTeam();
    
        // Load last dashboard state
    await loadLastDashboardState();
    
        // Update UI
        updateTeamStatusBar();
    
        showUnifiedNotification(`Welcome back! Session resumed for ${window.currentTeam.name}`, 'success');
    console.log('✅ Last session resumed successfully');
        return;
      }
    }
    
    // If no persistent session or team, show login modal
    console.log('⚠️ No persistent session found, showing login modal');
    showUserLoginModal();
    
  } catch (error) {
    console.error('❌ Error resuming last session:', error);
    showUnifiedNotification('Error resuming session. Please log in again.', 'error');
    showUserLoginModal();
  }
}

// 🎯 NEW: Function to load last dashboard state (OneDrive/localStorage only)
async function loadLastDashboardState() {
  if (!window.currentTeam || !window.currentUser) {
    console.log('No team or user selected, cannot load dashboard state');
    return;
  }
  
  try {
    console.log('🔄 Loading last dashboard state...');
    
    // Get user's last dashboard configuration
    let userEmail = window.currentUser.email;
    const teamId = window.currentTeam.id;
    
    // If userEmail is empty, try to get it from persistent session
    if (!userEmail) {
      console.log('🔍 User email is empty, trying to get from persistent session...');
      const persistentSession = loadPersistentSession();
      if (persistentSession && persistentSession.email) {
        userEmail = persistentSession.email;
        window.currentUser.email = persistentSession.email;
        console.log('✅ Got user email from persistent session:', userEmail);
      }
    }
    
    // Validate that we have the required data
    if (!userEmail || !teamId) {
      console.warn('⚠️ Missing required data for dashboard state:', { userEmail, teamId });
      return;
    }
    
    console.log('📂 Loading dashboard state from OneDrive/localStorage...');
    
    // Try to load the dashboard config using the unified function
    try {
      const dashboardConfig = await getDashboardConfig();
      
      if (dashboardConfig && typeof dashboardConfig === 'object') {
            // Apply the dashboard configuration
        applyDashboardConfig(dashboardConfig);
        console.log('✅ Dashboard state restored from unified storage');
      } else {
        console.log('📂 No previous dashboard configurations found');
      }
    } catch (loadError) {
      console.log('📂 No dashboard configuration found in unified storage:', loadError);
    }
    
  } catch (error) {
    console.warn('⚠️ Could not load last dashboard state:', error);
  }
}

// 🎯 NEW: Function to apply dashboard configuration
async function applyDashboardConfiguration(config) {
  try {
    console.log('🔄 Applying dashboard configuration:', config);
    
    // Apply saved filters if they exist
    if (config.filters && window.filterManager) {
      console.log('🔍 Applying saved filters...');
      let appliedCount = 0;
      let incompatibleCount = 0;
      
      // Apply filters to the filter manager
      Object.keys(config.filters).forEach(column => {
        const filterValues = config.filters[column];
        if (filterValues && filterValues.length > 0) {
          const success = window.filterManager.setColumnFilter(column, filterValues);
          if (success) {
            appliedCount++;
          } else {
            incompatibleCount++;
          }
        }
      });
      
      // Store filters in localStorage for persistence
      localStorage.setItem('myFilters', JSON.stringify(config.filters));
      
      // Validate filter compatibility
      if (typeof window.filterManager.validateFilterCompatibility === 'function') {
        const incompatibleFilters = window.filterManager.validateFilterCompatibility();
        console.log(`✅ Applied ${appliedCount} filters, ${incompatibleFilters} incompatible filters found`);
      } else {
        console.log(`✅ Applied ${appliedCount} filters, ${incompatibleCount} incompatible filters found`);
      }
    }
    
    // Apply saved table views if they exist
    if (config.tableViews) {
      console.log('👁️ Applying saved table views...');
      
      // Apply default view if it exists
      if (config.tableViews.default) {
        const defaultView = config.tableViews.default;
        
        // Apply visible columns
        if (defaultView.columns && Array.isArray(defaultView.columns)) {
          console.log('📋 Applying visible columns:', defaultView.columns);
          if (typeof setVisibleColumns === 'function') {
            setVisibleColumns(defaultView.columns);
            console.log('✅ Table view columns applied:', defaultView.columns);
          } else if (typeof window.setVisibleColumns === 'function') {
            window.setVisibleColumns(defaultView.columns);
            console.log('✅ Table view columns applied (window):', defaultView.columns);
          }
        }
        
        // Apply sorting
        if (defaultView.sortBy && defaultView.sortOrder) {
          console.log('📊 Applying sorting:', defaultView.sortBy, defaultView.sortOrder);
          if (typeof setTableSort === 'function') {
            setTableSort(defaultView.sortBy, defaultView.sortOrder);
            console.log('✅ Table sorting applied:', defaultView.sortBy, defaultView.sortOrder);
          } else if (typeof window.setTableSort === 'function') {
            window.setTableSort(defaultView.sortBy, defaultView.sortOrder);
            console.log('✅ Table sorting applied (window):', defaultView.sortBy, defaultView.sortOrder);
          }
        }
        
        // Apply pagination
        if (defaultView.pageSize) {
          console.log('📄 Applying page size:', defaultView.pageSize);
          if (typeof setRowsPerPage === 'function') {
            setRowsPerPage(defaultView.pageSize);
            console.log('✅ Page size applied:', defaultView.pageSize);
          } else if (typeof window.setRowsPerPage === 'function') {
            window.setRowsPerPage(defaultView.pageSize);
            console.log('✅ Page size applied (window):', defaultView.pageSize);
          }
        }
      }
    }
    
    // Apply saved quick filters if they exist
    if (config.quickFilters) {
      console.log('⚡ Applying saved quick filters...');
      localStorage.setItem('quickFilters', JSON.stringify(config.quickFilters));
    }
    
    // Apply saved custom summaries if they exist
    if (config.customSummaries) {
      console.log('📊 Applying saved custom summaries...');
      localStorage.setItem('customSummaries', JSON.stringify(config.customSummaries));
    }
    
    // Apply saved favorites if they exist
    if (config.favoritos && Array.isArray(config.favoritos)) {
      console.log('⭐ Applying saved favorites...');
      localStorage.setItem('favoritos', JSON.stringify(config.favoritos));
    }
    
    // Apply saved theme if it exists
    if (config.theme) {
      console.log('🎨 Applying saved theme:', config.theme);
      document.body.setAttribute('data-theme', config.theme);
      localStorage.setItem('theme', config.theme);
    }
    
    // Apply saved language if it exists
    if (config.language) {
      console.log('🌐 Applying saved language:', config.language);
      localStorage.setItem('language', config.language);
    }
    
    // Apply saved notifications settings if they exist
    if (config.notifications) {
      console.log('🔔 Applying saved notifications settings...');
      localStorage.setItem('notifications', JSON.stringify(config.notifications));
    }
    
    // Apply saved column configuration if it exists
    if (config.columnConfig) {
      console.log('📋 Applying saved column configuration...');
      localStorage.setItem('columnConfig', JSON.stringify(config.columnConfig));
      
      // Apply custom column configurations
      if (typeof window.applyColumnConfig === 'function') {
        window.applyColumnConfig(config.columnConfig);
        console.log('✅ Column configuration applied:', config.columnConfig);
      }
    }
    
    // Apply saved visible columns if they exist
    if (config.visibleColumns && Array.isArray(config.visibleColumns)) {
      console.log('👁️ Applying saved visible columns...');
      localStorage.setItem('visibleColumns', JSON.stringify(config.visibleColumns));
      
      // Actually apply the visible columns to the table
      if (typeof setVisibleColumns === 'function') {
        setVisibleColumns(config.visibleColumns);
        console.log('✅ Visible columns applied to table:', config.visibleColumns);
      } else if (typeof window.setVisibleColumns === 'function') {
        window.setVisibleColumns(config.visibleColumns);
        console.log('✅ Visible columns applied to table (window):', config.visibleColumns);
      }
    }
    
    // Apply saved column order if it exists
    if (config.columnOrder && Array.isArray(config.columnOrder)) {
      console.log('📊 Applying saved column order...');
      localStorage.setItem('columnOrder', JSON.stringify(config.columnOrder));
      
      // Apply column order to the table
      if (typeof setVisibleColumns === 'function') {
        setVisibleColumns(config.columnOrder);
        console.log('✅ Column order applied to table:', config.columnOrder);
      } else if (typeof window.setVisibleColumns === 'function') {
        window.setVisibleColumns(config.columnOrder);
        console.log('✅ Column order applied to table (window):', config.columnOrder);
      }
    }
    
    // Apply saved backend settings if they exist
    if (config.backendSettings) {
      console.log('🔧 Applying saved backend settings...');
      localStorage.setItem('backendSettings', JSON.stringify(config.backendSettings));
    }
    
    // Apply saved dashboard configuration if it exists
    if (config.dashboardConfig) {
      console.log('📊 Applying saved dashboard configuration...');
      localStorage.setItem('dashboardConfig', JSON.stringify(config.dashboardConfig));
    }
    
    // Apply dashboard-specific settings
    if (config.dashboard) {
      console.log('📊 Applying dashboard settings...');
      
      // If it's a specific dashboard type, open it
      if (config.dashboard.type === 'ops') {
        // Open Ops Hub
        const opsHubBtn = document.getElementById('opsHubBtn');
        if (opsHubBtn) {
          opsHubBtn.click();
        }
      } else if (config.dashboard.type === 'dq') {
        // Open DQ Hub
        const dqHubBtn = document.getElementById('dqHubBtn');
        if (dqHubBtn) {
          dqHubBtn.click();
        }
      }
    }
    
    // Refresh the table with applied settings
    if (window.currentTableData) {
      console.log('🔄 Refreshing table with applied settings...');
      if (typeof displayTable === 'function') {
      displayTable(window.currentTableData);
      }
    }
    
    // Show notification that configuration was loaded
    if (typeof showNotification === 'function') {
      showNotification('Configuration loaded successfully!', 'success');
    }
    
    console.log('✅ Dashboard configuration applied successfully');
  } catch (error) {
    console.error('❌ Error applying dashboard configuration:', error);
    if (typeof showNotification === 'function') {
      showNotification('Error applying configuration', 'error');
    }
  }
}

// Make the function available globally
window.applyDashboardConfiguration = applyDashboardConfiguration;

// Make resumeLastSession globally available
window.resumeLastSession = resumeLastSession;

// Helper function to update file info display
function updateFileInfo(recordCount, fileName) {
  try {
    // Update any file info displays
    const fileNameElement = document.querySelector('.file-name');
    if (fileNameElement) {
      fileNameElement.textContent = fileName;
    }
    
    const recordCountElement = document.querySelector('.record-count');
    if (recordCountElement) {
      recordCountElement.textContent = `${recordCount} records`;
    }
    
    // Update sidebar info if it exists
    const sidebarInfo = document.querySelector('.sidebar-info');
    if (sidebarInfo) {
      sidebarInfo.innerHTML = `
        <div>📄 ${fileName}</div>
        <div>📊 ${recordCount} records</div>
      `;
    }
    
    console.log('✅ File info updated:', { fileName, recordCount });
  } catch (error) {
    console.warn('⚠️ Could not update file info:', error);
  }
}

async function updateTeamStatusBar() {
  const teamInfo = document.getElementById('teamInfo');
  const teamName = document.getElementById('currentTeamName');
  const connectionIndicator = document.getElementById('backendConnectionIndicator');
  const connectionText = document.getElementById('backendConnectionText');
  
  console.log('🔄 Updating team status bar...', {
    teamInfo: !!teamInfo,
    teamName: !!teamName,
    connectionIndicator: !!connectionIndicator,
    connectionText: !!connectionText,
    currentTeam: !!window.currentTeam,
    currentUser: !!window.currentUser,
    teamBackendConnected: window.teamBackendConnected
  });
  
  // Always update connection indicator even if other elements are missing
  if (connectionIndicator && connectionText) {
    if (window.teamBackendConnected) {
      connectionIndicator.style.background = '#10B981';
      connectionIndicator.title = 'Backend connected';
      connectionText.textContent = 'Backend connected';
      connectionText.style.color = '#10B981';
      console.log('✅ Updated status bar: Backend connected (green)');
    } else {
      connectionIndicator.style.background = '#d32f2f';
      connectionIndicator.title = 'Backend disconnected';
      connectionText.textContent = 'Backend disconnected';
      connectionText.style.color = '#d32f2f';
      console.log('❌ Updated status bar: Backend disconnected (red)');
    }
  } else {
    console.log('⚠️ Connection indicator elements not found');
  }
  
  // Only update team info if all required elements exist
  if (!teamInfo || !teamName) {
    console.log('⚠️ Some team status elements not found, skipping team info update');
    return;
  }
  
  if (window.currentTeam && window.currentUser) {
    // Check if this is a guest session
    if (window.currentUser.role === 'guest') {
      // Hide team info completely in guest mode with !important
      teamInfo.style.setProperty('display', 'none', 'important');
      teamInfo.style.setProperty('visibility', 'hidden', 'important');
      teamInfo.style.setProperty('opacity', '0', 'important');
      teamInfo.style.setProperty('height', '0', 'important');
      teamInfo.style.setProperty('overflow', 'hidden', 'important');
      teamInfo.style.setProperty('margin', '0', 'important');
      teamInfo.style.setProperty('padding', '0', 'important');
      
      // Hide the entire sidebar header to remove empty space
      const sidebarHeader = document.querySelector('.sidebar-header');
      if (sidebarHeader) {
        sidebarHeader.style.setProperty('display', 'none', 'important');
        sidebarHeader.style.setProperty('height', '0', 'important');
        sidebarHeader.style.setProperty('margin', '0', 'important');
        sidebarHeader.style.setProperty('padding', '0', 'important');
        sidebarHeader.style.setProperty('overflow', 'hidden', 'important');
        sidebarHeader.style.setProperty('visibility', 'hidden', 'important');
        sidebarHeader.style.setProperty('opacity', '0', 'important');
      }
      
      // Also hide team management button and its separator in guest mode
      const teamManagementBtn = document.getElementById('teamManagementBtn');
      const teamManagementSeparator = teamManagementBtn?.nextElementSibling;
      
      if (teamManagementBtn) {
        teamManagementBtn.style.setProperty('display', 'none', 'important');
      }
      if (teamManagementSeparator && teamManagementSeparator.classList.contains('sidebar-separator')) {
        teamManagementSeparator.style.setProperty('display', 'none', 'important');
      }
      
      console.log('✅ Guest mode: Team info and sidebar header hidden with !important');
      return;
    } else {
      // Show team info in sidebar for non-guest users
      teamInfo.style.display = 'block';
      teamName.textContent = window.currentTeam.name;
      
      // Show team management button and its separator for non-guest users
      const teamManagementBtn = document.getElementById('teamManagementBtn');
      const teamManagementSeparator = teamManagementBtn?.nextElementSibling;
      
      if (teamManagementBtn) {
        teamManagementBtn.style.display = 'flex';
      }
      if (teamManagementSeparator && teamManagementSeparator.classList.contains('sidebar-separator')) {
        teamManagementSeparator.style.display = 'block';
      }
    }
    
    // Update connection indicator and text
    if (connectionIndicator && connectionText) {
      if (window.teamBackendConnected) {
        connectionIndicator.style.background = '#10B981';
        connectionIndicator.title = 'Backend connected';
        connectionText.textContent = 'Backend connected';
        connectionText.style.color = '#10B981';
        console.log('✅ Updated status bar: Backend connected (green)');
      } else {
        connectionIndicator.style.background = '#d32f2f';
        connectionIndicator.title = 'Backend disconnected';
        connectionText.textContent = 'Backend disconnected';
        connectionText.style.color = '#d32f2f';
        console.log('❌ Updated status bar: Backend disconnected (red)');
      }
    } else {
      console.log('⚠️ Connection indicator elements not found');
    }
  } else {
    // Hide team info with !important
    teamInfo.style.setProperty('display', 'none', 'important');
    teamInfo.style.setProperty('visibility', 'hidden', 'important');
    teamInfo.style.setProperty('opacity', '0', 'important');
    teamInfo.style.setProperty('height', '0', 'important');
    teamInfo.style.setProperty('overflow', 'hidden', 'important');
    teamInfo.style.setProperty('margin', '0', 'important');
    teamInfo.style.setProperty('padding', '0', 'important');
    
    // Also hide team management button and its separator when no team/user session
    const teamManagementBtn = document.getElementById('teamManagementBtn');
    const teamManagementSeparator = teamManagementBtn?.nextElementSibling;
    
    if (teamManagementBtn) {
      teamManagementBtn.style.setProperty('display', 'none', 'important');
    }
    if (teamManagementSeparator && teamManagementSeparator.classList.contains('sidebar-separator')) {
      teamManagementSeparator.style.setProperty('display', 'none', 'important');
    }
    
    console.log('ℹ️ No team/user session, hiding team info and management button with !important');
  }
  
  // Add storage type indicator
  const loginType = getCurrentLoginType();
  const storagePath = getStoragePathForLoginType(loginType);
  
  // Update storage indicator in UI
  const storageIndicator = document.getElementById('storageIndicator');
  if (storageIndicator) {
    const storageType = loginType === LOGIN_TYPES.ONEDRIVE ? 'OneDrive' : 
                       loginType === LOGIN_TYPES.AZURE_AD ? 'Azure AD' : 
                       loginType === LOGIN_TYPES.GUEST ? 'Local Temp' : 'Local';
    
            storageIndicator.textContent = `${storageType}`;
    storageIndicator.title = `Configuration storage: ${storagePath}`;
    
    // Add visual styling based on storage type
    storageIndicator.className = `storage-indicator storage-${loginType}`;
    
    // Show the indicator
    storageIndicator.style.display = 'inline-block';
  }
}

// Initialize team system
function initializeTeamSystem() {
  setupTeamProfileModal();
  setupTeamLoginModal();
  setupUserConfigurationModal();
  
  // Setup team management button
  setupTeamManagementButton();
  
  // Setup backend settings with a small delay to ensure DOM is ready
  setTimeout(() => {
    setupBackendSettingsButton();
    setupBackendSettingsModal();
  }, 100);
  
  // Setup periodic storage status check
  setupStorageStatusCheck();
}

// Setup periodic storage status check
function setupStorageStatusCheck() {
  console.log('🔄 Setting up periodic storage status check...');
  
  // Initial check after a delay to allow OneDrive to initialize
  setTimeout(() => {
    console.log('🔄 Performing initial OneDrive detection...');
    forceOneDriveConnectionCheck();
    forceUpdateStorageIndicator();
  }, 2000);
  
  // Check storage status every 5 seconds
  setInterval(() => {
    const currentLoginType = getCurrentLoginType();
    const storageIndicator = document.getElementById('storageIndicator');
    
    if (storageIndicator) {
      const storageType = currentLoginType === LOGIN_TYPES.ONEDRIVE ? 'OneDrive' : 
                         currentLoginType === LOGIN_TYPES.AZURE_AD ? 'Azure AD' : 
                         currentLoginType === LOGIN_TYPES.GUEST ? 'Local Temp' : 'Local';
      
      const currentText = storageIndicator.textContent;
              const expectedText = `${storageType}`;
      
      if (currentText !== expectedText) {
        console.log(`🔄 Storage type changed from "${currentText}" to "${expectedText}"`);
        forceUpdateStorageIndicator();
      }
    }
  }, 5000);
  
  console.log('✅ Periodic storage status check setup complete');
}
  
  // Initialize backend service if not already available
  if (!window.backendService) {
    console.log('🔧 Initializing BackendService...');
    // The BackendService should be loaded from the script tag, but let's ensure it's available
    if (typeof BackendService !== 'undefined') {
      window.backendService = new BackendService();
      console.log('✅ BackendService initialized');
    } else {
      console.warn('⚠️ BackendService class not found, trying to load from script');
      // Try to load it manually if needed
      const script = document.createElement('script');
      script.src = 'src/services/backendService.js';
      script.onload = () => {
        console.log('✅ BackendService script loaded');
        // Try to initialize again after script loads
        if (typeof BackendService !== 'undefined' && !window.backendService) {
          window.backendService = new BackendService();
          console.log('✅ BackendService initialized after script load');
        }
      };
      script.onerror = () => {
        console.error('❌ Failed to load BackendService script');
      };
      document.head.appendChild(script);
    }
  }
  
  // Force BackendService initialization if it exists but wasn't properly initialized
  if (typeof BackendService !== 'undefined' && !window.backendService) {
    window.backendService = new BackendService();
    console.log('✅ BackendService force initialized');
  }
  
  // Try to load existing session (but don't auto-login)
  const hasSession = loadTeamSession();
  
  // Start backend connection monitoring
  startBackendConnectionMonitoring();
  
  // Force an immediate connection check after a short delay
  setTimeout(async () => {
    console.log('🔧 Forcing immediate backend connection check...');
    await window.forceBackendConnectionCheck();
    
    // After connection check, force update user name display
    setTimeout(async () => {
      console.log('🔧 Forcing user name update after connection check...');
      await updateTeamStatusBar();
    }, 500);
  }, 1000);
  
  // Update team management button text
updateTeamManagementButtonText().catch(console.error);
  
  // Update team status bar to show current session info
  // Delay this to ensure user data is loaded from backend first
  setTimeout(async () => {
    await updateTeamStatusBar();
  }, 500);
  
  // 🎯 MODIFIED: Always show welcome screen, no auto-login
  // This ensures users always see the welcome screen and choose their action
  const teams = getAllTeams();
  if (teams.length === 0) {
    // No teams exist - show welcome screen for new users
    console.log('No teams found - user needs to create first team');
    showWelcomeScreen();
    
    // Enable guest backend access for users without teams
    setTimeout(() => {
      enableGuestBackendAccess();
    }, 2000); // Enable after 2 seconds to let welcome screen show first
  } else {
    // Teams exist - show welcome screen with "I'm Back" and "Resume Session" options
    showWelcomeScreen();
  }
  
  // Note: Users with existing sessions can still use "Resume Session" button
  // which will check their authentication and load their data

// Setup team management button with all functionality
function setupTeamManagementButton() {
  const teamManagementBtn = document.getElementById('teamManagementBtn');
  const buttonText = getElement('#teamManagementText');
  
  if (!teamManagementBtn || !buttonText) {
    console.log('⚠️ Team management button elements not found');
    return;
  }
  
  console.log('🔧 Setting up team management button...');
  
  // Remove any existing event listeners
  teamManagementBtn.removeEventListener('click', handleTeamManagementClick);
  teamManagementBtn.addEventListener('click', handleTeamManagementClick);
  
  console.log('✅ Team management button event listener added');
}

// Handle team management button click
async function handleTeamManagementClick() {
  console.log('🎯 Team management button clicked!');
  
  // Check if there are existing teams
  const teams = await getAllTeams();
  if (teams.length > 0) {
    // If user is logged into a team, show options menu
    if (window.currentTeam && window.currentUser) {
      showTeamManagementMenu();
    } else {
      // Show team login modal if teams exist but user not logged in
      showTeamLoginModal();
    }
  } else {
    // Show team creation modal if no teams exist
    showTeamProfileModal();
  }
}

// Update team management button text based on teams and session
async function updateTeamManagementButtonText() {
  const buttonText = getElement('#teamManagementText');
  const guestAccessBtn = document.getElementById('guestAccessBtn');
  const teamManagementBtn = document.getElementById('teamManagementBtn');
  if (!buttonText) return;
  
  // Check if current user is a guest
  console.log('🔍 Checking user role:', window.currentUser?.role);
  if (window.currentUser && window.currentUser.role === 'guest') {
    console.log('👤 Guest mode detected - hiding team management');
    // Hide team management completely in guest mode
    if (teamManagementBtn) {
      teamManagementBtn.style.display = 'none';
      console.log('✅ Team management button hidden');
    }
    
    // Also hide the separator after team management button
    const teamManagementSeparator = teamManagementBtn?.nextElementSibling;
    if (teamManagementSeparator && teamManagementSeparator.classList.contains('sidebar-separator')) {
      teamManagementSeparator.style.display = 'none';
      console.log('✅ Team management separator hidden');
    }
    
    if (guestAccessBtn) {
      guestAccessBtn.style.display = 'none';
      console.log('✅ Guest access button hidden');
    }
    return;
  }
  
  // Show team management for non-guest users
  if (teamManagementBtn) {
    teamManagementBtn.style.display = 'block';
  }
  
  // Also show the separator after team management button for non-guest users
  const teamManagementSeparator = teamManagementBtn?.nextElementSibling;
  if (teamManagementSeparator && teamManagementSeparator.classList.contains('sidebar-separator')) {
    teamManagementSeparator.style.display = 'block';
  }
  
  const teams = await getAllTeams();
  
  if (teams.length === 0) {
    buttonText.textContent = 'Create Team';
    if (guestAccessBtn) guestAccessBtn.style.display = 'block';
  } else if (window.currentTeam && window.currentUser) {
    buttonText.textContent = 'Team Management';
    if (guestAccessBtn) guestAccessBtn.style.display = 'none';
  } else {
    buttonText.textContent = 'Team Set Up';
    if (guestAccessBtn) guestAccessBtn.style.display = 'block';
  }
}

// Setup backend settings button
function setupBackendSettingsButton() {
  const settingsBtn = document.getElementById('backendSettingsBtn');
  console.log('🔧 Setting up backend settings button:', !!settingsBtn);
  
  if (settingsBtn) {
    // Remove any existing event listeners
    settingsBtn.removeEventListener('click', handleBackendSettingsClick);
    settingsBtn.addEventListener('click', handleBackendSettingsClick);
    console.log('✅ Backend settings button event listener added');
    
    // Test the button immediately
    console.log('🧪 Testing backend settings button...');
    settingsBtn.style.border = '2px solid #47B2E5';
    setTimeout(() => {
      settingsBtn.style.border = '';
    }, 2000);
  } else {
    console.error('❌ Backend settings button not found!');
    // Try to find it again after a delay
    setTimeout(() => {
      console.log('🔄 Retrying backend settings button setup...');
      setupBackendSettingsButton();
    }, 1000);
  }
}

// Handle backend settings button click
function handleBackendSettingsClick(event) {
  console.log('🎯 Backend settings button clicked!');
  event.preventDefault();
  event.stopPropagation();
  
  // Show immediate feedback
  showNotification('Opening backend settings...', 'info');
  
  try {
    openBackendSettingsModal();
  } catch (error) {
    console.error('❌ Error opening backend settings modal:', error);
    showNotification('Error opening backend settings: ' + error.message, 'error');
  }
}

// Global function to properly close modals and remove overlay effects
window.closeModalProperly = function(modal) {
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
    // Remove any remaining overlay effects
    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';
    // Remove any backdrop filters or dark overlays
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
      if (overlay !== modal) {
        overlay.classList.add('hidden');
        overlay.style.display = 'none';
      }
    });
  }
};

// Global function to test backend settings modal (for debugging)
window.testBackendSettingsModal = function() {
  console.log('🔧 Opening backend settings modal...');
  
  try {
    openBackendSettingsModal();
  } catch (error) {
    console.error('❌ Error opening backend settings modal:', error);
  }
};

// Global function to force OneDrive connection check
window.forceOneDriveCheck = function() {
  console.log('🔧 Force OneDrive check called from console...');
  return forceOneDriveConnectionCheck();
};

// Global function to test OneDrive connection with API call
window.testOneDriveConnection = function() {
  console.log('🔧 Test OneDrive connection called from console...');
  return testOneDriveConnection();
};

// Global function to force storage indicator update
window.forceStorageUpdate = function() {
  console.log('🔧 Force storage update called from console...');
  forceUpdateStorageIndicator();
};

// Global function to check current storage status
window.checkStorageStatus = async function() {
  console.log('🔧 Checking current storage status...');
  
  const loginType = getCurrentLoginType();
  const storagePath = getStoragePathForLoginType(loginType);
  const shouldUseOneDrive = await shouldUseOneDriveAsBackend();
  
  console.log('Current login type:', loginType);
  console.log('Storage path:', storagePath);
  console.log('Should use OneDrive as storage:', shouldUseOneDrive);
  console.log('OneDrive config:', window.oneDriveConfig);
  console.log('OneDrive integration available:', !!window.OneDriveCustomPathIntegration);
  
  if (window.OneDriveCustomPathIntegration) {
    const onedrive = new window.OneDriveCustomPathIntegration();
    console.log('OneDrive isAuthenticated:', onedrive.isAuthenticated);
  }
  
  return { 
    loginType, 
    storagePath, 
    shouldUseOneDrive,
    oneDriveConfig: window.oneDriveConfig 
  };
};

// Global function to test unified storage system
window.testUnifiedBackend = async function() {
  console.log('🔧 Testing unified storage system...');
  
  const testData = {
    test: true,
    timestamp: new Date().toISOString(),
    message: 'Testing unified storage system (OneDrive or localStorage)'
  };
  
  try {
    // Test save
    console.log('🧪 Testing save...');
    const saveResult = await saveToUnifiedBackend(testData, 'test-unified-storage.json');
    console.log('✅ Save result:', saveResult);
    
    // Test load
    console.log('🧪 Testing load...');
    const loadResult = await loadFromUnifiedBackend('test-unified-storage.json');
    console.log('✅ Load result:', loadResult);
    
    return { success: true, saveResult, loadResult };
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return { success: false, error: error.message };
  }
};

// Global function to force immediate OneDrive detection and update
window.forceOneDriveDetection = function() {
  console.log('🔧 Force OneDrive detection called from console...');
  
  // Force OneDrive check
  forceOneDriveConnectionCheck();
  
  // Force storage update
  forceUpdateStorageIndicator();
  
  // Check status after update
  setTimeout(() => {
    const status = window.checkStorageStatus();
    console.log('🔧 Status after forced detection:', status);
  }, 500);
  
  return true;
};

// Global function to test REAL OneDrive login verification
window.testRealOneDriveLogin = async function() {
  console.log('🔧 Testing REAL OneDrive login verification...');
  
  try {
    const result = await verifyRealOneDriveLogin();
    console.log('🎯 REAL OneDrive login test result:', result);
    
    if (result) {
      console.log('✅ OneDrive login is REAL and working!');
      showUnifiedNotification('OneDrive login verification successful!', 'success');
    } else {
      console.log('❌ OneDrive login is NOT REAL!');
      showUnifiedNotification('OneDrive login verification failed!', 'error');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error testing REAL OneDrive login:', error);
    showUnifiedNotification('Error testing OneDrive login verification!', 'error');
    return false;
  }
};

// Global function to check current OneDrive status with real verification
window.checkRealOneDriveStatus = async function() {
  console.log('🔧 Checking REAL OneDrive status...');
  
  try {
    const status = await checkOneDriveAuthenticationWithRealTest();
    console.log('🎯 REAL OneDrive status:', status);
    
    const config = window.oneDriveConfig || {};
    console.log('📋 OneDrive config:', {
      isConnected: config.isConnected,
      authMethod: config.authMethod,
      verifiedAt: config.verifiedAt,
      lastSync: config.lastSync
    });
    
    return {
      isAuthenticated: status,
      config: config
    };
  } catch (error) {
    console.error('❌ Error checking REAL OneDrive status:', error);
    return {
      isAuthenticated: false,
      error: error.message
    };
  }
};

// Determine if we should use OneDrive as the primary storage
async function shouldUseOneDriveAsBackend() {
  const loginType = getCurrentLoginType();
  const hasOneDrive = window.OneDriveCustomPathIntegration && 
                     (loginType === LOGIN_TYPES.ONEDRIVE);
  
  console.log('🔍 Should use OneDrive as storage?', {
    loginType,
    hasOneDrive,
    oneDriveAvailable: !!window.OneDriveCustomPathIntegration
  });
  
  if (hasOneDrive) {
    // Use REAL verification to ensure OneDrive is actually working
    const isAuthenticated = await checkOneDriveAuthenticationWithRealTest();
    console.log('☁️ OneDrive REAL authentication result:', isAuthenticated);
    return isAuthenticated;
  }
  
  return false;
}

// Unified save function that uses OneDrive or localStorage only
async function saveToUnifiedBackend(data, filename, options = {}) {
  console.log('💾 Saving to unified storage...', { filename, options });
  
  if (await shouldUseOneDriveAsBackend()) {
    console.log('☁️ Using OneDrive as storage');
    return await saveToOneDrive(data, filename, options);
  } else {
    console.log('💾 Using localStorage as storage');
    return await saveToLocalStorage(data, filename, options);
  }
}

// Unified load function that uses OneDrive or localStorage only
async function loadFromUnifiedBackend(filename, options = {}) {
  console.log('📂 Loading from unified storage...', { filename, options });
  
  if (await shouldUseOneDriveAsBackend()) {
    console.log('☁️ Using OneDrive as storage');
    return await loadFromOneDrive(filename, options);
  } else {
    console.log('💾 Using localStorage as storage');
    return await loadFromLocalStorage(filename, options);
  }
}

// Save to OneDrive (direct API)
async function saveToOneDrive(data, filename, options = {}) {
  try {
    if (!window.OneDriveCustomPathIntegration) {
      throw new Error('OneDrive integration not available');
    }
    
    const onedrive = new window.OneDriveCustomPathIntegration();
    if (!onedrive.isAuthenticated) {
      throw new Error('OneDrive not authenticated');
    }
    
    // Determine file type based on filename or options
    const fileType = options.fileType || 'configurations';
    const folderPath = getOneDrivePath(fileType);
    const filePath = `${folderPath}/${filename}`;
    
    // Ensure the folder exists
    await onedrive.ensureFolder(folderPath);
    
    // Save the file
    await onedrive.saveFile(filePath, JSON.stringify(data, null, 2));
    
    console.log('✅ Data saved to OneDrive:', filePath);
    return { success: true, type: 'OneDrive', path: filePath };
    
  } catch (error) {
    console.error('❌ Error saving to OneDrive:', error);
    throw error;
  }
}

// Load from OneDrive (direct API)
async function loadFromOneDrive(filename, options = {}) {
  try {
    if (!window.OneDriveCustomPathIntegration) {
      throw new Error('OneDrive integration not available');
    }
    
    const onedrive = new window.OneDriveCustomPathIntegration();
    if (!onedrive.isAuthenticated) {
      throw new Error('OneDrive not authenticated');
    }
    
    // Determine file type based on filename or options
    const fileType = options.fileType || 'configurations';
    const folderPath = getOneDrivePath(fileType);
    const filePath = `${folderPath}/${filename}`;
    
    // Load the file
    const content = await onedrive.loadFile(filePath);
    const data = JSON.parse(content);
    
    console.log('✅ Data loaded from OneDrive:', filePath);
    return data;
    
  } catch (error) {
    console.error('❌ Error loading from OneDrive:', error);
    throw error;
  }
}

// Save to localStorage (fallback)
async function saveToLocalStorage(data, filename, options = {}) {
  try {
    const key = `thebridge_${filename}`;
    localStorage.setItem(key, JSON.stringify(data, null, 2));
    
    // Also save metadata
    const metadata = {
      filename: filename,
      timestamp: new Date().toISOString(),
      teamId: options.teamId || window.currentTeam?.id || 'default-team',
      userEmail: options.userEmail || window.currentUser?.email || 'user@example.com',
      storageType: 'localStorage'
    };
    
    localStorage.setItem(`${key}_metadata`, JSON.stringify(metadata));
    
    console.log('✅ Data saved to localStorage:', key);
    return { success: true, type: 'localStorage', key: key };
    
  } catch (error) {
    console.error('❌ Error saving to localStorage:', error);
    throw error;
  }
}

// Load from localStorage (fallback)
async function loadFromLocalStorage(filename, options = {}) {
  try {
    const key = `thebridge_${filename}`;
    const data = localStorage.getItem(key);
    
    if (!data) {
      throw new Error(`File not found in localStorage: ${filename}`);
    }
    
    const parsedData = JSON.parse(data);
    console.log('✅ Data loaded from localStorage:', key);
    return parsedData;
    
  } catch (error) {
    console.error('❌ Error loading from localStorage:', error);
    throw error;
  }
}

// Global function to force backend connection check (for debugging)
window.forceBackendConnectionCheck = async function() {
  console.log('🔧 Forcing backend connection check...');
  
  try {
    // Use proper backend configuration
    const backendUrl = window.backendConfig ? window.backendConfig.getMainBackendUrl() : 'http://localhost:3001';
    
    // Don't check if in offline mode
    if (backendUrl === 'offline') {
      window.teamBackendConnected = false;
      console.log('📱 Backend connection: Offline mode (forced check)');
      updateTeamStatusBar();
      updateBackendSettingsButton();
      return false;
    }
    
    const response = await fetch(`${backendUrl}/health`);
    if (response.ok) {
      window.teamBackendConnected = true;
      console.log('✅ Backend connection: OK (forced check)');
    } else {
      window.teamBackendConnected = false;
      console.log('❌ Backend connection: Failed (forced check) - HTTP ' + response.status);
    }
    
    // Update UI
    updateTeamStatusBar();
    updateBackendSettingsButton();
    
    console.log('✅ Forced connection check completed');
    return window.teamBackendConnected;
  } catch (error) {
    window.teamBackendConnected = false;
    console.log('❌ Backend connection: Error (forced check) -', error.message);
    
    // Update UI
    updateTeamStatusBar();
    updateBackendSettingsButton();
    
    return false;
  }
};

// Global function to check DOM elements
window.checkDOMElements = function() {
  console.log('🔍 Checking DOM elements...');
  
  const userRole = document.getElementById('userRole');
  const teamName = document.getElementById('currentTeamName');
  const teamInfo = document.getElementById('teamInfo');
  
  console.log('userRole element:', userRole);
  console.log('teamName element:', teamName);
  console.log('teamInfo element:', teamInfo);
  
  if (userRole) {
    console.log('userRole.textContent:', userRole.textContent);
    console.log('userRole.innerHTML:', userRole.innerHTML);
    console.log('userRole.style.display:', userRole.style.display);
  }
  
  // Try to find any element that might contain "User"
  const allElements = document.querySelectorAll('*');
  const userElements = Array.from(allElements).filter(el => 
    el.textContent && el.textContent.includes('User')
  );
  
  console.log('Elements containing "User":', userElements);
  
  return { userRole, teamName, teamInfo, userElements };
};

// Check if current user is admin
function isUserAdmin() {
  return window.currentUser && window.currentUser.role === 'admin';
}

// Check if current user can modify data (admin only)
function canUserModifyData() {
  if (!window.currentUser) {
    console.log('⚠️ No user logged in, cannot modify data');
    return false;
  }
  
  if (window.currentUser.role === 'admin') {
    return true;
  }
  
  console.log('⚠️ User is not admin, cannot modify data. Role:', window.currentUser.role);
  return false;
}

// Show loading cursor
function showLoadingCursor() {
  document.body.style.cursor = 'wait';
  // También agregar una clase para estilos adicionales
  document.body.classList.add('loading-cursor');
  console.log('🔄 Loading cursor activated');
}

// Hide loading cursor
function hideLoadingCursor() {
  document.body.style.cursor = 'default';
  document.body.classList.remove('loading-cursor');
  console.log('✅ Loading cursor deactivated');
}

// Show loading cursor with timeout (for long operations)
function showLoadingCursorWithTimeout(timeoutMs = 5000) {
  showLoadingCursor();
  
  // Auto-hide after timeout to prevent stuck cursor
  setTimeout(() => {
    hideLoadingCursor();
  }, timeoutMs);
}

// Login type detection and management

// Get current login type
function getCurrentLoginType() {
  console.log('🔍 Detecting current login type...', {
    hasOneDriveIntegration: !!window.OneDriveCustomPathIntegration,
    hasOneDriveConfig: !!window.oneDriveConfig,
    oneDriveConfigIsConnected: window.oneDriveConfig?.isConnected,
    currentUser: window.currentUser,
    currentUserLoginType: window.currentUser?.loginType,
    currentUserRole: window.currentUser?.role,
    currentUserEmail: window.currentUser?.email
  });
  
  // Check if user is logged in via OneDrive
  if (window.OneDriveCustomPathIntegration && window.oneDriveConfig && window.oneDriveConfig.isConnected) {
    console.log('✅ Detected OneDrive login');
    return LOGIN_TYPES.ONEDRIVE;
  }
  
  // Check if OneDrive integration is available and authenticated
  if (window.OneDriveCustomPathIntegration) {
    try {
      const onedrive = new window.OneDriveCustomPathIntegration();
      if (onedrive.isAuthenticated) {
        console.log('✅ Detected OneDrive login via authentication check');
        // Update the config to reflect the current state
        if (window.oneDriveConfig) {
          window.oneDriveConfig.isConnected = true;
        }
        return LOGIN_TYPES.ONEDRIVE;
      }
    } catch (error) {
      console.log('⚠️ Error checking OneDrive authentication:', error);
    }
  }
  
  // Check if user is in guest mode
  if (window.currentUser && window.currentUser.role === 'guest') {
    console.log('✅ Detected Guest mode');
    return LOGIN_TYPES.GUEST;
  }
  
  // Check if user is logged in but type not specified
  if (window.currentUser && window.currentUser.email) {
    console.log('✅ Detected user login (defaulting to OneDrive)');
    // Default to OneDrive if user exists but type not specified
    return LOGIN_TYPES.ONEDRIVE;
  }
  
  // Check if OneDrive integration is available but not yet initialized
  if (window.OneDriveCustomPathIntegration) {
    console.log('🔄 OneDrive integration available, checking initialization...');
    
    // Try to initialize OneDrive if not already done
    try {
      const onedrive = new window.OneDriveCustomPathIntegration();
      
      // Check if we can access OneDrive properties
      if (onedrive && typeof onedrive.isAuthenticated !== 'undefined') {
        console.log('✅ OneDrive integration initialized, checking authentication...');
        
        if (onedrive.isAuthenticated) {
          console.log('✅ OneDrive is authenticated after initialization');
          // Update the config
          if (window.oneDriveConfig) {
            window.oneDriveConfig.isConnected = true;
            window.oneDriveConfig.lastSync = new Date().toISOString();
            window.oneDriveConfig.authMethod = 'delayed_detection';
          }
          return LOGIN_TYPES.ONEDRIVE;
        } else {
          console.log('❌ OneDrive is not authenticated after initialization');
        }
      }
    } catch (initError) {
      console.log('⚠️ Error initializing OneDrive for detection:', initError);
    }
  }
  
  console.log('ℹ️ No login detected, returning NONE');
  return LOGIN_TYPES.NONE;
}

// Force OneDrive authentication check
async function forceOneDriveAuthentication() {
  if (!window.OneDriveCustomPathIntegration) {
    console.log('❌ OneDrive integration not available');
    return false;
  }
  
  try {
    const onedrive = new window.OneDriveCustomPathIntegration();
    
    // Try to authenticate if not already authenticated
    if (!onedrive.isAuthenticated) {
      console.log('🔄 Attempting to authenticate OneDrive...');
      
      // Try to initialize authentication
      if (typeof onedrive.initialize === 'function') {
        await onedrive.initialize();
      }
      
      // Check if authentication was successful
      if (onedrive.isAuthenticated) {
        console.log('✅ OneDrive authentication successful');
        if (window.oneDriveConfig) {
          window.oneDriveConfig.isConnected = true;
          window.oneDriveConfig.lastSync = new Date().toISOString();
        }
        return true;
      } else {
        console.log('❌ OneDrive authentication failed');
        return false;
      }
    } else {
      console.log('✅ OneDrive already authenticated');
      if (window.oneDriveConfig) {
        window.oneDriveConfig.isConnected = true;
      }
      return true;
    }
  } catch (error) {
    console.error('❌ Error during OneDrive authentication:', error);
    return false;
  }
}

// Enhanced OneDrive authentication check
async function checkOneDriveAuthentication() {
  const loginType = getCurrentLoginType();
  
  if (loginType === LOGIN_TYPES.ONEDRIVE) {
    console.log('🔄 Verifying OneDrive authentication...');
    const isAuthenticated = await forceOneDriveAuthentication();
    
    if (isAuthenticated) {
      console.log('✅ OneDrive authentication verified');
      return true;
    } else {
      console.log('❌ OneDrive authentication failed, falling back to local storage');
      return false;
    }
  }
  
  return false;
}

// REAL OneDrive login verification - Test actual API access
async function verifyRealOneDriveLogin() {
  if (!window.OneDriveCustomPathIntegration) {
    console.log('❌ OneDrive integration not available for real verification');
    return false;
  }
  
  try {
    const onedrive = new window.OneDriveCustomPathIntegration();
    
    console.log('🔍 Starting REAL OneDrive login verification...');
    
    // Step 1: Check if OneDrive claims to be authenticated
    if (!onedrive.isAuthenticated) {
      console.log('❌ OneDrive claims not to be authenticated');
      return false;
    }
    
    console.log('✅ Step 1: OneDrive claims to be authenticated');
    
    // Step 2: Try to access OneDrive API - Test folder creation
    console.log('🔄 Step 2: Testing OneDrive API access...');
    const testFolderPath = 'OneDrive/TheBridge/TestVerification';
    
    try {
      await onedrive.ensureFolder(testFolderPath);
      console.log('✅ Step 2: Successfully created/accessed test folder');
    } catch (folderError) {
      console.log('❌ Step 2: Failed to create/access test folder:', folderError);
      return false;
    }
    
    // Step 3: Test file write operation
    console.log('🔄 Step 3: Testing OneDrive file write...');
    const testFileName = `login-verification-${Date.now()}.json`;
    const testFilePath = `${testFolderPath}/${testFileName}`;
    const testData = {
      verification: true,
      timestamp: new Date().toISOString(),
      message: 'This is a login verification test'
    };
    
    try {
      await onedrive.saveFile(testFilePath, JSON.stringify(testData, null, 2));
      console.log('✅ Step 3: Successfully wrote test file to OneDrive');
    } catch (writeError) {
      console.log('❌ Step 3: Failed to write test file:', writeError);
      return false;
    }
    
    // Step 4: Test file read operation
    console.log('🔄 Step 4: Testing OneDrive file read...');
    try {
      const readContent = await onedrive.loadFile(testFilePath);
      const readData = JSON.parse(readContent);
      
      if (readData.verification && readData.timestamp) {
        console.log('✅ Step 4: Successfully read test file from OneDrive');
      } else {
        console.log('❌ Step 4: Test file content is invalid');
        return false;
      }
    } catch (readError) {
      console.log('❌ Step 4: Failed to read test file:', readError);
      return false;
    }
    
    // Step 5: Clean up test file
    console.log('🔄 Step 5: Cleaning up test file...');
    try {
      await onedrive.deleteFile(testFilePath);
      console.log('✅ Step 5: Successfully cleaned up test file');
    } catch (cleanupError) {
      console.log('⚠️ Step 5: Failed to clean up test file (non-critical):', cleanupError);
    }
    
    console.log('🎉 REAL OneDrive login verification COMPLETED SUCCESSFULLY!');
    return true;
    
  } catch (error) {
    console.error('❌ REAL OneDrive login verification FAILED:', error);
    return false;
  }
}

// Enhanced authentication check with real verification
async function checkOneDriveAuthenticationWithRealTest() {
  const loginType = getCurrentLoginType();
  
  if (loginType === LOGIN_TYPES.ONEDRIVE) {
    console.log('🔄 Starting enhanced OneDrive authentication check...');
    
    // First, try basic authentication
    const basicAuth = await forceOneDriveAuthentication();
    
    if (!basicAuth) {
      console.log('❌ Basic OneDrive authentication failed');
      return false;
    }
    
    console.log('✅ Basic OneDrive authentication passed, now testing REAL access...');
    
    // Then, test real API access
    const realAccess = await verifyRealOneDriveLogin();
    
    if (realAccess) {
      console.log('🎉 OneDrive login is REAL and fully functional!');
      
      // Update config to reflect real authentication
      if (window.oneDriveConfig) {
        window.oneDriveConfig.isConnected = true;
        window.oneDriveConfig.lastSync = new Date().toISOString();
        window.oneDriveConfig.authMethod = 'real_verification';
        window.oneDriveConfig.verifiedAt = new Date().toISOString();
      }
      
      return true;
    } else {
      console.log('❌ OneDrive login is NOT REAL - API access failed');
      
      // Reset config to reflect failed authentication
      if (window.oneDriveConfig) {
        window.oneDriveConfig.isConnected = false;
        window.oneDriveConfig.authMethod = 'failed_verification';
      }
      
      return false;
    }
  }
  
  return false;
}

// Get storage path based on login type
function getStoragePathForLoginType(loginType) {
  switch (loginType) {
    case LOGIN_TYPES.ONEDRIVE:
      return 'OneDrive/TheBridge/Configurations';
    case LOGIN_TYPES.GUEST:
      return 'local/temp';
    default:
      return 'local/default';
  }
}

// Get unified OneDrive path for different file types
function getOneDrivePath(fileType = 'configurations') {
  const basePath = 'OneDrive/TheBridge';
  
  switch (fileType) {
    case 'configurations':
      return `${basePath}/Configurations`;
    case 'versions':
      return `${basePath}/Versions`;
    case 'teams':
      return `${basePath}/Teams`;
    case 'users':
      return `${basePath}/Users`;
    case 'dashboard':
      return `${basePath}/Dashboard`;
    default:
      return `${basePath}/Configurations`;
  }
}



// Save configuration based on current login type
async function saveConfigurationByLoginType(configData, configName = 'app-config') {
  const loginType = getCurrentLoginType();
  const storagePath = getStoragePathForLoginType(loginType);
  
  console.log(`💾 Saving configuration for login type: ${loginType} to path: ${storagePath}`);
  
  try {
    switch (loginType) {
      case LOGIN_TYPES.ONEDRIVE:
        return await saveConfigurationToOneDrive(configData, configName);
      case LOGIN_TYPES.GUEST:
        return await saveConfigurationToLocalStorage(configData, configName);
      default:
        return await saveConfigurationToLocalStorage(configData, configName);
    }
  } catch (error) {
    console.error(`❌ Error saving configuration for ${loginType}:`, error);
    // Fallback to local storage
    return await saveConfigurationToLocalStorage(configData, configName);
  }
}

// Load configuration based on current login type
async function loadConfigurationByLoginType(configName = 'app-config') {
  const loginType = getCurrentLoginType();
  const storagePath = getStoragePathForLoginType(loginType);
  
  console.log(`📂 Loading configuration for login type: ${loginType} from path: ${storagePath}`);
  
  try {
    switch (loginType) {
      case LOGIN_TYPES.ONEDRIVE:
        return await loadConfigurationFromOneDrive(configName);
      case LOGIN_TYPES.GUEST:
        return await loadConfigurationFromLocalStorage(configName);
      default:
        return await loadConfigurationFromLocalStorage(configName);
    }
  } catch (error) {
    console.error(`❌ Error loading configuration for ${loginType}:`, error);
    // Fallback to local storage
    return await loadConfigurationFromLocalStorage(configName);
  }
}

// Save configuration to OneDrive
async function saveConfigurationToOneDrive(configData, configName) {
  try {
    // Use unified storage system (OneDrive first, then localStorage)
    const fileName = `${configName}-${new Date().toISOString().split('T')[0]}.json`;
    const result = await saveToUnifiedBackend(configData, fileName, {
      teamId: window.currentTeam?.id || 'default-team',
      userEmail: window.currentUser?.email || 'default-user@example.com'
    });
    
    console.log(`✅ Configuration saved using unified storage:`, result);
    
    return { 
      success: true, 
      path: fileName, 
      type: result.type === 'OneDrive' ? 'onedrive' : 'local' 
    };
  } catch (error) {
    console.error('❌ Error saving configuration to OneDrive:', error);
    throw error;
  }
}



// Save configuration to local storage
async function saveConfigurationToLocalStorage(configData, configName) {
  const key = `thebridge_${configName}_${new Date().toISOString().split('T')[0]}`;
  localStorage.setItem(key, JSON.stringify(configData));
  console.log(`✅ Configuration saved to local storage: ${key}`);
  
  return { success: true, path: key, type: 'local' };
}

// Load configuration from OneDrive
async function loadConfigurationFromOneDrive(configName) {
  if (!window.OneDriveCustomPathIntegration) {
    throw new Error('OneDrive integration not available');
  }
  
  const onedrive = new window.OneDriveCustomPathIntegration();
  const folderPath = getOneDrivePath('configurations');
  const filePath = `${folderPath}/${configName}.json`;
  
  const data = await onedrive.loadFile(filePath);
  console.log(`✅ Configuration loaded from OneDrive: ${filePath}`);
  
  return JSON.parse(data);
}

// Load from Azure AD
async function loadFromAzureAD(configName) {
  if (!window.OneDriveCustomPathIntegration) {
    throw new Error('Azure AD storage not available');
  }
  
  const onedrive = new window.OneDriveCustomPathIntegration();
  const filePath = `AzureAD/TheBridge/Configurations/${configName}.json`;
  
  const data = await onedrive.loadFile(filePath);
  console.log(`✅ Configuration loaded from Azure AD: ${filePath}`);
  
  return JSON.parse(data);
}

// Load configuration from local storage
async function loadConfigurationFromLocalStorage(configName) {
  const key = `thebridge_${configName}`;
  const data = localStorage.getItem(key);
  
  if (!data) {
    throw new Error('Configuration not found in local storage');
  }
  
  console.log(`✅ Configuration loaded from local storage: ${key}`);
  return JSON.parse(data);
}

// Update User Configuration Modal with current session info
async function updateUserConfigurationModal() {
  console.log('🔄 Updating User Configuration Modal...');
  
  // Note: Current Session section has been removed from the modal
  // This function now only handles other modal updates if needed
  
  console.log('✅ User Configuration Modal updated (Current Session section removed)');
}

// Force update storage indicator
async function forceUpdateStorageIndicator() {
  console.log('🔄 Force updating storage indicator...');
  
  // Force OneDrive connection check
  forceOneDriveConnectionCheck();
  
  // Update team status bar which includes storage indicator
  updateTeamStatusBar();
  
  // Also update user configuration modal if it's open
  const userSetUpModal = document.getElementById('userSetUpModal');
  if (userSetUpModal && userSetUpModal.style.display === 'flex') {
    await updateUserConfigurationModal();
  }
  
  console.log('✅ Storage indicator force updated');
}

// Force OneDrive connection check
function forceOneDriveConnectionCheck() {
  console.log('🔄 Force checking OneDrive connection...');
  
  if (window.OneDriveCustomPathIntegration) {
    try {
      const onedrive = new window.OneDriveCustomPathIntegration();
      
      // Check if OneDrive is authenticated
      if (onedrive.isAuthenticated) {
        console.log('✅ OneDrive is authenticated, updating config...');
        
        // Update OneDrive config
        if (window.oneDriveConfig) {
          window.oneDriveConfig.isConnected = true;
          window.oneDriveConfig.lastSync = new Date().toISOString();
          window.oneDriveConfig.authMethod = 'automatic_detection';
        }
        
        // Force storage indicator update
        setTimeout(() => {
          updateTeamStatusBar();
        }, 100);
        
        return true;
      } else {
        console.log('❌ OneDrive is not authenticated');
        if (window.oneDriveConfig) {
          window.oneDriveConfig.isConnected = false;
        }
        return false;
      }
    } catch (error) {
      console.error('❌ Error checking OneDrive connection:', error);
      return false;
    }
  } else {
    console.log('⚠️ OneDrive integration not available');
    return false;
  }
}

// Test OneDrive connection and save configuration
async function testOneDriveConnection() {
  console.log('🧪 Testing OneDrive connection...');
  
  try {
    // Check if we have a valid token
    const token = localStorage.getItem('onedrive_token');
    if (!token) {
      console.log('❌ No OneDrive token found');
      return false;
    }
    
    // Test API call to OneDrive
    const response = await fetch('https://graph.microsoft.com/v1.0/me/drive/root', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.log('❌ OneDrive API test failed:', response.status);
      return false;
    }
    
    const data = await response.json();
    console.log('✅ OneDrive connection successful:', data);
    
    // Test saving a configuration
    const testConfig = {
      test: true,
      timestamp: Date.now(),
      message: 'OneDrive connection test'
    };
    
    const saveResponse = await fetch('https://graph.microsoft.com/v1.0/me/drive/root:/TheBridge/test-config.json:/content', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testConfig)
    });
    
    if (saveResponse.ok) {
      console.log('✅ Configuration saved to OneDrive successfully');
      
      // Test loading the configuration
      const loadResponse = await fetch('https://graph.microsoft.com/v1.0/me/drive/root:/TheBridge/test-config.json:/content', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (loadResponse.ok) {
        const loadedConfig = await loadResponse.json();
        console.log('✅ Configuration loaded from OneDrive:', loadedConfig);
        
        // Clean up test file
        await fetch('https://graph.microsoft.com/v1.0/me/drive/root:/TheBridge/test-config.json', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        return true;
      }
    }
    
    console.log('❌ Failed to save/load configuration to OneDrive');
    return false;
    
  } catch (error) {
    console.error('❌ OneDrive connection test failed:', error);
    return false;
  }
}

// Add test function to window for debugging
window.testOneDriveConnection = testOneDriveConnection;

// Add comprehensive OneDrive test function
window.testOneDriveComprehensive = async function() {
  console.log('🧪 Starting comprehensive OneDrive test...');
  
  // Test 1: Check token
  const token = localStorage.getItem('onedrive_token');
  console.log('1️⃣ Token check:', token ? '✅ Found' : '❌ Not found');
  
  // Test 2: Test API connection
  const connectionTest = await testOneDriveConnection();
  console.log('2️⃣ Connection test:', connectionTest ? '✅ Success' : '❌ Failed');
  
  // Test 3: Test configuration save/load
  try {
    const testConfig = {
      test: true,
      timestamp: Date.now(),
      user: 'test-user',
      data: { sample: 'configuration' }
    };
    
    // Save test configuration
    await saveToUnifiedBackend(testConfig, 'test-config.json', { fileType: 'configurations' });
    console.log('3️⃣ Configuration save test: ✅ Success');
    
    // Load test configuration
    const loadedConfig = await loadFromUnifiedBackend('test-config.json', { fileType: 'configurations' });
    console.log('4️⃣ Configuration load test:', loadedConfig ? '✅ Success' : '❌ Failed');
    
    if (loadedConfig) {
      console.log('📋 Loaded config:', loadedConfig);
    }
    
  } catch (error) {
    console.log('3️⃣-4️⃣ Configuration test: ❌ Failed -', error.message);
  }
  
  // Test 5: Check current login type
  const loginType = getCurrentLoginType();
  console.log('5️⃣ Current login type:', loginType);
  
  // Test 6: Check OneDrive integration
  const hasIntegration = typeof OneDriveCustomPathIntegration !== 'undefined';
  console.log('6️⃣ OneDrive integration available:', hasIntegration ? '✅ Yes' : '❌ No');
  
  console.log('🏁 Comprehensive test completed!');
};

// Add simple OneDrive save test function
window.testOneDriveSave = async function() {
  console.log('🧪 Testing OneDrive save functionality...');
  
  try {
    // Check if OneDrive integration is available
    if (typeof OneDriveCustomPathIntegration === 'undefined') {
      console.log('❌ OneDrive integration not available');
      return { success: false, error: 'OneDrive integration not available' };
    }
    
    // Create OneDrive instance
    const onedrive = new OneDriveCustomPathIntegration();
    
    // Check if authenticated
    if (!onedrive.isAuthenticated) {
      console.log('❌ OneDrive not authenticated');
      return { success: false, error: 'OneDrive not authenticated' };
    }
    
    // Create test data
    const testData = {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'This is a test file to verify OneDrive save functionality',
      user: window.currentUser?.email || 'test@example.com',
      randomNumber: Math.random()
    };
    
    console.log('📝 Test data created:', testData);
    
    // Ensure folder exists
    await onedrive.ensureFolder('TheBridge/Test');
    console.log('✅ Folder ensured');
    
    // Save file to OneDrive
    const fileName = `test-save-${Date.now()}.json`;
    const filePath = `TheBridge/Test/${fileName}`;
    
    console.log('💾 Saving file to OneDrive:', filePath);
    const saveResult = await onedrive.saveFile(filePath, JSON.stringify(testData, null, 2));
    console.log('✅ File saved successfully:', saveResult);
    
    // Try to load the file back
    console.log('📂 Loading file from OneDrive:', filePath);
    const loadedContent = await onedrive.loadFile(filePath);
    const loadedData = JSON.parse(loadedContent);
    console.log('✅ File loaded successfully:', loadedData);
    
    // Verify data integrity
    const dataMatches = JSON.stringify(testData) === JSON.stringify(loadedData);
    console.log('🔍 Data integrity check:', dataMatches ? '✅ Passed' : '❌ Failed');
    
    // Clean up test file
    try {
      await onedrive.deleteFile(filePath);
      console.log('🗑️ Test file cleaned up');
    } catch (cleanupError) {
      console.warn('⚠️ Could not clean up test file:', cleanupError);
    }
    
    return {
      success: true,
      saveResult,
      loadedData,
      dataMatches,
      message: 'OneDrive save test completed successfully!'
    };
    
  } catch (error) {
    console.error('❌ OneDrive save test failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'OneDrive save test failed!'
    };
  }
};

// Add simple OneDrive save/load test function
window.testOneDriveSaveLoad = async function() {
  console.log('🧪 Testing OneDrive save/load functionality...');
  
  try {
    // Check if OneDrive integration is available
    if (typeof OneDriveCustomPathIntegration === 'undefined') {
      console.log('❌ OneDrive integration not available');
      showUnifiedNotification('OneDrive integration not available', 'error');
      return false;
    }
    
    // Create OneDrive instance
    const onedrive = new OneDriveCustomPathIntegration();
    console.log('✅ OneDrive instance created');
    
    // Check authentication
    if (!onedrive.isAuthenticated) {
      console.log('❌ OneDrive not authenticated');
      showUnifiedNotification('OneDrive not authenticated. Please login first.', 'warning');
      return false;
    }
    
    console.log('✅ OneDrive is authenticated');
    
    // Test data
    const testData = {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'This is a test file from The Bridge',
      user: window.currentUser?.email || 'test@example.com'
    };
    
    // Test file path
    const testFilePath = 'OneDrive/TheBridge/Test/test-save-load.json';
    
    // Ensure folder exists
    console.log('📁 Ensuring test folder exists...');
    await onedrive.ensureFolder('OneDrive/TheBridge/Test');
    
    // Save file
    console.log('💾 Saving test file...');
    const saveResult = await onedrive.saveFile(testFilePath, JSON.stringify(testData, null, 2));
    console.log('✅ File saved successfully:', saveResult);
    
    // Load file
    console.log('📂 Loading test file...');
    const loadedContent = await onedrive.loadFile(testFilePath);
    const loadedData = JSON.parse(loadedContent);
    console.log('✅ File loaded successfully:', loadedData);
    
    // Verify data
    if (loadedData.test && loadedData.timestamp === testData.timestamp) {
      console.log('✅ Data verification successful');
      showUnifiedNotification('✅ OneDrive save/load test successful!', 'success');
      return true;
    } else {
      console.log('❌ Data verification failed');
      showUnifiedNotification('❌ OneDrive save/load test failed - data mismatch', 'error');
      return false;
    }
    
  } catch (error) {
    console.error('❌ OneDrive save/load test failed:', error);
    showUnifiedNotification(`❌ OneDrive test failed: ${error.message}`, 'error');
    return false;
  }
};

// Add team debugging function
window.debugTeams = async function() {
  console.log('🔍 Debugging teams...');
  
  try {
    // Get all teams
    const teams = await getAllTeams();
    console.log('📋 All teams:', teams);
    
    // Check localStorage
    const teamsData = localStorage.getItem('thebridge_teams');
    console.log('💾 Teams in localStorage:', teamsData);
    
    // Check OneDrive if available
    if (await shouldUseOneDriveAsBackend()) {
      try {
        const onedriveTeams = await loadTeamsFromOneDrive();
        console.log('☁️ Teams in OneDrive:', onedriveTeams);
      } catch (error) {
        console.log('❌ Could not load teams from OneDrive:', error);
      }
    }
    
    // Test team name check
    const testName = 'TestTeam';
    const existingTeam = await getTeamByIdentifier(testName);
    console.log(`🔍 Check for team "${testName}":`, existingTeam);
    
  } catch (error) {
    console.error('❌ Error debugging teams:', error);
  }
};

// Add user debugging function
window.debugUser = function() {
  console.log('👤 Debugging user...');
  console.log('Current user:', window.currentUser);
  console.log('Current team:', window.currentTeam);
  console.log('User role:', window.currentUser?.role);
  console.log('Is guest mode:', window.currentUser?.role === 'guest');
  
  // Check team management button
  const teamManagementBtn = document.getElementById('teamManagementBtn');
  const buttonText = getElement('#teamManagementText');
  console.log('Team management button:', teamManagementBtn);
  console.log('Button text element:', buttonText);
  console.log('Button display style:', teamManagementBtn?.style.display);
  console.log('Button text content:', buttonText?.textContent);
};

// Add dashboard debugging function
window.debugDashboard = async function() {
  console.log('📊 Debugging dashboard configuration...');
  
  try {
    // Check current dashboard config
    const config = await getDashboardConfig();
    console.log('Current dashboard config:', config);
    
    // Check localStorage
    const localStorageConfig = localStorage.getItem('dashboardConfig');
    console.log('Dashboard config in localStorage:', localStorageConfig);
    
    // Check OneDrive if available
    if (await shouldUseOneDriveAsBackend()) {
      try {
        const onedriveConfig = await loadFromOneDrive('dashboard-config.json');
        console.log('Dashboard config in OneDrive:', onedriveConfig);
      } catch (error) {
        console.log('❌ Could not load dashboard config from OneDrive:', error);
      }
    }
    
    // Test saving
    console.log('🧪 Testing dashboard config save...');
    const testConfig = {
      order: ['kpis', 'charts', 'quickfilters', 'activity'],
      titles: { kpis: 'Test KPIs', charts: 'Test Charts', quickfilters: 'Test Filters', activity: 'Test Activity' },
      kpis: true, charts: true, quickfilters: true, activity: true
    };
    
    await saveDashboardConfig(testConfig);
    console.log('✅ Test dashboard config saved');
    
    // Test loading
    const loadedConfig = await getDashboardConfig();
    console.log('✅ Test dashboard config loaded:', loadedConfig);
    
  } catch (error) {
    console.error('❌ Error debugging dashboard:', error);
  }
};

// Add OneDrive configuration debugging function
window.debugOneDriveConfig = function() {
  console.log('☁️ Debugging OneDrive configuration...');
  
  console.log('OneDrive integration available:', !!window.OneDriveCustomPathIntegration);
  console.log('OneDrive config:', window.oneDriveConfig);
  console.log('Current user:', window.currentUser);
  console.log('Current team:', window.currentTeam);
  
  // Check OneDrive authentication
  if (window.OneDriveCustomPathIntegration) {
    try {
      const onedrive = new window.OneDriveCustomPathIntegration();
      console.log('OneDrive instance created:', !!onedrive);
      console.log('OneDrive isAuthenticated:', onedrive.isAuthenticated);
      console.log('OneDrive accessToken:', !!onedrive.accessToken);
    } catch (error) {
      console.log('❌ Error creating OneDrive instance:', error);
    }
  }
  
  // Check login type detection
  const loginType = getCurrentLoginType();
  console.log('Detected login type:', loginType);
  
  // Check unified storage system
  console.log('Should use OneDrive as backend:', shouldUseOneDriveAsBackend());
};

// Update teams list in the modal
async function updateTeamsListInModal() {
  const userTeamsListElement = document.getElementById('userTeamsList');
  if (!userTeamsListElement) return;
  
  try {
    const teams = await getAllTeams();
    
    if (teams.length === 0) {
      userTeamsListElement.innerHTML = '<div style="font-style:italic; color:#B0BEC5;">No teams found</div>';
      return;
    }
    
    const teamsHTML = teams.map(team => `
      <div style="padding:0.5rem; margin-bottom:0.5rem; background:rgba(255,255,255,0.05); border-radius:4px; border:1px solid rgba(255,255,255,0.1);">
        <div style="font-weight:600; color:#E8F4F8;">${team.name}</div>
        <div style="font-size:0.8em; color:#B0BEC5;">Code: ${team.code || 'N/A'}</div>
        ${window.currentTeam && window.currentTeam.id === team.id ? 
          '<div style="font-size:0.8em; color:#10B981; margin-top:0.2rem;">✓ Current Team</div>' : ''}
      </div>
    `).join('');
    
    userTeamsListElement.innerHTML = teamsHTML;
  } catch (error) {
    console.error('Error updating teams list in modal:', error);
    userTeamsListElement.innerHTML = '<div style="font-style:italic; color:#d32f2f;">Error loading teams</div>';
  }
}

// Setup User Configuration Modal event listeners
function setupUserConfigurationModal() {
  // Save Configuration button
  const saveConfigurationBtn = document.getElementById('saveConfigurationBtn');
  if (saveConfigurationBtn) {
    saveConfigurationBtn.addEventListener('click', async () => {
      try {
        console.log('🔧 Save Configuration button clicked');
        
        // Debug current login type
        const loginType = getCurrentLoginType();
        console.log('🔍 Current login type detected:', loginType);
        
        const configData = getCurrentConfigurationData();
        console.log('📋 Configuration data prepared:', configData);
        
        const result = await saveConfigurationByLoginType(configData, 'app-config');
        console.log('💾 Save result:', result);
        
        if (result.success) {
          if (loginType === 'onedrive' && result.type !== 'onedrive') {
            showUnifiedNotification('Advertencia: No se pudo guardar en OneDrive. La configuración se guardó localmente.', 'warning');
          } else {
            const storageType = result.type === 'onedrive' ? 'OneDrive' : 'almacenamiento local';
            showUnifiedNotification(`¡Configuración guardada exitosamente en ${storageType}!`, 'success');
          }
        } else {
          showUnifiedNotification('No se pudo guardar la configuración', 'error');
        }
      } catch (error) {
        console.error('❌ Error saving configuration:', error);
        showUnifiedNotification('Error saving configuration: ' + error.message, 'error');
      }
    });
  }
  
  // Load Configuration button
  const loadConfigurationBtn = document.getElementById('loadConfigurationBtn');
  if (loadConfigurationBtn) {
    loadConfigurationBtn.addEventListener('click', async () => {
      try {
        const configData = await loadConfigurationByLoginType('app-config');
        applyConfigurationData(configData);
        showUnifiedNotification('Configuration loaded successfully!', 'success');
      } catch (error) {
        console.error('Error loading configuration:', error);
        showUnifiedNotification('Error loading configuration: ' + error.message, 'error');
      }
    });
  }
  
  // Sync Configuration button
  const syncConfigurationBtn = document.getElementById('syncConfigurationBtn');
  if (syncConfigurationBtn) {
    syncConfigurationBtn.addEventListener('click', async () => {
      try {
        const configData = getCurrentConfigurationData();
        const result = await saveConfigurationByLoginType(configData, 'app-config');
        
        if (result.success) {
          showUnifiedNotification(`Configuration synced to ${result.type} successfully!`, 'success');
        } else {
          showUnifiedNotification('Failed to sync configuration', 'error');
        }
      } catch (error) {
        console.error('Error syncing configuration:', error);
        showUnifiedNotification('Error syncing configuration: ' + error.message, 'error');
      }
    });
  }
  
  // Test OneDrive Save button
  const testOneDriveBtn = document.getElementById('testOneDriveBtn');
  if (testOneDriveBtn) {
    testOneDriveBtn.addEventListener('click', async () => {
      try {
        console.log('🧪 Test OneDrive Save button clicked');
        
        // Show loading state
        testOneDriveBtn.disabled = true;
        testOneDriveBtn.textContent = 'Testing...';
        
        // Run the test
        const result = await window.testOneDriveSave();
        
        // Reset button
        testOneDriveBtn.disabled = false;
        testOneDriveBtn.textContent = 'Test OneDrive Save';
        
        // Show result
        if (result.success) {
          showUnifiedNotification(`✅ OneDrive test successful! ${result.message}`, 'success');
          console.log('🎉 OneDrive test completed successfully:', result);
        } else {
          showUnifiedNotification(`❌ OneDrive test failed: ${result.error}`, 'error');
          console.error('❌ OneDrive test failed:', result);
        }
        
      } catch (error) {
        console.error('❌ Error running OneDrive test:', error);
        testOneDriveBtn.disabled = false;
        testOneDriveBtn.textContent = 'Test OneDrive Save';
        showUnifiedNotification('Error running OneDrive test: ' + error.message, 'error');
      }
    });
  }
}

// Get current configuration data
function getCurrentConfigurationData() {
  return {
    timestamp: new Date().toISOString(),
    version: '1.0',
    description: 'The Bridge application configuration',
    
    // User and team info
    userInfo: {
      email: window.currentUser?.email || 'guest',
      name: window.currentUser?.name || 'Guest User',
      role: window.currentUser?.role || 'guest',
      loginType: getCurrentLoginType(),
      teamId: window.currentTeam?.id || 'none',
      teamName: window.currentTeam?.name || 'No Team'
    },
    
    // Application state
    filters: JSON.parse(localStorage.getItem('myFilters') || '[]'),
    quickFilters: JSON.parse(localStorage.getItem('quickFilters') || '{}'),
    tableViews: JSON.parse(localStorage.getItem('tableViews') || '{}'),
    columnConfig: JSON.parse(localStorage.getItem('thebridge_column_config') || '{}'),
    visibleColumns: JSON.parse(localStorage.getItem('thebridge_visible_columns') || '[]'),
    customSummaries: JSON.parse(localStorage.getItem('customSummaries') || '{}'),
    favorites: JSON.parse(localStorage.getItem('thebridge_favorites') || '[]'),
    theme: localStorage.getItem('thebridge_theme') || 'dark',
    language: localStorage.getItem('thebridge_language') || 'es',
    autoSaveEnabled: window.autoSaveEnabled || false
  };
}

// Apply configuration data
function applyConfigurationData(configData) {
  try {
    // Apply filters
    if (configData.filters) {
      localStorage.setItem('myFilters', JSON.stringify(configData.filters));
    }
    
    // Apply quick filters
    if (configData.quickFilters) {
      localStorage.setItem('quickFilters', JSON.stringify(configData.quickFilters));
    }
    
    // Apply table views
    if (configData.tableViews) {
      localStorage.setItem('tableViews', JSON.stringify(configData.tableViews));
    }
    
    // Apply column configuration
    if (configData.columnConfig) {
      localStorage.setItem('thebridge_column_config', JSON.stringify(configData.columnConfig));
    }
    
    // Apply visible columns
    if (configData.visibleColumns) {
      localStorage.setItem('thebridge_visible_columns', JSON.stringify(configData.visibleColumns));
    }
    
    // Apply custom summaries
    if (configData.customSummaries) {
      localStorage.setItem('customSummaries', JSON.stringify(configData.customSummaries));
    }
    
    // Apply favorites
    if (configData.favorites) {
      localStorage.setItem('thebridge_favorites', JSON.stringify(configData.favorites));
    }
    
    // Apply theme
    if (configData.theme) {
      localStorage.setItem('thebridge_theme', configData.theme);
    }
    
    // Apply language
    if (configData.language) {
      localStorage.setItem('thebridge_language', configData.language);
    }
    
    // Apply auto-save setting
    if (configData.autoSaveEnabled !== undefined) {
      window.autoSaveEnabled = configData.autoSaveEnabled;
      updateAutoSaveIndicator();
    }
    
    console.log('✅ Configuration data applied successfully');
    
    // Refresh UI if needed
    if (typeof refreshUI === 'function') {
      refreshUI();
    }
    
  } catch (error) {
    console.error('❌ Error applying configuration data:', error);
    throw error;
  }
}

// Global function to force update user name display
window.forceUpdateUserName = async function() {
  console.log('🔧 Forcing user name update...');
  
  // First, let's check what data we have
  console.log('🔍 Current data before update:');
  console.log('window.currentUser:', window.currentUser);
  console.log('window.currentTeam:', window.currentTeam);
  
  // Try to fix user data if it's empty
  if (window.currentUser && (!window.currentUser.name || !window.currentUser.email)) {
    console.log('⚠️ User data is incomplete, trying to fix...');
    
    // Try to get from localStorage
    const storedUser = localStorage.getItem('thebridge_current_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && (parsedUser.name || parsedUser.email)) {
          window.currentUser = { ...window.currentUser, ...parsedUser };
          console.log('✅ Fixed user data from localStorage:', window.currentUser);
        }
      } catch (e) {
        console.warn('⚠️ Error parsing stored user:', e);
      }
    }
  }
  
  // Update the display
  await updateTeamStatusBar();
  console.log('✅ User name update completed');
  
  // Force immediate DOM update - Show role instead of name
  const userRole = document.getElementById('userRole');
  if (userRole && window.currentUser) {
    console.log('🔧 Force updating DOM element to show role...');
    const userRoleText = window.currentUser.role || 'user';
    const roleDisplayText = userRoleText.charAt(0).toUpperCase() + userRoleText.slice(1); // Capitalize first letter
    
    userRole.textContent = roleDisplayText;
    userRole.innerHTML = roleDisplayText;
    
    // Force re-render
    userRole.style.display = 'none';
    setTimeout(() => {
      userRole.style.display = '';
      console.log('✅ DOM force update completed - showing role:', roleDisplayText);
    }, 50);
  }
};

// Global function to force load latest version
window.forceLoadLatestVersion = async function() {
  console.log('🔧 Forcing latest version load...');
  
  // Check current state
  console.log('🔍 Current state:');
  console.log('window.currentTeam:', window.currentTeam);
  console.log('window.currentUser:', window.currentUser);
  console.log('window.backendService:', !!window.backendService);
  console.log('window.teamBackendConnected:', window.teamBackendConnected);
  
  // Ensure BackendService is available
  if (!window.backendService) {
    console.log('🔧 BackendService not available, trying to initialize...');
    
    // Try to initialize BackendService
    if (typeof BackendService !== 'undefined') {
      window.backendService = new BackendService();
      console.log('✅ BackendService initialized');
    } else {
      console.warn('⚠️ BackendService class not found, cannot load latest version');
      return false;
    }
  }
  
  // Check if we have team and user
  if (!window.currentTeam || !window.currentUser) {
    console.error('❌ No team or user available for loading latest version');
    return false;
  }
  
  try {
    await loadLatestVersionForTeam();
    console.log('✅ Latest version load completed');
    return true;
  } catch (error) {
    console.error('❌ Error forcing latest version load:', error);
    return false;
  }
};

// Global function to check user settings
window.checkUserSettings = function() {
  console.log('🔍 Checking user settings...');
  console.log('Current user:', window.currentUser);
  console.log('User settings:', window.userSettings);
  console.log('User filters:', window.userFilters);
  console.log('Local filters:', JSON.parse(localStorage.getItem('myFilters') || '[]'));
  console.log('Quick filters:', JSON.parse(localStorage.getItem('quickFilters') || '{}'));
  console.log('Custom summaries:', JSON.parse(localStorage.getItem('customSummaries') || '{}'));
  
  // Check localStorage data
  console.log('🔍 localStorage data:');
  console.log('thebridge_current_user:', localStorage.getItem('thebridge_current_user'));
  console.log('thebridge_current_team:', localStorage.getItem('thebridge_current_team'));
  console.log('thebridge_users:', localStorage.getItem('thebridge_users'));
  console.log('thebridge_teams:', localStorage.getItem('thebridge_teams'));
  
  // Check team members
  if (window.currentTeam && window.currentTeam.members) {
    console.log('👥 Team members:', window.currentTeam.members);
  }
  
  // Check user credentials
  if (window.currentUser && window.currentUser.email) {
    const credentials = getUserCredentials(window.currentUser.email);
    console.log('🔑 User credentials:', credentials);
  }
};

// Global function to reload user settings
window.reloadUserSettings = async function() {
  if (!window.currentUser || !window.currentTeam) {
    console.log('❌ No user or team logged in');
    return;
  }
  
  console.log('🔄 Reloading user settings...');
  try {
    const userProfile = await loadUserProfile(window.currentUser.email, window.currentTeam.id);
    const userSettings = await loadUserSettings(window.currentUser.email, window.currentTeam.id);
    const userFilters = await loadUserFilters(window.currentUser.email, window.currentTeam.id);
    
    if (userProfile) {
      window.currentUser = { ...window.currentUser, ...userProfile };
      localStorage.setItem('thebridge_current_user', JSON.stringify(window.currentUser));
    }
    
    if (userSettings) {
      window.userSettings = userSettings;
      applyUserSettings(userSettings);
    }
    
    if (userFilters && userFilters.length > 0) {
      window.userFilters = userFilters;
      localStorage.setItem('myFilters', JSON.stringify(userFilters));
    }
    
    console.log('✅ User settings reloaded successfully');
  } catch (error) {
    console.error('❌ Error reloading user settings:', error);
  }
};

// Global function to check BackendService status
window.checkBackendService = function() {
  console.log('🔍 Checking BackendService status...');
  console.log('BackendService available:', !!window.backendService);
  console.log('BackendService class available:', typeof BackendService !== 'undefined');
  
  if (window.backendService) {
    console.log('BackendService connection status:', window.backendService.isConnected());
    console.log('BackendService base URL:', window.backendService.baseURL);
  }
  
  return {
    serviceAvailable: !!window.backendService,
    classAvailable: typeof BackendService !== 'undefined',
    isConnected: window.backendService ? window.backendService.isConnected() : false
  };
};

// Global function to force initialize BackendService
window.forceInitializeBackendService = function() {
  console.log('🔧 Force initializing BackendService...');
  
  if (typeof BackendService !== 'undefined') {
    window.backendService = new BackendService();
    console.log('✅ BackendService force initialized');
    return true;
  } else {
    console.error('❌ BackendService class not available');
    return false;
  }
};

// Global function to check backend and data status
window.checkBackendAndDataStatus = async function() {
  console.log('🔍 Checking backend and data status...');
  
  // Check backend connection
  console.log('🌐 Backend connection check:');
  try {
    const response = await fetch(`${window.backendUrl}/health`);
    console.log('✅ Backend health check:', response.status, response.ok);
  } catch (error) {
    console.error('❌ Backend health check failed:', error);
  }
  
  // Check team versions
  if (window.currentTeam) {
    console.log('📊 Checking team versions...');
    try {
      const response = await fetch(`${window.backendUrl}/api/teams/${window.currentTeam.id}/versions`);
      const data = await response.json();
      console.log('✅ Team versions response:', data);
    } catch (error) {
      console.error('❌ Team versions check failed:', error);
    }
  }
  
    // Check simple CSV server
  // Usar la configuración global del backend
  const csvServerUrl = window.backendConfig 
    ? window.backendConfig.getCsvBackendUrl()
    : 'http://localhost:3005';
  
  // Si estamos en modo offline, no verificar CSV server
  if (window.backendConfig && window.backendConfig.isOfflineMode()) {
    console.log('🌐 Offline mode: CSV server not available, using local storage');
  } else {
    console.log('📄 Checking simple CSV server...');
    try {
      const response = await fetch(`${csvServerUrl}/health`);
      console.log('✅ Simple CSV server health:', response.status, response.ok);
    } catch (error) {
      console.error('❌ Simple CSV server health check failed:', error);
      if (window.backendConfig && window.backendConfig.isProduction) {
        console.log('🌐 Production mode: CSV server not available, using offline mode');
      }
    }
    
    // Check if simple CSV server has data
    if (window.currentTeam && window.currentUser) {
      try {
        const response = await fetch(`${csvServerUrl}/api/csv/last-upload?teamId=${window.currentTeam.id}&userEmail=${window.currentUser.email}`);
        const data = await response.json();
        console.log('✅ Simple CSV server data:', data);
      } catch (error) {
        console.error('❌ Simple CSV server data check failed:', error);
        if (window.backendConfig && window.backendConfig.isProduction) {
          console.log('🌐 Production mode: CSV data not available, using offline mode');
        }
      }
    }
  }
};

// Global function to enable guest backend access
window.enableGuestAccess = function() {
  console.log('🔓 User requested guest access...');
  enableGuestBackendAccess();
};

// Manual backend connection
async function manualBackendConnection() {
  const connectBtn = document.getElementById('connectBackendBtn');
  const originalText = connectBtn.innerHTML;
  
  try {
    // Show loading state
    connectBtn.innerHTML = `
      <svg viewBox="0 0 24 24" style="width:1.2em;height:1.2em;margin-right:0.5rem;animation:spin 1s linear infinite;"><path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z" fill="currentColor"/></svg>
      Connecting...
    `;
    connectBtn.style.color = '#FF9800';
    connectBtn.disabled = true;
    
    // Test connection
    const response = await fetch(`${window.backendUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });
    
    if (response.ok) {
      window.teamBackendConnected = true;
      connectBtn.innerHTML = `
        <svg viewBox="0 0 24 24" style="width:1.2em;height:1.2em;margin-right:0.5rem;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>
        Connected
      `;
      connectBtn.style.color = '#10B981';
      
      // Show success notification
      showNotification('Backend connected successfully!', 'success');
      
      // Update UI
      updateTeamStatusBar();
      
      // If user is logged in, try to reload their profile
      if (window.currentUser && window.currentTeam) {
        try {
          const userProfile = await loadUserProfile(window.currentUser.email, window.currentTeam.id);
          const userSettings = await loadUserSettings(window.currentUser.email, window.currentTeam.id);
          const userFilters = await loadUserFilters(window.currentUser.email, window.currentTeam.id);
          
          if (userProfile) {
            window.currentUser = { ...window.currentUser, ...userProfile };
            localStorage.setItem('thebridge_current_user', JSON.stringify(window.currentUser));
          }
          
          if (userSettings) {
            window.userSettings = userSettings;
            applyUserSettings(userSettings);
          }
          
          if (userFilters && userFilters.length > 0) {
            window.userFilters = userFilters;
          }
          
          console.log('✅ User profile and settings reloaded after connection');
        } catch (error) {
          console.warn('⚠️ Could not reload user profile after connection:', error);
        }
      }
      
      // Reset button after 3 seconds
      setTimeout(() => {
        connectBtn.innerHTML = originalText;
        connectBtn.style.color = '#FF9800';
        connectBtn.disabled = false;
      }, 3000);
      
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    
    // Show error state
    connectBtn.innerHTML = `
      <svg viewBox="0 0 24 24" style="width:1.2em;height:1.2em;margin-right:0.5rem;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>
      Connection Failed
    `;
    connectBtn.style.color = '#d32f2f';
    
    // Show error notification
    showNotification('Failed to connect to backend. Please check if the server is running.', 'error');
    
    // Reset button after 5 seconds
    setTimeout(() => {
      connectBtn.innerHTML = originalText;
      connectBtn.style.color = '#FF9800';
      connectBtn.disabled = false;
    }, 5000);
  }
}

// Monitor backend connection status
async function startBackendConnectionMonitoring() {
  const checkConnection = async () => {
    try {
      console.log('🔍 Checking backend connection...');
      
      // Use proper backend configuration
      const backendUrl = window.backendConfig ? window.backendConfig.getMainBackendUrl() : 'http://localhost:3001';
      
      // Don't check if in offline mode
      if (backendUrl === 'offline') {
        window.teamBackendConnected = false;
        console.log('📱 Backend connection: Offline mode');
        updateTeamStatusBar();
        updateBackendSettingsButton();
        return;
      }
      
      const response = await fetch(`${backendUrl}/health`);
      if (response.ok) {
        window.teamBackendConnected = true;
        console.log('✅ Backend connection: OK');
      } else {
        window.teamBackendConnected = false;
        console.log('❌ Backend connection: Failed (HTTP ' + response.status + ')');
      }
    } catch (error) {
      window.teamBackendConnected = false;
      console.log('❌ Backend connection: Error -', error.message);
    }
    
    // Update the indicator and button
    updateTeamStatusBar();
    updateBackendSettingsButton();
  };
  
  // Check immediately
  await checkConnection();
  
  // Check every 30 seconds
  setInterval(checkConnection, 30000);
}

// Enable guest access to backend
function enableGuestBackendAccess() {
  console.log('🔓 Enabling guest backend access...');
  
  // Create a guest user session if no team is logged in
  if (!window.currentTeam && !window.currentUser) {
    const guestUser = {
      email: 'guest@thebridge.local',
      name: 'Guest User',
      role: 'guest',
      id: 'guest-user-' + Date.now()
    };
    
    const guestTeam = {
      id: 'guest-team',
      name: 'Guest Team',
      code: 'GUEST',
      description: 'Temporary guest access',
      createdAt: new Date().toISOString(),
      members: [guestUser]
    };
    
    // Set guest session
    window.currentUser = guestUser;
    window.currentTeam = guestTeam;
    
    // Update UI to show guest status
    updateTeamStatusBar();
    updateTeamManagementButtonText().catch(console.error);
    
    console.log('✅ Guest backend access enabled');
    // Solo mostrar notificación si no estamos en modo offline
    if (!window.backendConfig || !window.backendConfig.isOfflineMode()) {
    showNotification('Guest access enabled - Backend features available', 'info');
    }
  }
}

// Update backend settings button based on connection status
function updateBackendSettingsButton() {
  const settingsBtn = document.getElementById('backendSettingsBtn');
  if (!settingsBtn) return;
  
  // Don't update if button is in loading or error state
  if (settingsBtn.disabled) return;
  
  if (window.teamBackendConnected) {
    settingsBtn.innerHTML = `
      <svg viewBox="0 0 24 24" style="width:1.2em;height:1.2em;margin-right:0.5rem;"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" fill="currentColor"/></svg>
      Backend Settings
    `;
    settingsBtn.style.color = '#ffffff';
  } else {
    settingsBtn.innerHTML = `
      <svg viewBox="0 0 24 24" style="width:1.2em;height:1.2em;margin-right:0.5rem;"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" fill="currentColor"/></svg>
      Backend Settings
    `;
    settingsBtn.style.color = '#ffffff';
  }
}

// Open backend settings modal
function openBackendSettingsModal() {
  console.log('🔧 Opening backend settings modal...');
  const modal = document.getElementById('backendSettingsModal');
  if (!modal) {
    console.error('❌ Backend settings modal not found!');
    showNotification('Backend settings modal not found', 'error');
    return;
  }
  
  console.log('✅ Modal found, loading settings...');
  
  try {
    // Load current settings
    loadBackendSettings();
    
    // Update connection status
    updateModalConnectionStatus();
    
    // Setup button event listeners when modal opens
    setupBackendSettingsModalButtons();
    
    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    console.log('✅ Backend settings modal opened');
  } catch (error) {
    console.error('❌ Error opening backend settings modal:', error);
    showNotification('Error opening backend settings', 'error');
  }
}

// Setup backend settings modal (initial setup)
function setupBackendSettingsModal() {
  console.log('🔧 Setting up backend settings modal...');
  // This function is called once during initialization
  // Button event listeners are set up when modal opens
}

// Setup backend settings modal buttons (called when modal opens)
function setupBackendSettingsModalButtons() {
  console.log('🔧 Setting up backend settings modal buttons...');
  
  const modal = document.getElementById('backendSettingsModal');
  const closeBtn = document.getElementById('closeBackendSettingsBtn');
  const testBtn = document.getElementById('testBackendConnectionBtn');
  const reconnectBtn = document.getElementById('reconnectBackendBtn');
  const saveBtn = document.getElementById('saveBackendSettingsBtn');
  const resetBtn = document.getElementById('resetBackendSettingsBtn');
  const logsCheckbox = document.getElementById('showConnectionLogsCheckbox');
  
  console.log('Found buttons:', {
    close: !!closeBtn,
    test: !!testBtn,
    reconnect: !!reconnectBtn,
    save: !!saveBtn,
    reset: !!resetBtn,
    logs: !!logsCheckbox
  });
  
  // Remove existing listeners and add new ones
  if (closeBtn) {
    closeBtn.onclick = () => {
      console.log('🔴 Close button clicked');
      modal.classList.add('hidden');
      modal.style.display = 'none';
    };
  }
  
  if (testBtn) {
    testBtn.onclick = async () => {
      console.log('🧪 Test button clicked');
      await testBackendConnection();
    };
  }
  
  if (reconnectBtn) {
    reconnectBtn.onclick = async () => {
      console.log('🔄 Reconnect button clicked');
      await reconnectBackend();
    };
  }
  
  if (saveBtn) {
    saveBtn.onclick = () => {
      console.log('💾 Save button clicked');
      saveBackendSettings();
    };
  }
  
  if (resetBtn) {
    resetBtn.onclick = () => {
      console.log('🔄 Reset button clicked');
      resetBackendSettings();
    };
  }
  
  if (logsCheckbox) {
    logsCheckbox.onchange = () => {
      const logsSection = document.getElementById('connectionLogsSection');
      if (logsSection) {
        logsSection.style.display = logsCheckbox.checked ? 'block' : 'none';
      }
    };
  }
  
  // Also setup click outside to close
  modal.onclick = (e) => {
    if (e.target === modal) {
      console.log('🔴 Clicked outside modal, closing');
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  };
}

// Load backend settings into modal
function loadBackendSettings() {
  const urlInput = document.getElementById('backendUrlInput');
  const timeoutInput = document.getElementById('backendTimeoutInput');
  const autoReconnectCheckbox = document.getElementById('autoReconnectCheckbox');
  const healthChecksCheckbox = document.getElementById('enableHealthChecksCheckbox');
  
  // Use proper backend configuration
  const backendUrl = window.backendConfig ? window.backendConfig.getMainBackendUrl() : 'http://localhost:3001';
  
  if (urlInput) urlInput.value = backendUrl;
  if (timeoutInput) timeoutInput.value = window.backendTimeout || 30;
  if (autoReconnectCheckbox) autoReconnectCheckbox.checked = window.autoReconnect !== false;
  if (healthChecksCheckbox) healthChecksCheckbox.checked = window.enableHealthChecks !== false;
  
  // Load storage information
  loadStorageInformation();
}

// Update modal connection status
function updateModalConnectionStatus() {
  const indicator = document.getElementById('modalBackendIndicator');
  const status = document.getElementById('modalBackendStatus');
  
  if (indicator && status) {
    if (window.teamBackendConnected) {
      indicator.style.background = '#10B981';
      status.textContent = 'Backend connected';
      status.style.color = '#10B981';
    } else {
      indicator.style.background = '#d32f2f';
      status.textContent = 'Backend disconnected';
      status.style.color = '#d32f2f';
    }
  }
}

// Test backend connection from modal
async function testBackendConnection() {
  const testBtn = document.getElementById('testBackendConnectionBtn');
  const originalText = testBtn.textContent;
  
  testBtn.textContent = 'Testing...';
  testBtn.disabled = true;
  
  try {
    // Use proper backend configuration
    const backendUrl = window.backendConfig ? window.backendConfig.getMainBackendUrl() : 'http://localhost:3001';
    
    // Don't test if in offline mode
    if (backendUrl === 'offline') {
      window.showNotification('Backend is in offline mode. No connection test needed.', 'info');
      return;
    }
    
    const response = await fetch(`${backendUrl}/health`);
    if (response.ok) {
      window.showNotification('Backend connection test successful!', 'success');
      updateModalConnectionStatus();
    } else {
      window.showNotification('Backend connection test failed.', 'error');
    }
  } catch (error) {
    window.showNotification('Backend connection test failed. Check if server is running.', 'error');
  }
  
  testBtn.textContent = originalText;
  testBtn.disabled = false;
}

// Reconnect backend from modal
async function reconnectBackend() {
  const reconnectBtn = document.getElementById('reconnectBackendBtn');
  const originalText = reconnectBtn.textContent;
  
  reconnectBtn.textContent = 'Reconnecting...';
  reconnectBtn.disabled = true;
  
  try {
    // Use proper backend configuration
    const backendUrl = window.backendConfig ? window.backendConfig.getMainBackendUrl() : 'http://localhost:3001';
    
    // Don't reconnect if in offline mode
    if (backendUrl === 'offline') {
      window.showNotification('Backend is in offline mode. No reconnection needed.', 'info');
      return;
    }
    
    const response = await fetch(`${backendUrl}/health`);
    if (response.ok) {
      window.teamBackendConnected = true;
      window.showNotification('Backend reconnected successfully!', 'success');
      
      // Reload user profiles if logged in
      if (window.currentTeam && window.currentUser) {
        await loadUserProfile();
        await loadUserSettings();
        await loadUserFilters();
      }
    } else {
      window.teamBackendConnected = false;
      window.showNotification('Backend reconnection failed.', 'error');
    }
  } catch (error) {
    window.teamBackendConnected = false;
    window.showNotification('Backend reconnection failed. Check if server is running.', 'error');
  }
  
  updateModalConnectionStatus();
  updateTeamStatusBar();
  
  reconnectBtn.textContent = originalText;
  reconnectBtn.disabled = false;
}

// Save backend settings
function saveBackendSettings() {
  console.log('💾 Saving backend settings...');
  
  try {
    const urlInput = document.getElementById('backendUrlInput');
    const timeoutInput = document.getElementById('backendTimeoutInput');
    const autoReconnectCheckbox = document.getElementById('autoReconnectCheckbox');
    const healthChecksCheckbox = document.getElementById('enableHealthChecksCheckbox');
    
    console.log('Found inputs:', {
      url: !!urlInput,
      timeout: !!timeoutInput,
      autoReconnect: !!autoReconnectCheckbox,
      healthChecks: !!healthChecksCheckbox
    });
    
    // Update backend configuration if URL changed
    if (urlInput && window.backendConfig) {
      const newUrl = urlInput.value;
      if (newUrl !== window.backendConfig.getMainBackendUrl()) {
        console.log(`🔄 Updating backend URL from ${window.backendConfig.getMainBackendUrl()} to ${newUrl}`);
        // Update the backend configuration
        window.backendConfig.currentUrls.main = newUrl;
      }
    }
    
    if (timeoutInput) window.backendTimeout = parseInt(timeoutInput.value);
    if (autoReconnectCheckbox) window.autoReconnect = autoReconnectCheckbox.checked;
    if (healthChecksCheckbox) window.enableHealthChecks = healthChecksCheckbox.checked;
    
    // Save to localStorage
    const settings = {
      url: window.backendConfig ? window.backendConfig.getMainBackendUrl() : 'http://localhost:3001',
      timeout: window.backendTimeout,
      autoReconnect: window.autoReconnect,
      enableHealthChecks: window.enableHealthChecks
    };
    
    localStorage.setItem('backendSettings', JSON.stringify(settings));
    console.log('✅ Settings saved:', settings);
    
    showNotification('Backend settings saved successfully!', 'success');
  } catch (error) {
    console.error('❌ Error saving backend settings:', error);
    showNotification('Error saving backend settings: ' + error.message, 'error');
  }
}

// Reset backend settings to default
function resetBackendSettings() {
  console.log('🔄 Resetting backend settings to default...');
  
  try {
    // Reset backend configuration to default
    if (window.backendConfig) {
      const isProduction = window.location.hostname === 'pableitez.github.io';
      window.backendConfig.currentUrls.main = isProduction 
        ? 'https://the-bridge-9g01.onrender.com' 
        : 'http://localhost:3001';
    }
    
    window.backendTimeout = 30;
    window.autoReconnect = true;
    window.enableHealthChecks = true;
    
    // Update the UI inputs
    loadBackendSettings();
    
    console.log('✅ Settings reset to default');
    showNotification('Backend settings reset to default!', 'info');
  } catch (error) {
    console.error('❌ Error resetting backend settings:', error);
    showNotification('Error resetting backend settings: ' + error.message, 'error');
  }
}

// Load storage information
function loadStorageInformation() {
  const storageLocationInfo = document.getElementById('storageLocationInfo');
  const teamDataInfo = document.getElementById('teamDataInfo');
  
  if (storageLocationInfo) {
    if (window.currentTeam) {
      storageLocationInfo.innerHTML = `
        <strong>Team:</strong> ${window.currentTeam.name}<br>
        <strong>Storage:</strong> ${window.currentTeam.storageLocation || 'OneDrive'}<br>
        <strong>Path:</strong> ${window.currentTeam.storagePath || 'C:\\Users\\...\\OneDrive\\TheBridge\\Versions'}
      `;
    } else {
      storageLocationInfo.textContent = 'No team selected';
    }
  }
  
  if (teamDataInfo) {
    if (window.currentTeam && window.currentUser) {
      teamDataInfo.innerHTML = `
        <strong>User:</strong> ${window.currentUser.name} (${window.currentUser.role})<br>
        <strong>Email:</strong> ${window.currentUser.email}<br>
        <strong>Team Code:</strong> ${window.currentTeam.code}
      `;
    } else {
      teamDataInfo.textContent = 'No user logged in';
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Migrate existing data to ensure consistency
  migrateUserData();
  
  // Add export/import functionality to window for debugging
  window.exportUserData = exportUserData;
  window.importUserData = importUserData;
  window.exportTeamData = exportTeamData;
  window.importTeamData = importTeamData;
  
  // Initialize hybrid sync system
  initializeHybridSync();
  
  initializeTeamSystem();
});

// Hybrid sync system for teams and users
class HybridSyncManager {
  constructor() {
    this.syncQueue = [];
    this.isSyncing = false;
    this.syncInterval = null;
    this.lastSyncTime = null;
  }

  // Initialize sync manager
  init() {
    console.log('🔄 Initializing hybrid sync manager...');
    this.startPeriodicSync();
    this.processSyncQueue();
  }

  // Start periodic sync with backend
  startPeriodicSync() {
    // Sync every 5 minutes if backend is available (reduced frequency)
    this.syncInterval = setInterval(() => {
      if (window.backendService && window.backendService.isConnected()) {
        this.syncAllData();
      }
    }, 300000); // 5 minutes instead of 30 seconds
  }

  // Stop periodic sync
  stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  // Sync all data with backend
  async syncAllData() {
    if (this.isSyncing) return;
    
    this.isSyncing = true;
    console.log('🔄 Starting data sync with backend...');
    
    try {
      await this.syncTeams();
      await this.syncUsers();
      this.lastSyncTime = new Date();
      console.log('✅ Data sync completed');
    } catch (error) {
      console.warn('⚠️ Data sync failed:', error);
    } finally {
      this.isSyncing = false;
    }
  }

  // Sync teams with backend
  async syncTeams() {
    try {
      const teams = JSON.parse(localStorage.getItem('thebridge_teams') || '{}');
      
      for (const [teamId, teamData] of Object.entries(teams)) {
        await this.syncTeamToBackend(teamData);
      }
      
      console.log('✅ Teams synced with backend');
    } catch (error) {
      console.warn('⚠️ Team sync failed:', error);
    }
  }

  // Sync single team to backend
  async syncTeamToBackend(teamData) {
    if (!window.backendService || !window.backendService.isConnected()) {
      return false;
    }

    try {
      const response = await fetch(`${window.backendService.baseURL}/api/teams/save-config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData)
      });

      if (response.ok) {
        console.log(`✅ Team ${teamData.id} synced to backend`);
        return true;
      } else if (response.status === 404) {
        // Endpoint doesn't exist, skip silently
        console.log(`ℹ️ Team sync endpoint not available (404), skipping sync for ${teamData.id}`);
        return true; // Return true to avoid retry
      } else {
        console.warn(`⚠️ Failed to sync team ${teamData.id} to backend (${response.status})`);
        return false;
      }
    } catch (error) {
      console.warn(`⚠️ Error syncing team ${teamData.id} to backend:`, error);
      return false;
    }
  }

  // Sync users with backend
  async syncUsers() {
    try {
      const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
      
      for (const user of users) {
        await this.syncUserToBackend(user);
      }
      
      console.log('✅ Users synced with backend');
    } catch (error) {
      console.warn('⚠️ User sync failed:', error);
    }
  }

  // Sync single user to backend
  async syncUserToBackend(userData) {
    if (!window.backendService || !window.backendService.isConnected()) {
      return false;
    }

    try {
      // Save user profile to backend
      const userProfile = {
        id: userData.email,
        email: userData.email,
        name: userData.name || 'User',
        createdAt: userData.createdAt,
        lastLogin: userData.lastLogin
      };

      const response = await fetch(`${window.backendService.baseURL}/api/users/save-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile)
      });

      if (response.ok) {
        console.log(`✅ User ${userData.email} synced to backend`);
        return true;
      } else if (response.status === 404) {
        // Endpoint doesn't exist, skip silently
        console.log(`ℹ️ User sync endpoint not available (404), skipping sync for ${userData.email}`);
        return true; // Return true to avoid retry
      } else {
        console.warn(`⚠️ Failed to sync user ${userData.email} to backend (${response.status})`);
        return false;
      }
    } catch (error) {
      console.warn(`⚠️ Error syncing user ${userData.email} to backend:`, error);
      return false;
    }
  }

  // Load data from backend to local storage
  async loadFromBackend() {
    if (!window.backendService || !window.backendService.isConnected()) {
      console.log('📱 Backend not available, skipping load from backend');
      return;
    }

    try {
      console.log('🔄 Loading data from backend...');
      
      // Load teams from backend
      await this.loadTeamsFromBackend();
      
      // Load users from backend
      await this.loadUsersFromBackend();
      
      console.log('✅ Data loaded from backend');
    } catch (error) {
      console.warn('⚠️ Failed to load data from backend:', error);
    }
  }

  // Load teams from backend
  async loadTeamsFromBackend() {
    try {
      const response = await fetch(`${window.backendService.baseURL}/api/teams/list`);
      if (response.ok) {
        const backendTeams = await response.json();
        const localTeams = JSON.parse(localStorage.getItem('thebridge_teams') || '{}');
        
        // Merge backend teams with local teams
        for (const team of backendTeams) {
          if (!localTeams[team.id]) {
            localTeams[team.id] = team;
            console.log(`✅ Loaded team ${team.id} from backend`);
          }
        }
        
        localStorage.setItem('thebridge_teams', JSON.stringify(localTeams));
      }
    } catch (error) {
      console.warn('⚠️ Failed to load teams from backend:', error);
    }
  }

  // Load users from backend
  async loadUsersFromBackend() {
    try {
      const response = await fetch(`${window.backendService.baseURL}/api/users/list`);
      if (response.ok) {
        const backendUsers = await response.json();
        const localUsers = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
        
        // Merge backend users with local users
        for (const backendUser of backendUsers) {
          const existingUser = localUsers.find(u => u.email === backendUser.email);
          if (!existingUser) {
            localUsers.push(backendUser);
            console.log(`✅ Loaded user ${backendUser.email} from backend`);
          }
        }
        
        localStorage.setItem('thebridge_users', JSON.stringify(localUsers));
      }
    } catch (error) {
      console.warn('⚠️ Failed to load users from backend:', error);
    }
  }

  // Process sync queue
  processSyncQueue() {
    if (this.syncQueue.length > 0 && window.backendService && window.backendService.isConnected()) {
      const item = this.syncQueue.shift();
      this.syncItem(item);
    }
  }

  // Add item to sync queue
  addToSyncQueue(type, data) {
    this.syncQueue.push({ type, data, timestamp: new Date() });
    console.log(`📋 Added ${type} to sync queue`);
  }

  // Sync individual item
  async syncItem(item) {
    try {
      switch (item.type) {
        case 'team':
          await this.syncTeamToBackend(item.data);
          break;
        case 'user':
          await this.syncUserToBackend(item.data);
          break;
      }
    } catch (error) {
      console.warn(`⚠️ Failed to sync ${item.type}:`, error);
    }
  }

  // Get sync status
  getSyncStatus() {
    return {
      isConnected: window.backendService ? window.backendService.isConnected() : false,
      lastSync: this.lastSyncTime,
      queueLength: this.syncQueue.length,
      isSyncing: this.isSyncing
    };
  }
}

// Initialize hybrid sync system
function initializeHybridSync() {
  // Create global sync manager instance
  window.hybridSyncManager = new HybridSyncManager();
  
  // Initialize after a short delay to ensure backend service is ready
  setTimeout(() => {
    window.hybridSyncManager.init();
    
    // Load data from backend if available
    window.hybridSyncManager.loadFromBackend();
    
    // Start sync status indicator
    startSyncStatusIndicator();
    
    // Setup automatic backup system
    setupAutomaticBackup();
  }, 1000);
  
  // Add sync functions to window for debugging
  window.syncAllData = () => window.hybridSyncManager.syncAllData();
  window.getSyncStatus = () => window.hybridSyncManager.getSyncStatus();
  window.loadFromBackend = () => window.hybridSyncManager.loadFromBackend();
}

// Setup automatic backup system
function setupAutomaticBackup() {
  console.log('💾 Setting up automatic backup system...');
  
  // Create backup every 5 minutes
  const backupInterval = setInterval(() => {
    console.log('⏰ Creating scheduled backup...');
    createAutomaticBackup();
  }, 300000); // 5 minutes
  
  // Create initial backup
  console.log('🚀 Creating initial backup...');
  const initialBackup = createAutomaticBackup();
  console.log('✅ Initial backup result:', initialBackup);
  
  // Add backup functions to window
  window.createBackup = createAutomaticBackup;
  window.restoreFromBackup = restoreFromBackup;
  window.restoreUserFromBackup = restoreUserFromBackup;
  window.listBackups = listBackups;
  
  console.log('✅ Automatic backup system initialized');
  console.log('📋 Available functions: createBackup, restoreFromBackup, restoreUserFromBackup, listBackups');
}

// Create automatic backup
function createAutomaticBackup() {
  try {
    const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
    const teams = JSON.parse(localStorage.getItem('thebridge_teams') || '{}');
    
    const backup = {
      timestamp: new Date().toISOString(),
      users: users,
      teams: teams,
      version: '1.0'
    };
    
    // Store in localStorage with timestamp
    const backupKey = `thebridge_backup_${Date.now()}`;
    localStorage.setItem(backupKey, JSON.stringify(backup));
    
    // Keep only last 10 backups
    cleanupOldBackups();
    
    console.log('✅ Automatic backup created:', backupKey);
    return backupKey;
  } catch (error) {
    console.error('❌ Error creating backup:', error);
    return null;
  }
}

// Cleanup old backups (keep only last 10)
function cleanupOldBackups() {
  try {
    const backupKeys = [];
    
    // Find all backup keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('thebridge_backup_')) {
        backupKeys.push(key);
      }
    }
    
    // Sort by timestamp (newest first)
    backupKeys.sort((a, b) => {
      const timestampA = parseInt(a.replace('thebridge_backup_', ''));
      const timestampB = parseInt(b.replace('thebridge_backup_', ''));
      return timestampB - timestampA;
    });
    
    // Remove old backups (keep only last 10)
    if (backupKeys.length > 10) {
      const toRemove = backupKeys.slice(10);
      toRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log('🗑️ Removed old backup:', key);
      });
    }
  } catch (error) {
    console.error('❌ Error cleaning up backups:', error);
  }
}

// Restore from backup
function restoreFromBackup(backupKey) {
  try {
    const backupData = localStorage.getItem(backupKey);
    if (!backupData) {
      console.error('❌ Backup not found:', backupKey);
      return false;
    }
    
    const backup = JSON.parse(backupData);
    
    // Restore users
    if (backup.users) {
      localStorage.setItem('thebridge_users', JSON.stringify(backup.users));
      
      // Also restore individual user keys
      backup.users.forEach(user => {
        if (user.email) {
          localStorage.setItem(getUserKey(user.email), JSON.stringify(user));
        }
      });
    }
    
    // Restore teams
    if (backup.teams) {
      localStorage.setItem('thebridge_teams', JSON.stringify(backup.teams));
    }
    
    console.log('✅ Restored from backup:', backupKey);
    console.log('📊 Restored data:', {
      users: backup.users ? backup.users.length : 0,
      teams: backup.teams ? Object.keys(backup.teams).length : 0
    });
    
    // Don't reload automatically - let the user decide
    console.log('🔄 Data restored. You may need to refresh the page manually if needed.');
    
    return true;
  } catch (error) {
    console.error('❌ Error restoring from backup:', error);
    return false;
  }
}

// List available backups
function listBackups() {
  try {
    const backups = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('thebridge_backup_')) {
        const backupData = localStorage.getItem(key);
        if (backupData) {
          const backup = JSON.parse(backupData);
          backups.push({
            key: key,
            timestamp: backup.timestamp,
            users: backup.users ? backup.users.length : 0,
            teams: backup.teams ? Object.keys(backup.teams).length : 0
          });
        }
      }
    }
    
    // Sort by timestamp (newest first)
    backups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    console.log('📋 Available backups:', backups);
    return backups;
  } catch (error) {
    console.error('❌ Error listing backups:', error);
    return [];
  }
}

// Start sync status indicator
function startSyncStatusIndicator() {
  // Create sync status indicator (hidden by default)
  const syncIndicator = document.createElement('div');
  syncIndicator.id = 'sync-status-indicator';
  syncIndicator.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 12px;
    z-index: 10000;
    display: none;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(syncIndicator);
  
  // Update sync status every 5 seconds (but keep hidden)
  setInterval(() => {
    updateSyncStatusIndicator(syncIndicator);
  }, 5000);
  
  // Initial update
  updateSyncStatusIndicator(syncIndicator);
}

// Update sync status indicator
function updateSyncStatusIndicator(indicator) {
  if (!window.hybridSyncManager) return;
  
  const status = window.hybridSyncManager.getSyncStatus();
  
  let icon = '📱';
  let text = 'Offline';
  let color = '#ff9800';
  
  if (status.isConnected) {
    if (status.isSyncing) {
      icon = '🔄';
      text = 'Syncing...';
      color = '#2196f3';
    } else if (status.lastSync) {
      icon = '✅';
      text = `Synced ${formatTimeAgo(status.lastSync)}`;
      color = '#4caf50';
    } else {
      icon = '🌐';
      text = 'Online';
      color = '#4caf50';
    }
  }
  
  indicator.innerHTML = `
    <span style="font-size: 14px;">${icon}</span>
    <span>${text}</span>
  `;
  indicator.style.background = `rgba(0, 0, 0, 0.8)`;
  indicator.style.borderLeft = `3px solid ${color}`;
}

// Format time ago
function formatTimeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Export user data for backup
function exportUserData() {
  try {
    const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
    const dataStr = JSON.stringify(users, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `thebridge_users_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    console.log('✅ User data exported successfully');
    return true;
  } catch (error) {
    console.error('❌ Error exporting user data:', error);
    return false;
  }
}

// Import user data from backup
function importUserData(jsonData) {
  try {
    const users = JSON.parse(jsonData);
    if (Array.isArray(users)) {
      localStorage.setItem('thebridge_users', JSON.stringify(users));
      
      // Also update individual user keys
      users.forEach(user => {
        if (user.email) {
          localStorage.setItem(getUserKey(user.email), JSON.stringify(user));
        }
      });
      
      console.log('✅ User data imported successfully');
      return true;
    } else {
      console.error('❌ Invalid user data format');
      return false;
    }
  } catch (error) {
    console.error('❌ Error importing user data:', error);
    return false;
  }
}

// Export team data for backup
function exportTeamData() {
  try {
    const teams = JSON.parse(localStorage.getItem('thebridge_teams') || '{}');
    const dataStr = JSON.stringify(teams, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `thebridge_teams_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    console.log('✅ Team data exported successfully');
    return true;
  } catch (error) {
    console.error('❌ Error exporting team data:', error);
    return false;
  }
}

// Import team data from backup
function importTeamData(jsonData) {
  try {
    const teams = JSON.parse(jsonData);
    if (typeof teams === 'object') {
      localStorage.setItem('thebridge_teams', JSON.stringify(teams));
      console.log('✅ Team data imported successfully');
      return true;
    } else {
      console.error('❌ Invalid team data format');
      return false;
    }
  } catch (error) {
    console.error('❌ Error importing team data:', error);
    return false;
  }
}

// Migrate user data to ensure consistency between storage methods
function migrateUserData() {
  try {
    console.log('🔄 Migrating user data for consistency...');
    
    const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
    const teams = JSON.parse(localStorage.getItem('thebridge_teams') || '{}');
    
    // If no data exists, log it but don't auto-restore to prevent loops
    if (users.length === 0 && Object.keys(teams).length === 0) {
      console.log('📭 No data found. Use window.restoreFromLatestBackup() manually if needed.');
    }
    
    let migrated = false;
    
    // Check for users stored with keys but not in array
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('thebridge_user_')) {
        const email = key.replace('thebridge_user_', '');
        const userData = localStorage.getItem(key);
        
        if (userData) {
          try {
            const user = JSON.parse(userData);
            const existingUser = users.find(u => u.email === email);
            
            if (!existingUser) {
              users.push(user);
              migrated = true;
              console.log('✅ Migrated user:', email);
            }
          } catch (error) {
            console.warn('⚠️ Error parsing user data for key:', key);
          }
        }
      }
    }
    
    if (migrated) {
      localStorage.setItem('thebridge_users', JSON.stringify(users));
      console.log('✅ User data migration completed');
    } else {
      console.log('ℹ️ No user data migration needed');
    }
  } catch (error) {
    console.error('❌ Error during user data migration:', error);
  }
}

// Restore from latest backup
function restoreFromLatestBackup() {
  try {
    const backups = listBackups();
    
    if (backups.length > 0) {
      const latestBackup = backups[0]; // First one is the most recent
      console.log('🔄 Restoring from latest backup:', latestBackup.timestamp);
      
      return restoreFromBackup(latestBackup.key);
    } else {
      console.log('📭 No backups found');
      return false;
    }
  } catch (error) {
    console.error('❌ Error restoring from latest backup:', error);
    return false;
  }
}

// Restore specific user from backup
async function restoreUserFromBackup(email, password) {
  try {
    console.log(`🔍 Looking for user ${email} in backups...`);
    
    const backups = listBackups();
    
    // Search through backups from newest to oldest
    for (const backup of backups) {
      try {
        const backupData = localStorage.getItem(backup.key);
        if (!backupData) continue;
        
        const backup = JSON.parse(backupData);
        
        if (backup.users && Array.isArray(backup.users)) {
          const user = backup.users.find(u => u.email === email);
          
          if (user && user.password === password) {
            console.log(`✅ Found user ${email} in backup:`, backup.timestamp);
            
            // Restore user to localStorage
            saveUserCredentials(email, password, user.name);
            
            // Also restore teams if user was part of any
            if (backup.teams) {
              const localTeams = JSON.parse(localStorage.getItem('thebridge_teams') || '{}');
              Object.assign(localTeams, backup.teams);
              localStorage.setItem('thebridge_teams', JSON.stringify(localTeams));
            }
            
            return true;
          }
        }
      } catch (error) {
        console.warn(`⚠️ Error checking backup ${backup.key}:`, error);
        continue;
      }
    }
    
    console.log(`❌ User ${email} not found in any backup`);
    return false;
  } catch (error) {
    console.error('❌ Error restoring user from backup:', error);
    return false;
  }
}

// Show user registration modal
function showUserRegistrationModal() {
  const modal = document.createElement('div');
  modal.id = 'userRegistrationModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: modalFadeIn 0.3s ease-out;
  `;
  
  modal.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #1a2332 0%, #2a3441 100%);
      border: 1px solid rgba(71, 178, 229, 0.4);
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 450px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(71, 178, 229, 0.1);
      position: relative;
      overflow: hidden;
      animation: modalSlideIn 0.4s ease-out;
    ">
      <!-- Background decoration -->
      <div style="
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(71, 178, 229, 0.1) 0%, transparent 70%);
        pointer-events: none;
      "></div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; position: relative;">
        <div>
          <h3 style="color: #E8F4F8; margin: 0; font-size: 1.8rem; font-weight: 600; background: linear-gradient(135deg, #E8F4F8 0%, #B0BEC5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Create Your Account</h3>
          <p style="color: #7BA7CC; margin: 0.5rem 0 0 0; font-size: 0.95rem;">Join The Bridge community</p>
        </div>
        <button id="closeUserRegModal" style="
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #B0BEC5;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.5rem;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        ">×</button>
      </div>
      
      <form id="userRegistrationForm">
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.95rem;">Full Name</label>
          <input type="text" id="userNameInput" placeholder="Enter your full name" required style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid rgba(71, 178, 229, 0.3);
            background: rgba(26, 35, 50, 0.8);
            color: #E8F4F8;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          ">
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.95rem;">Email Address</label>
          <input type="email" id="userEmailInput" placeholder="Enter your email" required style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid rgba(71, 178, 229, 0.3);
            background: rgba(26, 35, 50, 0.8);
            color: #E8F4F8;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          ">
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.95rem;">Password</label>
          <input type="password" id="userPasswordInput" placeholder="Create a password" required style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid rgba(71, 178, 229, 0.3);
            background: rgba(26, 35, 50, 0.8);
            color: #E8F4F8;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          ">
          <div style="font-size: 0.85rem; color: #7BA7CC; margin-top: 0.5rem;">Password must be at least 8 characters long</div>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.95rem;">Confirm Password</label>
          <input type="password" id="userPasswordConfirmInput" placeholder="Confirm your password" required style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid rgba(71, 178, 229, 0.3);
            background: rgba(26, 35, 50, 0.8);
            color: #E8F4F8;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          ">
        </div>
        
        <div id="userRegStatus" style="margin-bottom: 1.5rem; font-size: 0.9rem; padding: 0.75rem; border-radius: 8px; display: none;"></div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <button type="button" id="cancelUserReg" style="
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: #B0BEC5;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            font-weight: 500;
            backdrop-filter: blur(10px);
            min-width: 100px;
          ">Cancel</button>
          <button type="submit" style="
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            border: none;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            font-weight: 600;
            min-width: 140px;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          ">Create Account</button>
        </div>
      </form>
    </div>
  `;
  
  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes modalSlideIn {
      from { 
        opacity: 0;
        transform: translateY(-30px) scale(0.95);
      }
      to { 
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    #userRegistrationModal input:focus {
      border-color: #47B2E5;
      box-shadow: 0 0 0 3px rgba(71, 178, 229, 0.2);
      outline: none;
    }
    #userRegistrationModal button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(modal);
  
  // Setup event listeners
  const closeBtn = modal.querySelector('#closeUserRegModal');
  const cancelBtn = modal.querySelector('#cancelUserReg');
  const form = modal.querySelector('#userRegistrationForm');
  const inputs = modal.querySelectorAll('input');
  
  const closeModal = () => {
    modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
    setTimeout(() => modal.remove(), 300);
  };
  
  closeBtn.onclick = closeModal;
  cancelBtn.onclick = closeModal;
  
  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
  
  // Input focus effects
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = '#47B2E5';
      input.style.boxShadow = '0 0 0 3px rgba(71, 178, 229, 0.2)';
    });
    
    input.addEventListener('blur', () => {
      input.style.borderColor = 'rgba(71, 178, 229, 0.3)';
      input.style.boxShadow = 'none';
    });
  });
  
  // Handle form submission
  form.onsubmit = async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('userNameInput').value.trim();
    const email = document.getElementById('userEmailInput').value.trim();
    const password = document.getElementById('userPasswordInput').value;
    const passwordConfirm = document.getElementById('userPasswordConfirmInput').value;
    const status = document.getElementById('userRegStatus');
    
    // Validation
    if (!name || !email || !password || !passwordConfirm) {
      status.textContent = 'Please fill in all fields';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    if (!isValidEmail(email)) {
      status.textContent = 'Please enter a valid email address';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    if (password.length < 6) {
      status.textContent = 'Password must be at least 6 characters long';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    if (password !== passwordConfirm) {
      status.textContent = 'Passwords do not match';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    // Check if user already exists
    const existingUser = getUserCredentials(email);
    if (existingUser) {
      status.textContent = 'An account with this email already exists';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    try {
      // Save user credentials (this also saves to thebridge_users array)
      saveUserCredentials(email, password, name);
      
      // Create user profile for current session
      const userProfile = {
        id: generateUserId(),
        name: name,
        email: email,
        role: 'member',
        createdAt: new Date().toISOString(),
        teams: []
      };
      
      // Save user profile to backend immediately
      try {
        if (window.backendUrl) {
          // Create a default team profile for the user
          const defaultProfile = {
            name: name,
            email: email,
            role: 'member',
            preferences: {
              theme: 'dark',
              language: 'es',
              notifications: true
            },
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          };
          
          // Save to backend with a default team ID
          const defaultTeamId = 'default-team';
          const saved = await saveUserProfile(email, defaultTeamId, defaultProfile);
          
          if (saved) {
            console.log('✅ User profile saved to backend successfully');
          } else {
            console.log('⚠️ Could not save to backend, profile saved locally only');
          }
        } else {
          console.log('⚠️ Backend URL not configured, profile saved locally only');
        }
      } catch (error) {
        console.warn('⚠️ Could not save to backend:', error);
      }
      
      // Set current user
      setCurrentUserEmail(email);
      
      // Also set the current user object for immediate access
      window.currentUser = userProfile;
      localStorage.setItem('thebridge_current_user', JSON.stringify(userProfile));
      
      // Create immediate backup to protect user data
      console.log('🛡️ Creating immediate backup for new user...');
      if (window.createSimpleBackup) {
        window.createSimpleBackup();
      }
      
      // Show user buttons
      showLogoutBtn();
      
      status.textContent = 'Account created successfully!';
      status.style.color = '#10B981';
      status.style.background = 'rgba(16, 185, 129, 0.1)';
      status.style.border = '1px solid rgba(16, 185, 129, 0.3)';
      status.style.display = 'block';
      
      // Close modal and show team setup
      setTimeout(() => {
        closeModal();
        showTeamSetupAfterRegistration(userProfile);
      }, 1500);
      
    } catch (error) {
      status.textContent = 'Error creating account. Please try again.';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      console.error('Registration error:', error);
    }
  };
}

// Show user login modal
function showUserLoginModal() {
  const modal = document.createElement('div');
  modal.id = 'userLoginModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: modalFadeIn 0.3s ease-out;
  `;
  
  modal.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #1a2332 0%, #2a3441 100%);
      border: 1px solid rgba(71, 178, 229, 0.4);
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(71, 178, 229, 0.1);
      position: relative;
      overflow: hidden;
      animation: modalSlideIn 0.4s ease-out;
    ">
      <!-- Background decoration -->
      <div style="
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(71, 178, 229, 0.1) 0%, transparent 70%);
        pointer-events: none;
      "></div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; position: relative;">
        <div>
          <h3 style="color: #E8F4F8; margin: 0; font-size: 1.8rem; font-weight: 600; background: linear-gradient(135deg, #E8F4F8 0%, #B0BEC5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Welcome Back</h3>
          <p style="color: #7BA7CC; margin: 0.5rem 0 0 0; font-size: 0.95rem;">Sign in to your account</p>
        </div>
        <button id="closeUserLoginModal" style="
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #B0BEC5;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.5rem;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        ">×</button>
      </div>
      
      <form id="userLoginForm">
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.95rem;">Email Address</label>
          <input type="email" id="loginEmailInput" placeholder="Enter your email" required style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid rgba(71, 178, 229, 0.3);
            background: rgba(26, 35, 50, 0.8);
            color: #E8F4F8;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          ">
        </div>
        
        <div style="margin-bottom: 2rem;">
          <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.95rem;">Password</label>
          <input type="password" id="loginPasswordInput" placeholder="Enter your password" required style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid rgba(71, 178, 229, 0.3);
            background: rgba(26, 35, 50, 0.8);
            color: #E8F4F8;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          ">
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem; color: #E8F4F8; font-size: 0.9rem; cursor: pointer;">
            <input type="checkbox" id="keepLoggedInCheckbox" style="
              width: 18px;
              height: 18px;
              accent-color: #47B2E5;
              cursor: pointer;
            ">
            <span>Keep me logged in</span>
          </label>
        </div>
        
        <div style="margin-bottom: 1.5rem; text-align: center;">
          <button type="button" id="forgotPasswordBtn" style="
            background: none;
            border: none;
            color: #47B2E5;
            font-size: 0.9rem;
            cursor: pointer;
            text-decoration: underline;
            transition: all 0.2s ease;
          ">Forgot your password?</button>
        </div>
        
        <div id="userLoginStatus" style="margin-bottom: 1.5rem; font-size: 0.9rem; padding: 0.75rem; border-radius: 8px; display: none;"></div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <button type="button" id="cancelUserLogin" style="
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: #B0BEC5;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            font-weight: 500;
            backdrop-filter: blur(10px);
            min-width: 100px;
          ">Cancel</button>
          <button type="submit" style="
            background: linear-gradient(135deg, #47B2E5 0%, #1976d2 100%);
            border: none;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            font-weight: 600;
            min-width: 120px;
            box-shadow: 0 4px 15px rgba(71, 178, 229, 0.3);
          ">Sign In</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Setup event listeners
  const closeBtn = modal.querySelector('#closeUserLoginModal');
  const cancelBtn = modal.querySelector('#cancelUserLogin');
  const form = modal.querySelector('#userLoginForm');
  const inputs = modal.querySelectorAll('input');
  
  const closeModal = () => {
    modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
    setTimeout(() => modal.remove(), 300);
  };
  
  closeBtn.onclick = closeModal;
  cancelBtn.onclick = closeModal;
  
  // Forgot Password button
  const forgotPasswordBtn = modal.querySelector('#forgotPasswordBtn');
  forgotPasswordBtn.onclick = () => {
    closeModal();
    showForgotPasswordModal();
  };
  
  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
  
  // Input focus effects
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = '#47B2E5';
      input.style.boxShadow = '0 0 0 3px rgba(71, 178, 229, 0.2)';
    });
    
    input.addEventListener('blur', () => {
      input.style.borderColor = 'rgba(71, 178, 229, 0.3)';
      input.style.boxShadow = 'none';
    });
  });
  
  // Handle form submission
  form.onsubmit = async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmailInput').value.trim();
    const password = document.getElementById('loginPasswordInput').value;
    const keepLoggedIn = document.getElementById('keepLoggedInCheckbox').checked;
    const status = document.getElementById('userLoginStatus');
    
    // Validation
    if (!email || !password) {
      status.textContent = 'Please fill in all fields';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    if (!isValidEmail(email)) {
      status.textContent = 'Please enter a valid email address';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    try {
      // Check credentials
      let savedCredentials = getUserCredentials(email);
      
      // If not found, try to restore from backup
      if (!savedCredentials || savedCredentials.password !== password) {
        console.log('🔍 Usuario no encontrado, intentando restaurar desde backup...');
        if (window.restoreUserSimple) {
          const restored = window.restoreUserSimple(email, password);
          if (restored) {
            savedCredentials = getUserCredentials(email);
            console.log('✅ Usuario restaurado desde backup');
          }
        }
      }
      
      if (!savedCredentials || savedCredentials.password !== password) {
        status.textContent = 'Invalid email or password';
        status.style.color = '#EF4444';
        status.style.background = 'rgba(239, 68, 68, 0.1)';
        status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        status.style.display = 'block';
        return;
      }
      
      // Get user profile from localStorage first
      const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
      let userProfile = users.find(user => user.email === email);
      
      // If not found locally, try to load from backend
      if (!userProfile && window.backendUrl) {
        try {
          console.log('🔍 Loading user profile from backend...');
          const backendProfile = await loadUserProfile(email, 'default-team');
          
          if (backendProfile) {
            userProfile = {
              id: generateUserId(),
              name: backendProfile.name,
              email: email,
              role: backendProfile.role || 'member',
              createdAt: backendProfile.createdAt || new Date().toISOString(),
              teams: []
            };
            
            // Save to localStorage for future use
            users.push(userProfile);
            localStorage.setItem('thebridge_users', JSON.stringify(users));
            console.log('✅ User profile loaded from backend and saved locally');
          }
        } catch (error) {
          console.warn('⚠️ Could not load profile from backend:', error);
        }
      }
      
      if (!userProfile) {
        status.textContent = 'User profile not found';
        status.style.color = '#EF4444';
        status.style.background = 'rgba(239, 68, 68, 0.1)';
        status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        status.style.display = 'block';
        return;
      }
      
      // Ensure user has a role
      if (!userProfile.role) {
        userProfile.role = 'member';
        // Update the user in localStorage
        const userIndex = users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
          users[userIndex] = userProfile;
          localStorage.setItem('thebridge_users', JSON.stringify(users));
        }
      }
      
      // Set current user
      setCurrentUserEmail(email);
      
      // Also set the current user object for immediate access
      window.currentUser = userProfile;
      localStorage.setItem('thebridge_current_user', JSON.stringify(userProfile));
      
      // Save persistent session if "Keep me logged in" is checked
      if (keepLoggedIn) {
        savePersistentSession(email, userProfile);
        console.log('✅ Persistent session saved for:', email);
      }
      
      // Show user buttons
      showLogoutBtn();
      
      status.textContent = 'Sign in successful!';
      status.style.color = '#10B981';
      status.style.background = 'rgba(16, 185, 129, 0.1)';
      status.style.border = '1px solid rgba(16, 185, 129, 0.3)';
      status.style.display = 'block';
      
      // Close modal and show team selection
      setTimeout(() => {
        closeModal();
        showTeamSelectionAfterUserLogin(userProfile);
      }, 1500);
      
    } catch (error) {
      status.textContent = 'Error signing in. Please try again.';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      console.error('Login error:', error);
    }
  };
}

// Show team setup after user registration
function showTeamSetupAfterRegistration(userProfile) {
  const modal = document.createElement('div');
  modal.id = 'teamSetupModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: modalFadeIn 0.3s ease-out;
  `;
  
  modal.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #1a2332 0%, #2a3441 100%);
      border: 1px solid rgba(71, 178, 229, 0.4);
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(71, 178, 229, 0.1);
      position: relative;
      overflow: hidden;
      animation: modalSlideIn 0.4s ease-out;
    ">
      <!-- Background decoration -->
      <div style="
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(71, 178, 229, 0.1) 0%, transparent 70%);
        pointer-events: none;
      "></div>
      
      <div style="text-align: center; margin-bottom: 2.5rem; position: relative;">

        <h3 style="color: #E8F4F8; margin: 0 0 1rem 0; font-size: 1.8rem; font-weight: 600; background: linear-gradient(135deg, #E8F4F8 0%, #B0BEC5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Welcome, ${userProfile.name}!</h3>
        <p style="color: #7BA7CC; margin: 0; font-size: 1.1rem;">Now let's set up your team workspace</p>
      </div>
      
      <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
        <button id="createTeamBtn" style="
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          border: none;
          color: white;
          padding: 1.2rem 1.8rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-weight: 600;
          min-width: 180px;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        ">
          Create New Team
        </button>
        
        <button id="joinTeamBtn" style="
          background: linear-gradient(135deg, #47B2E5 0%, #1976d2 100%);
          border: none;
          color: white;
          padding: 1.2rem 1.8rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-weight: 600;
          min-width: 180px;
          box-shadow: 0 4px 15px rgba(71, 178, 229, 0.3);
        ">
          Join Existing Team
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Setup event listeners
  const createTeamBtn = modal.querySelector('#createTeamBtn');
  const joinTeamBtn = modal.querySelector('#joinTeamBtn');
  
  const closeModal = () => {
    modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
    setTimeout(() => modal.remove(), 300);
  };
  
  createTeamBtn.onclick = () => {
    closeModal();
    showTeamProfileModal();
  };
  
  joinTeamBtn.onclick = () => {
    closeModal();
    showTeamLoginModal();
  };
  
  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
  
  // Add hover effects
  [createTeamBtn, joinTeamBtn].forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-3px)';
      btn.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0)';
      btn.style.boxShadow = btn === createTeamBtn 
        ? '0 4px 15px rgba(16, 185, 129, 0.3)'
        : '0 4px 15px rgba(71, 178, 229, 0.3)';
    });
  });
}

// Show login instructions modal
function showLoginInstructionsModal(serviceName, onContinue) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;
  
  modal.innerHTML = `
    <div style="
      background: #1a2332;
      border: 1px solid rgba(71, 178, 229, 0.3);
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      text-align: center;
    ">
      <div style="margin-bottom: 2rem;">
        <h3 style="color: #E8F4F8; margin: 0 0 1rem 0; font-size: 1.8rem; font-weight: 600;">
          Login to ${serviceName}
        </h3>
        <p style="color: #7BA7CC; margin: 0; font-size: 1rem; line-height: 1.6;">
          You will be redirected to ${serviceName} to complete your login. 
          Please follow these steps:
        </p>
      </div>
      
      <div style="
        background: rgba(71, 178, 229, 0.1);
        border: 1px solid rgba(71, 178, 229, 0.3);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        text-align: left;
      ">
        <div style="color: #47B2E5; font-weight: 600; margin-bottom: 1rem;">Steps:</div>
        <ol style="color: #E8F4F8; margin: 0; padding-left: 1.5rem; line-height: 1.8;">
          <li>Complete your login in the ${serviceName} popup</li>
          <li>Wait for the login to be successful</li>
          <li>Close the popup window</li>
          <li>Confirm your successful login</li>
        </ol>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button id="cancelLoginBtn" style="
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #E8F4F8;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        ">Cancel</button>
        <button id="continueLoginBtn" style="
          background: linear-gradient(135deg, #47B2E5 0%, #1976d2 100%);
          border: none;
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
        ">Continue to ${serviceName}</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Setup event listeners
  const cancelBtn = modal.querySelector('#cancelLoginBtn');
  const continueBtn = modal.querySelector('#continueLoginBtn');
  
  const closeModal = () => {
    modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
    setTimeout(() => modal.remove(), 300);
  };
  
  cancelBtn.onclick = closeModal;
  continueBtn.onclick = () => {
    closeModal();
    onContinue();
  };
  
  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
}

// Show login confirmation modal
function showLoginConfirmationModal(serviceName, onSuccess, onFailure) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;
  
  modal.innerHTML = `
    <div style="
      background: #1a2332;
      border: 1px solid rgba(71, 178, 229, 0.3);
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      text-align: center;
    ">
      <div style="margin-bottom: 2rem;">
        <h3 style="color: #E8F4F8; margin: 0 0 1rem 0; font-size: 1.8rem; font-weight: 600;">
          Login Confirmation
        </h3>
        <p style="color: #7BA7CC; margin: 0; font-size: 1rem; line-height: 1.6;">
          Did you successfully complete your ${serviceName} login?
        </p>
      </div>
      
      <div style="
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: 12px;
        padding: 1rem;
        margin-bottom: 2rem;
      ">
        <div style="color: #10B981; font-size: 0.9rem;">
          <strong>✅ Success:</strong> You can now access your team workspace and sync your data.
        </div>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button id="loginFailedBtn" style="
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #E8F4F8;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        ">Login Failed</button>
        <button id="loginSuccessBtn" style="
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          border: none;
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
        ">Login Successful</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Setup event listeners
  const failedBtn = modal.querySelector('#loginFailedBtn');
  const successBtn = modal.querySelector('#loginSuccessBtn');
  
  const closeModal = () => {
    modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
    setTimeout(() => modal.remove(), 300);
  };
  
  failedBtn.onclick = () => {
    closeModal();
    onFailure();
  };
  
  successBtn.onclick = () => {
    closeModal();
    onSuccess();
  };
  
  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeModal();
      onFailure();
    }
  };
}

// Show team selection after login (generic function)
async function showTeamSelectionAfterLogin(serviceName) {
  console.log(`🔄 Showing team selection after ${serviceName} login...`);
  
  try {
    // Hide welcome screen
    console.log('🔍 Hiding welcome screen...');
    hideWelcomeScreen();
    console.log('✅ Welcome screen hidden');
    
    // Show success notification with correct service name
    console.log('🔍 Showing success notification...');
    showUnifiedNotification(`${serviceName} login successful! Now select or create your team.`, 'success');
    console.log('✅ Success notification shown');
    
    // Set login type based on service
    const loginType = serviceName === 'OneDrive' ? LOGIN_TYPES.ONEDRIVE : LOGIN_TYPES.AZURE_AD;
    console.log('🔍 Login type set to:', loginType);
    
    // Get all teams
    console.log('🔍 Getting all teams...');
    const teams = await getAllTeams();
    console.log('✅ Teams retrieved:', teams);
  
    if (teams.length === 0) {
      // No teams exist, show team login modal with "Join New Team" tab active
      console.log('📝 No teams found, showing team login modal with join tab');
      showTeamLoginModalWithJoinTab();
    } else if (teams.length === 1) {
      // Only one team - auto-select but show confirmation
      const team = teams[0];
      console.log('✅ Auto-selecting single team:', team.name);
      
      // Auto-join single team instead of showing modal
      console.log('🎯 Single team found, auto-joining:', team.name);
      
      // Create a default user for cloud login with login type
      const currentUser = getCurrentUserEmail();
      const defaultUser = {
        email: currentUser || `${serviceName.toLowerCase()}-user@example.com`,
        name: currentUser ? currentUser.split('@')[0] : `${serviceName} User`,
        role: 'member',
        loginType: loginType
      };
      
      // Add user to team if not already a member
      const existingMember = team.members.find(m => m.email.toLowerCase() === defaultUser.email.toLowerCase());
      if (!existingMember) {
        team.members.push({
          email: defaultUser.email,
          name: defaultUser.name,
          role: defaultUser.role,
          joinedAt: new Date().toISOString()
        });
        
        // Save updated team
        await saveTeamProfile(team);
      }
      
      // Set team session
      setTeamSession(team, defaultUser);
      showUnifiedNotification(`Welcome! You're now part of ${team.name}`, 'success');
      
      // After team selection, sync all data to cloud service
      setTimeout(() => {
        if (serviceName === 'OneDrive') {
          syncAllDataToOneDrive();
        } else if (serviceName === 'Azure AD') {
          syncAllDataToOneDrive(); // Azure AD also uses OneDrive for storage
        }
      }, 1000);
    } else {
      // Multiple teams - show team selection modal
      console.log('🎯 Multiple teams found, showing team selection modal');
      showTeamLoginModal();
    }
  } catch (error) {
    console.error('❌ Error in showTeamSelectionAfterLogin:', error);
    showUnifiedNotification('Error showing team selection. Please try again.', 'error');
  }
}

// Show team selection after OneDrive login (legacy function for compatibility)
function showTeamSelectionAfterOneDriveLogin() {
  showTeamSelectionAfterLogin('OneDrive');
}

// Show team login modal with "Join New Team" tab active
async function showTeamLoginModalWithJoinTab() {
  console.log('🔄 Showing team login modal with join tab active...');
  
  try {
    const modal = document.getElementById('teamLoginModal');
    if (!modal) {
      console.error('❌ Team login modal not found');
      return;
    }
    
    // Show modal
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
    
    // Switch to "Join New Team" tab
    const joinTab = document.getElementById('teamJoinTab');
    const loginTab = document.getElementById('teamLoginTab');
    const joinPanel = document.getElementById('teamJoinPanel');
    const loginPanel = document.getElementById('teamLoginPanel');
    
    if (joinTab && loginTab && joinPanel && loginPanel) {
      // Update tab styles
      joinTab.style.background = 'linear-gradient(135deg, #47B2E5 0%, #1976d2 100%)';
      joinTab.style.color = 'white';
      joinTab.style.boxShadow = '0 2px 8px rgba(71, 178, 229, 0.3)';
      
      loginTab.style.background = 'transparent';
      loginTab.style.color = '#B0BEC5';
      loginTab.style.boxShadow = 'none';
      
      // Show join panel, hide login panel
      joinPanel.style.display = 'block';
      loginPanel.style.display = 'none';
      
      console.log('✅ Switched to "Join New Team" tab');
    }
    
    // Update modal title and description
    const modalTitle = modal.querySelector('h3');
    const modalDescription = modal.querySelector('p');
    
    if (modalTitle) {
      modalTitle.textContent = 'Welcome to The Bridge!';
    }
    if (modalDescription) {
      modalDescription.textContent = 'Set up your team workspace';
    }
    
    // Update button visibility and text
    const teamLoginBtn = document.getElementById('teamLoginBtn');
    const teamJoinBtn = document.getElementById('teamJoinBtn');
    
    if (teamLoginBtn) {
      teamLoginBtn.style.display = 'none'; // Hide "Access Team" button
    }
    
    if (teamJoinBtn) {
      teamJoinBtn.style.display = 'block'; // Show "Join New Team" button
      teamJoinBtn.textContent = 'Create New Team'; // Change text
      teamJoinBtn.onclick = () => {
        // Close this modal and show team creation modal
        modal.style.display = 'none';
        modal.classList.add('hidden');
        showTeamProfileModal();
      };
    }
    
    // Join Existing Team button removed - simplified interface
    
    console.log('✅ Team login modal with join tab shown successfully');
    
  } catch (error) {
    console.error('❌ Error showing team login modal with join tab:', error);
    // Fallback to regular team creation modal
    showTeamProfileModal();
  }
}

// Sync all application data to OneDrive
async function syncAllDataToOneDrive() {
  try {
    console.log('🔄 Syncing all data to OneDrive...');
    
    // Collect all current data
    const allData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      description: 'Complete The Bridge application data',
      
      // User and team info
      userInfo: {
        email: window.currentUser?.email || 'onedrive-user@example.com',
        name: window.currentUser?.name || 'OneDrive User',
        teamId: window.currentTeam?.id || 'default-team',
        teamName: window.currentTeam?.name || 'Default Team'
      },
      
      // Teams configuration
      teams: JSON.parse(localStorage.getItem('thebridge_teams') || '[]'),
      currentTeam: JSON.parse(localStorage.getItem('thebridge_current_team') || '{}'),
      
      // Filters and views
      filters: JSON.parse(localStorage.getItem('myFilters') || '[]'),
      quickFilters: JSON.parse(localStorage.getItem('quickFilters') || '{}'),
      tableViews: JSON.parse(localStorage.getItem('tableViews') || '{}'),
      currentTableView: localStorage.getItem('thebridge_current_table_view'),
      
      // Column configuration
      columnConfig: JSON.parse(localStorage.getItem('thebridge_column_config') || '{}'),
      visibleColumns: JSON.parse(localStorage.getItem('thebridge_visible_columns') || '[]'),
      columnOrder: JSON.parse(localStorage.getItem('thebridge_column_order') || '[]'),
      
      // Custom summaries and favorites
      customSummaries: JSON.parse(localStorage.getItem('customSummaries') || '{}'),
      favorites: JSON.parse(localStorage.getItem('thebridge_favorites') || '[]'),
      favoritos: JSON.parse(localStorage.getItem('favoritos') || '[]'),
      
      // Theme and language
      theme: localStorage.getItem('thebridge_theme') || 'dark',
      language: localStorage.getItem('thebridge_language') || 'es',
      
      // Dashboard configuration
      dashboardConfig: JSON.parse(localStorage.getItem('dashboardConfig') || '{}'),
      
      // Notifications and settings
      notifications: JSON.parse(localStorage.getItem('notifications') || '{}'),
      autoSave: window.autoSaveEnabled !== undefined ? window.autoSaveEnabled : true,
      
      // CSV data (if available)
      csvData: window.getOriginalData ? window.getOriginalData() : [],
      
      // Backend settings
      backendSettings: JSON.parse(localStorage.getItem('backendSettings') || '{}')
    };
    
    // Use unified storage system (OneDrive first, then localStorage)
    const fileName = `thebridge-complete-sync-${Date.now()}.json`;
    const result = await saveToUnifiedBackend(allData, fileName, {
      teamId: window.currentTeam?.id || 'default-team',
      userEmail: window.currentUser?.email || 'onedrive-user@example.com'
    });
    
    console.log('✅ All data synced successfully:', result);
    
    if (result.type === 'OneDrive') {
      showUnifiedNotification('All your data has been synced to OneDrive!', 'success');
    } else {
      showUnifiedNotification('All your data has been synced to local storage!', 'success');
    }
    
    // Update OneDrive config if using OneDrive
    if (result.type === 'OneDrive' && window.oneDriveConfig) {
      window.oneDriveConfig.isConnected = true;
      window.oneDriveConfig.lastSync = new Date().toISOString();
      window.oneDriveConfig.authMethod = 'unified_sync';
    }
    
    // Also save to localStorage as backup
    localStorage.setItem('onedrive_sync_data', JSON.stringify(allData));
    localStorage.setItem('onedrive_last_sync', new Date().toISOString());
    
    // Force update storage indicator
    forceUpdateStorageIndicator();
    
    return true;
    
  } catch (error) {
    console.error('❌ Error syncing data:', error);
    showUnifiedNotification('Error syncing data. Data saved locally.', 'warning');
    
    // Fallback to localStorage
    try {
      const fallbackData = {
        timestamp: new Date().toISOString(),
        filters: JSON.parse(localStorage.getItem('myFilters') || '[]'),
        quickFilters: JSON.parse(localStorage.getItem('quickFilters') || '{}'),
        tableViews: JSON.parse(localStorage.getItem('tableViews') || '{}'),
        customSummaries: JSON.parse(localStorage.getItem('customSummaries') || '{}'),
        theme: localStorage.getItem('theme') || 'dark',
        language: localStorage.getItem('language') || 'es'
      };
      
      localStorage.setItem('onedrive_sync_data', JSON.stringify(fallbackData));
      localStorage.setItem('onedrive_last_sync', new Date().toISOString());
      
      console.log('✅ Fallback data saved to localStorage');
    } catch (fallbackError) {
      console.error('❌ Even fallback save failed:', fallbackError);
    }
    
    return false;
  }
}

// Show team selection after user login (legacy function)
function showTeamSelectionAfterUserLogin(userProfile) {
  const modal = document.createElement('div');
  modal.id = 'teamSelectionModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: modalFadeIn 0.3s ease-out;
  `;
  
  // Get user's teams
  const userTeams = userProfile.teams || [];
  const allTeams = getAllTeams();
  const availableTeams = allTeams.filter(team => userTeams.includes(team.id));
  
  modal.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #1a2332 0%, #2a3441 100%);
      border: 1px solid rgba(71, 178, 229, 0.4);
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(71, 178, 229, 0.1);
      position: relative;
      overflow: hidden;
      animation: modalSlideIn 0.4s ease-out;
    ">
      <!-- Background decoration -->
      <div style="
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(71, 178, 229, 0.1) 0%, transparent 70%);
        pointer-events: none;
      "></div>
      
      <div style="text-align: center; margin-bottom: 2.5rem; position: relative;">

        <h3 style="color: #E8F4F8; margin: 0 0 1rem 0; font-size: 1.8rem; font-weight: 600; background: linear-gradient(135deg, #E8F4F8 0%, #B0BEC5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Welcome back, ${userProfile.name}!</h3>
        <p style="color: #7BA7CC; margin: 0; font-size: 1.1rem;">Select a team to continue</p>
      </div>
      
      ${availableTeams.length > 0 ? `
        <div style="margin-bottom: 2rem;">
          <h4 style="color: #E8F4F8; margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 600;">Your Teams</h4>
          <div style="display: flex; flex-direction: column; gap: 0.8rem;">
            ${availableTeams.map(team => `
              <button class="team-option" data-team-id="${team.id}" style="
                background: rgba(71, 178, 229, 0.1);
                border: 2px solid rgba(71, 178, 229, 0.3);
                color: #E8F4F8;
                padding: 1.2rem;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: left;
                backdrop-filter: blur(10px);
              ">
                <div style="font-weight: 600; margin-bottom: 0.5rem; font-size: 1.1rem;">${team.name}</div>
                <div style="font-size: 0.9rem; color: #7BA7CC;">${team.code || 'No code'}</div>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
        <button id="createNewTeamBtn" style="
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          border: none;
          color: white;
          padding: 1.2rem 1.8rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-weight: 600;
          min-width: 180px;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        ">
          Create New Team
        </button>
        

      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Setup event listeners
  const createNewTeamBtn = modal.querySelector('#createNewTeamBtn');
  const teamOptions = modal.querySelectorAll('.team-option');
  
  const closeModal = () => {
    modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
    setTimeout(() => modal.remove(), 300);
  };
  
  createNewTeamBtn.onclick = () => {
    closeModal();
    showTeamProfileModal();
  };
  

  
  // Handle team selection
  teamOptions.forEach(option => {
    option.onclick = async () => {
      const teamId = option.dataset.teamId;
      const team = await getTeamProfile(teamId);
      if (team) {
        closeModal();
        setTeamSession(team, userProfile);
      }
    };
  });
  
  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
  
  // Add hover effects
  createNewTeamBtn.addEventListener('mouseenter', () => {
    createNewTeamBtn.style.transform = 'translateY(-3px)';
    createNewTeamBtn.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
  });
  
  createNewTeamBtn.addEventListener('mouseleave', () => {
    createNewTeamBtn.style.transform = 'translateY(0)';
    createNewTeamBtn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
  });
  
  // Add hover effects for team options
  teamOptions.forEach(option => {
    option.addEventListener('mouseenter', () => {
      option.style.transform = 'translateY(-2px)';
      option.style.borderColor = 'rgba(71, 178, 229, 0.6)';
      option.style.boxShadow = '0 6px 20px rgba(71, 178, 229, 0.2)';
    });
    
    option.addEventListener('mouseleave', () => {
      option.style.transform = 'translateY(0)';
      option.style.borderColor = 'rgba(71, 178, 229, 0.3)';
      option.style.boxShadow = 'none';
    });
  });
}

// Generate user ID
function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ===== SISTEMA DE BACKUP DIRECTO Y SIMPLE =====
// Se ejecuta inmediatamente al cargar la página

console.log('🚀 Iniciando sistema de backup directo...');

// Función simple para crear backup
function createSimpleBackup() {
  try {
    const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
    const teams = JSON.parse(localStorage.getItem('thebridge_teams') || '{}');
    
    const backup = {
      timestamp: new Date().toISOString(),
      users: users,
      teams: teams
    };
    
    const backupKey = `backup_${Date.now()}`;
    localStorage.setItem(backupKey, JSON.stringify(backup));
    
    console.log('✅ Backup creado:', backupKey);
    return backupKey;
  } catch (error) {
    console.error('❌ Error creando backup:', error);
    return null;
  }
}

// Función simple para restaurar usuario
function restoreUserSimple(email, password) {
  try {
    // Buscar en todos los backups
    const backupKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('backup_')) {
        backupKeys.push(key);
      }
    }
    
    // Ordenar por timestamp (más reciente primero)
    backupKeys.sort((a, b) => {
      const timestampA = parseInt(a.replace('backup_', ''));
      const timestampB = parseInt(b.replace('backup_', ''));
      return timestampB - timestampA;
    });
    
    // Buscar usuario en cada backup
    for (const backupKey of backupKeys) {
      const backupData = localStorage.getItem(backupKey);
      if (backupData) {
        const backup = JSON.parse(backupData);
        const user = backup.users.find(u => u.email === email && u.password === password);
        if (user) {
          // Restaurar usuario
          const currentUsers = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
          const existingIndex = currentUsers.findIndex(u => u.email === email);
          if (existingIndex !== -1) {
            currentUsers[existingIndex] = user;
          } else {
            currentUsers.push(user);
          }
          localStorage.setItem('thebridge_users', JSON.stringify(currentUsers));
          
          console.log('✅ Usuario restaurado desde backup:', backupKey);
          return true;
        }
      }
    }
    
    console.log('❌ Usuario no encontrado en backups');
    return false;
  } catch (error) {
    console.error('❌ Error restaurando usuario:', error);
    return false;
  }
}

// Función simple para listar backups
function listBackupsSimple() {
  try {
    const backupKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('backup_')) {
        backupKeys.push(key);
      }
    }
    
    backupKeys.sort((a, b) => {
      const timestampA = parseInt(a.replace('backup_', ''));
      const timestampB = parseInt(b.replace('backup_', ''));
      return timestampB - timestampA;
    });
    
    return backupKeys;
  } catch (error) {
    console.error('❌ Error listando backups:', error);
    return [];
  }
}

// Añadir funciones al window para acceso directo
window.createSimpleBackup = createSimpleBackup;
window.restoreUserSimple = restoreUserSimple;
window.listBackupsSimple = listBackupsSimple;

// Crear backup inicial
console.log('🛡️ Creando backup inicial...');
createSimpleBackup();

// Crear usuario de prueba si no existe
const existingUsers = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
const pabloUser = existingUsers.find(u => u.email === 'pablo@gmail.com');

if (!pabloUser) {
  console.log('🔧 Creando usuario pablo@gmail.com automáticamente...');
  const newUser = {
    email: 'pablo@gmail.com',
    password: '-Meteor0',
    name: 'Pablo Beneitez',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };
  
  existingUsers.push(newUser);
  localStorage.setItem('thebridge_users', JSON.stringify(existingUsers));
  
  // Guardar también en credenciales individuales
  const userKey = `thebridge_user_${'pablo@gmail.com'.replace(/[^a-zA-Z0-9]/g, '_')}`;
  localStorage.setItem(userKey, JSON.stringify(newUser));
  
  console.log('✅ Usuario pablo@gmail.com creado automáticamente');
  
  // Crear backup con el usuario
  createSimpleBackup();
} else {
  console.log('✅ Usuario pablo@gmail.com ya existe');
}

// Crear backup cada 2 minutos
setInterval(() => {
  console.log('⏰ Backup automático...');
  createSimpleBackup();
}, 120000); // 2 minutos

console.log('✅ Sistema de backup directo iniciado');
console.log('📋 Funciones disponibles: createSimpleBackup, restoreUserSimple, listBackupsSimple');

// Show forgot password modal
function showForgotPasswordModal() {
  const modal = document.createElement('div');
  modal.id = 'forgotPasswordModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: modalFadeIn 0.3s ease-out;
  `;
  
  modal.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #1a2332 0%, #2a3441 100%);
      border: 1px solid rgba(71, 178, 229, 0.4);
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 450px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(71, 178, 229, 0.1);
      position: relative;
      overflow: hidden;
      animation: modalSlideIn 0.4s ease-out;
    ">
      <!-- Background decoration -->
      <div style="
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(71, 178, 229, 0.1) 0%, transparent 70%);
        pointer-events: none;
      "></div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; position: relative;">
        <div>
          <h3 style="color: #E8F4F8; margin: 0; font-size: 1.8rem; font-weight: 600; background: linear-gradient(135deg, #E8F4F8 0%, #B0BEC5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Reset Password</h3>
          <p style="color: #7BA7CC; margin: 0.5rem 0 0 0; font-size: 0.95rem;">Enter your email to receive reset instructions</p>
        </div>
        <button id="closeForgotPasswordModal" style="
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #B0BEC5;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.5rem;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        ">×</button>
      </div>
      
      <form id="forgotPasswordForm">
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.95rem;">Email Address</label>
          <input type="email" id="forgotPasswordEmailInput" placeholder="Enter your email address" required style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid rgba(71, 178, 229, 0.3);
            background: rgba(26, 35, 50, 0.8);
            color: #E8F4F8;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          ">
        </div>
        
        <div id="forgotPasswordStatus" style="margin-bottom: 1.5rem; font-size: 0.9rem; padding: 0.75rem; border-radius: 8px; display: none;"></div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <button type="button" id="cancelForgotPassword" style="
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: #B0BEC5;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            font-weight: 500;
            backdrop-filter: blur(10px);
            min-width: 100px;
          ">Cancel</button>
          <button type="submit" style="
            background: linear-gradient(135deg, #47B2E5 0%, #1976d2 100%);
            border: none;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            font-weight: 600;
            min-width: 120px;
            box-shadow: 0 4px 15px rgba(71, 178, 229, 0.3);
          ">Send Reset Link</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Setup event listeners
  const closeBtn = modal.querySelector('#closeForgotPasswordModal');
  const cancelBtn = modal.querySelector('#cancelForgotPassword');
  const form = modal.querySelector('#forgotPasswordForm');
  const emailInput = modal.querySelector('#forgotPasswordEmailInput');
  
  const closeModal = () => {
    modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
    setTimeout(() => modal.remove(), 300);
  };
  
  closeBtn.onclick = closeModal;
  cancelBtn.onclick = closeModal;
  
  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
  
  // Input focus effects
  emailInput.addEventListener('focus', () => {
    emailInput.style.borderColor = '#47B2E5';
    emailInput.style.boxShadow = '0 0 0 3px rgba(71, 178, 229, 0.2)';
  });
  
  emailInput.addEventListener('blur', () => {
    emailInput.style.borderColor = 'rgba(71, 178, 229, 0.3)';
    emailInput.style.boxShadow = 'none';
  });
  
  // Handle form submission
  form.onsubmit = async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const status = modal.querySelector('#forgotPasswordStatus');
    
    // Validation
    if (!email) {
      status.textContent = 'Please enter your email address';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    if (!isValidEmail(email)) {
      status.textContent = 'Please enter a valid email address';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    try {
      // Check if user exists
      const savedCredentials = getUserCredentials(email);
      const users = JSON.parse(localStorage.getItem('thebridge_users') || '[]');
      const userProfile = users.find(user => user.email === email);
      
      if (!savedCredentials && !userProfile) {
        status.textContent = 'No account found with this email address';
        status.style.color = '#EF4444';
        status.style.background = 'rgba(239, 68, 68, 0.1)';
        status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        status.style.display = 'block';
        return;
      }
      
      // Generate reset token
      const resetToken = generateResetToken();
      const resetExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      // Save reset token
      const resetTokens = JSON.parse(localStorage.getItem('thebridge_reset_tokens') || '{}');
      resetTokens[email] = {
        token: resetToken,
        expiry: resetExpiry.toISOString(),
        used: false
      };
      localStorage.setItem('thebridge_reset_tokens', JSON.stringify(resetTokens));
      
      // Show success message
      status.textContent = 'Password reset instructions sent to your email';
      status.style.color = '#10B981';
      status.style.background = 'rgba(16, 185, 129, 0.1)';
      status.style.border = '1px solid rgba(16, 185, 129, 0.3)';
      status.style.display = 'block';
      
      // Show reset instructions
      setTimeout(() => {
        closeModal();
        showResetInstructionsModal(email, resetToken);
      }, 2000);
      
    } catch (error) {
      console.error('Error in password reset:', error);
      status.textContent = 'An error occurred. Please try again.';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
    }
  };
}

// Generate reset token
function generateResetToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Show reset instructions modal
function showResetInstructionsModal(email, resetToken) {
  const modal = document.createElement('div');
  modal.id = 'resetInstructionsModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: modalFadeIn 0.3s ease-out;
  `;
  
  modal.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #1a2332 0%, #2a3441 100%);
      border: 1px solid rgba(71, 178, 229, 0.4);
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(71, 178, 229, 0.1);
      position: relative;
      overflow: hidden;
      animation: modalSlideIn 0.4s ease-out;
    ">
      <!-- Background decoration -->
      <div style="
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(71, 178, 229, 0.1) 0%, transparent 70%);
        pointer-events: none;
      "></div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; position: relative;">
        <div>
          <h3 style="color: #E8F4F8; margin: 0; font-size: 1.8rem; font-weight: 600; background: linear-gradient(135deg, #E8F4F8 0%, #B0BEC5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Reset Instructions</h3>
          <p style="color: #7BA7CC; margin: 0.5rem 0 0 0; font-size: 0.95rem;">Follow these steps to reset your password</p>
        </div>
        <button id="closeResetInstructionsModal" style="
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #B0BEC5;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.5rem;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        ">×</button>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <h4 style="color: #10B981; margin: 0 0 1rem 0; font-size: 1.1rem;">Reset Token</h4>
          <div style="background: rgba(26, 35, 50, 0.8); border: 1px solid rgba(71, 178, 229, 0.3); border-radius: 8px; padding: 1rem; font-family: monospace; color: #E8F4F8; font-size: 0.9rem; word-break: break-all; margin-bottom: 1rem;">
            ${resetToken}
          </div>
          <p style="color: #7BA7CC; margin: 0; font-size: 0.9rem;">Copy this token and use it to reset your password. It expires in 24 hours.</p>
        </div>
        
        <div style="background: rgba(71, 178, 229, 0.1); border: 1px solid rgba(71, 178, 229, 0.3); border-radius: 12px; padding: 1.5rem;">
          <h4 style="color: #47B2E5; margin: 0 0 1rem 0; font-size: 1.1rem;">How to Reset Your Password</h4>
          <ol style="color: #E8F4F8; margin: 0; padding-left: 1.5rem; line-height: 1.6;">
            <li>Copy the reset token above</li>
            <li>Click "Reset Password" below</li>
            <li>Enter your email and the reset token</li>
            <li>Create a new password</li>
            <li>Sign in with your new password</li>
          </ol>
        </div>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button type="button" id="cancelResetInstructions" style="
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: #B0BEC5;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
          min-width: 100px;
        ">Close</button>
        <button type="button" id="resetPasswordNowBtn" style="
          background: linear-gradient(135deg, #47B2E5 0%, #1976d2 100%);
          border: none;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 600;
          min-width: 120px;
          box-shadow: 0 4px 15px rgba(71, 178, 229, 0.3);
        ">Reset Password</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Setup event listeners
  const closeBtn = modal.querySelector('#closeResetInstructionsModal');
  const cancelBtn = modal.querySelector('#cancelResetInstructions');
  const resetBtn = modal.querySelector('#resetPasswordNowBtn');
  
  const closeModal = () => {
    modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
    setTimeout(() => modal.remove(), 300);
  };
  
  closeBtn.onclick = closeModal;
  cancelBtn.onclick = closeModal;
  
  resetBtn.onclick = () => {
    closeModal();
    showResetPasswordModal(email, resetToken);
  };
  
  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
}

// Show reset password modal
function showResetPasswordModal(email, resetToken) {
  const modal = document.createElement('div');
  modal.id = 'resetPasswordModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: modalFadeIn 0.3s ease-out;
  `;
  
  modal.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #1a2332 0%, #2a3441 100%);
      border: 1px solid rgba(71, 178, 229, 0.4);
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 450px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(71, 178, 229, 0.1);
      position: relative;
      overflow: hidden;
      animation: modalSlideIn 0.4s ease-out;
    ">
      <!-- Background decoration -->
      <div style="
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(71, 178, 229, 0.1) 0%, transparent 70%);
        pointer-events: none;
      "></div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; position: relative;">
        <div>
          <h3 style="color: #E8F4F8; margin: 0; font-size: 1.8rem; font-weight: 600; background: linear-gradient(135deg, #E8F4F8 0%, #B0BEC5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Create New Password</h3>
          <p style="color: #7BA7CC; margin: 0.5rem 0 0 0; font-size: 0.95rem;">Enter your reset token and new password</p>
        </div>
        <button id="closeResetPasswordModal" style="
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #B0BEC5;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.5rem;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        ">×</button>
      </div>
      
      <form id="resetPasswordForm">
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.95rem;">Email Address</label>
          <input type="email" id="resetPasswordEmailInput" value="${email}" readonly style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid rgba(71, 178, 229, 0.3);
            background: rgba(26, 35, 50, 0.6);
            color: #B0BEC5;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          ">
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.95rem;">Reset Token</label>
          <input type="text" id="resetPasswordTokenInput" placeholder="Enter the reset token" required style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid rgba(71, 178, 229, 0.3);
            background: rgba(26, 35, 50, 0.8);
            color: #E8F4F8;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          ">
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.95rem;">New Password</label>
          <input type="password" id="resetPasswordNewInput" placeholder="Enter new password" required style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid rgba(71, 178, 229, 0.3);
            background: rgba(26, 35, 50, 0.8);
            color: #E8F4F8;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          ">
          <div style="font-size: 0.85rem; color: #7BA7CC; margin-top: 0.5rem;">Password must be at least 6 characters, contain an uppercase letter, a lowercase letter, and a number</div>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <label style="display: block; color: #E8F4F8; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.95rem;">Confirm New Password</label>
          <input type="password" id="resetPasswordConfirmInput" placeholder="Confirm new password" required style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid rgba(71, 178, 229, 0.3);
            background: rgba(26, 35, 50, 0.8);
            color: #E8F4F8;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          ">
        </div>
        
        <div id="resetPasswordStatus" style="margin-bottom: 1.5rem; font-size: 0.9rem; padding: 0.75rem; border-radius: 8px; display: none;"></div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <button type="button" id="cancelResetPassword" style="
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: #B0BEC5;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            font-weight: 500;
            backdrop-filter: blur(10px);
            min-width: 100px;
          ">Cancel</button>
          <button type="submit" style="
            background: linear-gradient(135deg, #47B2E5 0%, #1976d2 100%);
            border: none;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            font-weight: 600;
            min-width: 120px;
            box-shadow: 0 4px 15px rgba(71, 178, 229, 0.3);
          ">Reset Password</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Setup event listeners
  const closeBtn = modal.querySelector('#closeResetPasswordModal');
  const cancelBtn = modal.querySelector('#cancelResetPassword');
  const form = modal.querySelector('#resetPasswordForm');
  const inputs = modal.querySelectorAll('input:not([readonly])');
  
  const closeModal = () => {
    modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
    setTimeout(() => modal.remove(), 300);
  };
  
  closeBtn.onclick = closeModal;
  cancelBtn.onclick = closeModal;
  
  // Close on backdrop click
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
  
  // Input focus effects
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = '#47B2E5';
      input.style.boxShadow = '0 0 0 3px rgba(71, 178, 229, 0.2)';
    });
    
    input.addEventListener('blur', () => {
      input.style.borderColor = 'rgba(71, 178, 229, 0.3)';
      input.style.boxShadow = 'none';
    });
  });
  
  // Handle form submission
  form.onsubmit = async (e) => {
    e.preventDefault();
    
    const email = modal.querySelector('#resetPasswordEmailInput').value.trim();
    const token = modal.querySelector('#resetPasswordTokenInput').value.trim();
    const newPassword = modal.querySelector('#resetPasswordNewInput').value;
    const confirmPassword = modal.querySelector('#resetPasswordConfirmInput').value;
    const status = modal.querySelector('#resetPasswordStatus');
    
    // Validation
    if (!email || !token || !newPassword || !confirmPassword) {
      status.textContent = 'Please fill in all fields';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    if (newPassword !== confirmPassword) {
      status.textContent = 'Passwords do not match';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    // Strong password validation
    if (!validatePassword(newPassword)) {
      status.textContent = 'Password must be at least 6 characters, contain an uppercase letter, a lowercase letter, and a number';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
      return;
    }
    
    try {
      // Verify reset token
      const resetTokens = JSON.parse(localStorage.getItem('thebridge_reset_tokens') || '{}');
      const userResetToken = resetTokens[email];
      
      if (!userResetToken || userResetToken.token !== token) {
        status.textContent = 'Invalid reset token';
        status.style.color = '#EF4444';
        status.style.background = 'rgba(239, 68, 68, 0.1)';
        status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        status.style.display = 'block';
        return;
      }
      
      if (userResetToken.used) {
        status.textContent = 'Reset token has already been used';
        status.style.color = '#EF4444';
        status.style.background = 'rgba(239, 68, 68, 0.1)';
        status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        status.style.display = 'block';
        return;
      }
      
      const tokenExpiry = new Date(userResetToken.expiry);
      if (tokenExpiry < new Date()) {
        status.textContent = 'Reset token has expired';
        status.style.color = '#EF4444';
        status.style.background = 'rgba(239, 68, 68, 0.1)';
        status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        status.style.display = 'block';
        return;
      }
      
      // Update password
      const savedCredentials = getUserCredentials(email);
      if (savedCredentials) {
        savedCredentials.password = newPassword;
        saveUserCredentials(email, newPassword, savedCredentials.name);
      }
      
      // Mark token as used
      userResetToken.used = true;
      resetTokens[email] = userResetToken;
      localStorage.setItem('thebridge_reset_tokens', JSON.stringify(resetTokens));
      
      // Show success message
      status.textContent = 'Password reset successfully! You can now sign in with your new password.';
      status.style.color = '#10B981';
      status.style.background = 'rgba(16, 185, 129, 0.1)';
      status.style.border = '1px solid rgba(16, 185, 129, 0.3)';
      status.style.display = 'block';
      
      // Close modal and show login
      setTimeout(() => {
        closeModal();
        showUserLoginModal();
      }, 2000);
      
    } catch (error) {
      console.error('Error resetting password:', error);
      status.textContent = 'An error occurred. Please try again.';
      status.style.color = '#EF4444';
      status.style.background = 'rgba(239, 68, 68, 0.1)';
      status.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      status.style.display = 'block';
    }
  };
}

// ===== EXPORTAR FUNCIONES AL SCOPE GLOBAL =====
// Esto asegura que las funciones estén disponibles para los scripts externos

// Exportar funciones de usuario al scope global
window.saveUserCredentials = saveUserCredentials;
window.getUserCredentials = getUserCredentials;
window.isValidEmail = isValidEmail;
window.saveUserProfile = saveUserProfile;
window.loadUserProfile = loadUserProfile;

// Exportar funciones de utilidad
window.getUserKey = getUserKey;
window.getCurrentUserEmail = getCurrentUserEmail;

console.log('✅ Funciones de usuario exportadas al scope global');
