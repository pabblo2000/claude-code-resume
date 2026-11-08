import {resume} from '@/lib/resume-data';
export const personalConfig={
 careerStartYear:2024,timezone:'Europe/Madrid',status:'Data & Digital Analyst at Ryanair',
 careerModels:[{name:'Data & Digital Analyst',subtitle:'SQL · Power BI · Databricks',description:'Analytics & business context'}],
 doctorChecks:[{label:'CV data loaded',result:'OK',severity:'success' as const}],
 usageStats:[{label:'CV sections available',percent:100,status:'ready'}],
 costItems:[{label:'Reading the CV',value:'Free'}],
 initContent:['# Pablo Resume','','Explore /about, /experience, /skills and /projects.'],
 welcomeTips:[{cmd:'/about',desc:'Profile & current role'},{cmd:'/experience',desc:'Work experience'},{cmd:'/skills',desc:'Technical skills'},{cmd:'/clear',desc:'Clear terminal'}],
 recentActivity:['AWS Certified Data Engineer – Associate'],
 skillCategories:resume.skills.map(s=>({name:s.name,skills:s.keywords||[],color:'#b3d7b5'})),
} as const;
export type CareerModel=(typeof personalConfig.careerModels)[number];
export type DoctorCheck=(typeof personalConfig.doctorChecks)[number];
export type UsageStat=(typeof personalConfig.usageStats)[number];
export type CostItem=(typeof personalConfig.costItems)[number];
