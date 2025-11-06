# 🚀 Configuración de GitHub Pages - The Bridge

## ✅ Cambios Realizados

1. ✅ **Workflow de GitHub Actions creado** (`.github/workflows/deploy-pages.yml`)
   - Despliegue automático en cada push a `main`
   - Usa la nueva API de GitHub Pages

2. ✅ **Archivo `.nojekyll` en la raíz**
   - Evita que GitHub Pages procese el sitio con Jekyll

3. ✅ **`index.html` en la raíz del repositorio**
   - Todos los recursos (`src/`, imágenes, etc.) están disponibles

## 📋 Pasos para Activar GitHub Pages

### Opción 1: Usar GitHub Actions (RECOMENDADO - Ya configurado)

1. Ve a tu repositorio: https://github.com/Pableitez/bridge
2. **Settings** → **Pages**
3. En **Source**, selecciona:
   - **Source**: `GitHub Actions` (NO "Deploy from a branch")
4. Guarda los cambios
5. Ve a la pestaña **Actions** en tu repositorio
6. Verifica que el workflow "Deploy to GitHub Pages" se ejecute correctamente
7. Espera 2-3 minutos para que se complete el despliegue

### Opción 2: Usar Branch Deploy (Alternativa)

Si prefieres usar el método tradicional:

1. **Settings** → **Pages**
2. En **Source**, selecciona:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
3. Guarda los cambios
4. Espera 1-2 minutos

## 🔍 Verificación

Una vez configurado, tu sitio estará disponible en:
- **URL**: `https://pableitez.github.io/bridge/`

## ⚠️ Solución de Problemas

### Si los cambios no se aplican:

1. **Verifica el workflow de GitHub Actions**:
   - Ve a la pestaña **Actions** en GitHub
   - Verifica que el último workflow haya completado exitosamente
   - Si hay errores, revisa los logs

2. **Limpia la caché del navegador**:
   - `Ctrl + Shift + R` (Windows/Linux)
   - `Cmd + Shift + R` (Mac)

3. **Verifica que los archivos estén en la raíz**:
   ```bash
   git ls-files | grep -E "^index\.html$|^\.nojekyll$"
   ```
   Debe mostrar ambos archivos

4. **Fuerza un nuevo despliegue**:
   - En **Settings** → **Pages**
   - Cambia temporalmente la fuente a "None"
   - Guarda
   - Vuelve a configurar la fuente correcta
   - Guarda de nuevo

## 📝 Notas Importantes

- **Los cambios pueden tardar 1-3 minutos** en aparecer después del push
- **GitHub Actions es más confiable** que el despliegue desde branch
- **El archivo `.nojekyll` es crítico** para sitios estáticos sin Jekyll
- **Todos los recursos deben estar en la raíz** o en rutas relativas correctas

## 🎯 Estado Actual

- ✅ Workflow de GitHub Actions configurado
- ✅ `.nojekyll` en la raíz
- ✅ `index.html` en la raíz
- ✅ Todos los recursos (`src/`, imágenes) disponibles
- ⏳ **Pendiente**: Configurar GitHub Pages para usar GitHub Actions

