export type State = {
  id: number
  acronym: string
  name: string
}

export type City = {
  id: number
  name: string
}

export type Category = City

export type Donation = {
  id: string
  title: string
  email: string
  phone: string
  description: string
  images: string[]
  category: Category
}
