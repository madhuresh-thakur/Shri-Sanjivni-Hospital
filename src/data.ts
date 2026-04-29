/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  departmentId: string;
  image: string;
  experience: string;
  education: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const DEPARTMENTS: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Expert care for your heart and vascular system, using the latest diagnostic and treatment techniques.",
    icon: "Heart",
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Specialized treatment for disorders of the nervous system, including the brain, spinal cord, and nerves.",
    icon: "Brain",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Comprehensive healthcare for infants, children, and adolescents in a kid-friendly environment.",
    icon: "Baby",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Comprehensive care for bones, joints, and muscles to help you regain mobility and strength.",
    icon: "Activity",
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    specialty: "Chief Cardiologist",
    departmentId: "cardiology",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400",
    experience: "15 years",
    education: "MD - Harvard Medical School",
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    departmentId: "neurology",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    experience: "12 years",
    education: "MD - Stanford University",
  },
  {
    id: "dr-emily-white",
    name: "Dr. Emily White",
    specialty: "Senior Pediatrician",
    departmentId: "pediatrics",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
    experience: "10 years",
    education: "MD - Johns Hopkins",
  },
  {
    id: "dr-robert-wilson",
    name: "Dr. Robert Wilson",
    specialty: "Orthopedic Surgeon",
    departmentId: "orthopedics",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    experience: "20 years",
    education: "MD - Yale School of Medicine",
  },
  {
    id: "dr-lisa-ray",
    name: "Dr. Lisa Ray",
    specialty: "Cardiovascular Specialist",
    departmentId: "cardiology",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
    experience: "8 years",
    education: "MD - Columbia University",
  },
];
