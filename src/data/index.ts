/* ================================================================
   ELVATRIXA — DATA BARREL
   File: src/data/index.ts

   Re-exports everything from every data file.
   Allows:  import { services, stats } from '@/data'
   Instead: import { services } from '@/data/services'
            import { stats }    from '@/data/stats'
================================================================ */

export * from './services'
export * from './testimonials'
export * from './stats'
export * from './techStack'
export * from './caseStudies'
export * from './processSteps'
export * from './why-items'