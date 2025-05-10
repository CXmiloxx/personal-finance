import {
  Home,
  Bed,
  Building2,
  Diamond,
  Gem,
  Star,
  Cpu,
  Monitor,
  Smartphone,
  ShoppingBag,
  Shirt,
  Tag,
  Utensils,
  Bus,
  Car,
  Stethoscope,
  HeartPulse,
  GraduationCap,
  BookOpen,
  Gamepad2,
  Film,
  PiggyBank,
  Wallet,
  Receipt,
  CreditCard,
  Lightbulb,
  Droplets,
  PawPrint,
  Plane,
  Globe,
} from 'lucide-react';

export const categoryIconsMap = {
  // Hogar y relacionados
  hogar: [Home, Building2, Bed],
  casa: [Home, Building2, Bed],
  habitación: [Home, Building2, Bed],

  // Lujos
  lujo: [Diamond, Gem, Star],
  lujos: [Diamond, Gem, Star],

  // Tecnología
  tecnología: [Cpu, Monitor, Smartphone],
  electronicos: [Cpu, Monitor, Smartphone],
  gadgets: [Cpu, Monitor, Smartphone],

  // Ropa y moda
  ropa: [ShoppingBag, Shirt],
  vestimenta: [ShoppingBag, Shirt],
  moda: [ShoppingBag, Shirt],

  // Comida
  comida: [Utensils],
  alimentos: [Utensils],
  restaurante: [Utensils],

  // Transporte
  transporte: [Bus, Car],
  viaje: [Plane, Globe],
  gasolina: [Car],
  uber: [Car],

  // Salud
  salud: [Stethoscope, HeartPulse],
  doctor: [Stethoscope],
  medicina: [HeartPulse],

  // Educación
  educación: [GraduationCap, BookOpen],
  estudio: [GraduationCap],
  escuela: [GraduationCap],
  libros: [BookOpen],

  // Entretenimiento
  entretenimiento: [Gamepad2, Film],
  juegos: [Gamepad2],
  cine: [Film],

  // Ahorro
  ahorro: [PiggyBank, Wallet],
  guardar: [PiggyBank],

  // Impuestos y pagos
  impuestos: [Receipt, CreditCard],
  facturas: [Receipt],
  pago: [CreditCard],

  // Servicios públicos
  servicios: [Lightbulb, Droplets],
  luz: [Lightbulb],
  agua: [Droplets],

  // Mascotas
  mascotas: [PawPrint],
  perro: [PawPrint],
  gato: [PawPrint],

  // Viajes
  viajes: [Plane, Globe],
  turismo: [Globe],
  vacaciones: [Plane],

  // Otros
  otros: [Tag],
};