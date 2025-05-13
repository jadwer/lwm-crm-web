# 📦 CHANGELOG – ERP LaborWasser

## 📅 13 de mayo de 2025

---

### 🔧 Módulo: Inventario → Lotes de Producto
- ✨ Agregado formulario reutilizable para creación y edición de lotes (`ProductBatchForm.tsx`)
- ✅ Validación de fechas y campos requeridos
- 🔁 Actualización automática de tabla después de crear, editar y eliminar
- 🧠 Uso de `useProductBatches()` con `create`, `update`, `delete` centralizados
- ⚠️ Corregido bug de `422` al enviar objetos en lugar de IDs
- 🚨 Resuelto conflicto de re-render por múltiples llamadas a `getProductBatches()`

---

### 🏗️ Módulo: Inventario → Almacenes
- ✅ CRUD completo de almacenes (`page.tsx`, `WarehouseTable.tsx`, `WarehouseForm.tsx`)
- 💡 Edición inline profesional con recarga reactiva
- 🔁 Uso correcto del hook `useWarehouses.ts` con estado compartido
- 🚫 Eliminación protegida con confirmación
- 🛠️ Corregido error de `404` al usar `fetch` sin `NEXT_PUBLIC_BACKEND_URL`

---

### 📦 Módulo: Inventario → Ubicaciones de Almacén
- ✅ Implementado módulo completo de ubicaciones (`WarehouseLocationForm`, `Table`, `Hook`)
- ➕ Formulario de creación y edición unificados dentro del componente
- 🔄 Actualización automática tras operaciones de creación, edición y eliminación
- ⚠️ Solucionado loop y bloqueo por múltiples `useWarehouseLocations()`
- 🧼 Limpiado `page.tsx` para evitar doble carga de formularios
