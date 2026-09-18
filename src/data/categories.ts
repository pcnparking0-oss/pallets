import { Category } from '../types';

import palletElectronicsLot from '../assets/images/sealed_pallet_lot_1788994800574.jpg';
import palletAppliancesLot from '../assets/images/pallet_appliances_lot_1788994823585.jpg';
import palletToolsLot from '../assets/images/pallet_tools_lot_1788994837160.jpg';
import palletApparelLot from '../assets/images/pallet_apparel_lot_1788994849787.jpg';
import palletTvScreensLot from '../assets/images/pallet_tv_screens_1788994861804.jpg';
import palletGamingLot from '../assets/images/pallet_gaming_lot_1788994889705.jpg';
import palletVacuumLot from '../assets/images/pallet_vacuum_lot_1788994901223.jpg';
import palletSmartHomeLot from '../assets/images/pallet_smarthome_lot_1788994914615.jpg';
import palletOutdoorLot from '../assets/images/pallet_outdoor_lot_1788994925936.jpg';
import palletWearablesLot from '../assets/images/pallet_wearables_lot_1788996773738.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'electronics-audio',
    name: 'Electronics & Audio',
    slug: 'electronics-audio',
    icon: 'Headphones',
    image: palletElectronicsLot,
    description: 'Wireless noise-cancelling headphones, high-fidelity earbuds, and portable Bluetooth speakers.',
    itemCount: 42,
    popularBrands: ['Sony', 'Bose', 'Apple', 'Marshall', 'JBL']
  },
  {
    id: 'smartphones-tablets',
    name: 'Smartphones & Tablets',
    slug: 'smartphones-tablets',
    icon: 'Smartphone',
    image: palletElectronicsLot,
    description: 'Flagship smartphones, iPads, Android tablets, and premium tech accessories at outlet rates.',
    itemCount: 38,
    popularBrands: ['Apple', 'Samsung', 'Google', 'Xiaomi']
  },
  {
    id: 'computing-gaming',
    name: 'Computing & Gaming',
    slug: 'computing-gaming',
    icon: 'Laptop',
    image: palletGamingLot,
    description: 'Laptops, gaming consoles, 4K curved monitors, mechanical keyboards, and PC hardware.',
    itemCount: 51,
    popularBrands: ['Dell', 'Lenovo', 'ASUS', 'Logitech', 'Razer']
  },
  {
    id: 'smart-home',
    name: 'Smart Home & Lighting',
    slug: 'smart-home',
    icon: 'Home',
    image: palletSmartHomeLot,
    description: 'Smart ambient lighting starter kits, smart security cams, thermostats, and mesh Wi-Fi.',
    itemCount: 29,
    popularBrands: ['Philips Hue', 'Ring', 'Google Nest', 'TP-Link']
  },
  {
    id: 'kitchen-appliances',
    name: 'Kitchen & Coffee',
    slug: 'kitchen-appliances',
    icon: 'Coffee',
    image: palletAppliancesLot,
    description: 'Bean-to-cup espresso machines, air fryers, multi-cookers, and precision blenders.',
    itemCount: 47,
    popularBrands: ['DeLonghi', 'Ninja', 'KitchenAid', 'Sage / Breville', 'Philips']
  },
  {
    id: 'floorcare-vacuums',
    name: 'Floorcare & Vacuums',
    slug: 'floorcare-vacuums',
    icon: 'Sparkles',
    image: palletVacuumLot,
    description: 'Cordless stick vacuum cleaners, robot mop vacuums, and steam cleaners.',
    itemCount: 33,
    popularBrands: ['Dyson', 'Roborock', 'Shark', 'iRobot', 'Dreame']
  },
  {
    id: 'power-tools',
    name: 'Power Tools & DIY',
    slug: 'power-tools',
    icon: 'Wrench',
    image: palletToolsLot,
    description: '18V cordless drill kits, angle grinders, circular saws, and laser measure tools.',
    itemCount: 36,
    popularBrands: ['Bosch Professional', 'Makita', 'DeWalt', 'Milwaukee', 'Kärcher']
  },
  {
    id: 'smartwatches-wearables',
    name: 'Smartwatches & Fitness',
    slug: 'smartwatches-wearables',
    icon: 'Watch',
    image: palletWearablesLot,
    description: 'GPS multisport smartwatches, fitness trackers, and optical heart rate monitors.',
    itemCount: 24,
    popularBrands: ['Garmin', 'Apple Watch', 'Samsung Galaxy', 'Fitbit']
  },
  {
    id: 'tvs-home-cinema',
    name: 'TVs & Home Cinema',
    slug: 'tvs-home-cinema',
    icon: 'Tv',
    image: palletTvScreensLot,
    description: 'OLED 4K Smart TVs, Dolby Atmos soundbars, and ultra-short throw laser projectors.',
    itemCount: 21,
    popularBrands: ['LG', 'Samsung', 'Sonos', 'TCL', 'Hisense']
  },
  {
    id: 'outdoor-garden',
    name: 'Outdoor & Garden Living',
    slug: 'outdoor-garden',
    icon: 'Sun',
    image: palletOutdoorLot,
    description: 'High-pressure washers, robotic lawn mowers, solar generators, and BBQ grills.',
    itemCount: 19,
    popularBrands: ['Kärcher', 'Gardena', 'EcoFlow', 'Weber', 'Worx']
  },
  {
    id: 'apparel-footwear',
    name: 'Apparel, Footwear & Designer Goods',
    slug: 'apparel-footwear',
    icon: 'Shirt',
    image: palletApparelLot,
    description: 'Designer apparel, European luxury footwear, leather accessories, and brand-name outerwear overstock.',
    itemCount: 38,
    popularBrands: ['Hugo Boss', 'Ralph Lauren', 'Tommy Hilfiger', 'Nike', 'Armani', 'Gucci']
  }
];
