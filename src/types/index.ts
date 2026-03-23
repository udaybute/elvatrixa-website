// src/types/index.ts
export interface Service {
 slug: string
 icon: string
 title: string
 tagline: string
 description: string
 features: string[]
 tags: string[]
}
export interface CaseStudy {
 slug: string
 title: string
 client: string
 service: string
 industry: string
 description: string
 results: { label: string; value: string }[]
 tech: string[]
 imageUrl: string
}
export interface Testimonial {
 id: number
 name: string
 role: string
 company: string
 country: string
 quote: string
 rating: number
 imageUrl?: string
}
export interface Stat {
 value: number
 suffix: string
 label: string
}
export interface ContactFormData {
 projectType: string
 budget: string
 timeline: string
 description: string
 name: string
 email: string
 company: string
 country: string
 phone: string
 gdprConsent: boolean
}
