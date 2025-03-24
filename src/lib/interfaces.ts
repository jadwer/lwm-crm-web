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
  }
  
  export interface Link {
    url?: string
    label: string
    active: boolean
  }
  