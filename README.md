# 📦 StockFlow

link: https://stock-flow-lilac.vercel.app/

**StockFlow** es un sistema de gestión de inventarios inteligente diseñado para el control de stock mediante el método **FIFO** (First-In, First-Out) y trazabilidad por **Lotes (Batches)**. 

Este proyecto está optimizado para entornos multi-empresa, donde la seguridad y la integridad de los datos son la prioridad.

---

## 🚀 Funcionalidades Actuales

* **Dashboard de Métricas:** Resumen en tiempo real del estado del inventario, cantidad de categorías y productos activos.
* **Gestión de Productos:** Creación y edición de productos con categorías dinámicas y precios de venta globales.
* **Control por Lotes (Batches):** * Registro detallado de entradas de mercadería (Precio de compra, stock inicial, stock actual).
    * Gestión de fechas de vencimiento.
* **Características Dinámicas por Lote:** Cada entrada de stock soporta metadatos personalizados (Color, Talle, Nro de Serie, etc.) mediante campos **JSONB** de PostgreSQL.
* **Automatización de Datos:** Los registros se vinculan automáticamente a la organización del usuario autenticado mediante **Database Triggers**, eliminando errores manuales en el frontend.

---

## 🛠️ Stack Tecnológico

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router & Turbopack).
* **Base de Datos & Auth:** [Supabase](https://supabase.com/) (PostgreSQL).
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/).
* **Componentes UI:** [Shadcn/UI](https://ui.shadcn.com/) (Radix UI).
* **Iconografía:** [Lucide React](https://lucide.dev/).
* **Tablas Potentes:** [TanStack Table v8](https://tanstack.com/table/v8) con soporte para filas expandibles.

---
