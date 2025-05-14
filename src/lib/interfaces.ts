export interface Products {
    current_page: number
    data: Product[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
  }
  
  export interface Product {
    id: number
    name: string
    sku: string
    description: string
    full_description: string
    price: number
    cost: number
    iva: string
    img_path: string
    datasheet_path: string
    unit_id: Unit
    category_id: Category
    brand_id: Brand
  }

  export interface ProductsPaginated {
  data: Product[]
  meta: {
    current_page: number
    last_page: number
    total: number
    per_page: number
    from: number
    to: number
  }
}

  export interface Units {
    status: string,
    data: Unit[]
  }

  export interface Unit {
    id: number
    type: string
    code: string
    name: string
  }
  
  export interface Categories {
    status: string,
    data: Category[]
  }

  export interface Category {
    id: number
    name: string
    description: string
    slug: string
  }
  
  export interface Brands {
    status: string,
    data: Brand[]
  }
  export interface Brand {
    id: number
    name: string
    description: string
    slug: string
  }
  
  export interface Link {
    url?: string
    label: string
    active: boolean
  }
  
  // Interface Stock
export interface Stock {
  id: number
  product_id: number
  quantity: number
  warehouse_id?: number
  warehouse_location_id?: number
}

export interface ProductBatch {
  id: number
  product_id: number
  batch_number: string
  quantity: number
  entry_date: string | null
  expiration_date?: string | null
  warehouse_id: number
  warehouse_location_id: number

  // Relaciones opcionales (pueden venir con "included" en json:api)
  warehouse?: {
    id: number
    name: string
    location?: string
  }
  warehouse_location?: {
    id: number
    name: string
    type: string
  }
}
// Interface: Warehouse
export interface Warehouse {
  id: number
  name: string
  location?: string | null
  notes?: string | null
  manager_id?: number | null // puedes quitarlo si aún no se usa
  created_at?: string
  updated_at?: string
}

export interface WarehouseLocation {
  id: number
  name: string
  type?: string | null
  warehouse_id: number
  warehouse?: {
    id: number
    name: string
  }
  created_at?: string
  updated_at?: string
}

export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  rfc: string;
  created_at?: string;
  updated_at?: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  rfc: string;
  created_at?: string;
  updated_at?: string;
}
