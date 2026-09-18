import { Product } from '../types';

import palletElectronicsLot from '../assets/images/sealed_pallet_lot_1788994800574.jpg';
import palletAppliancesLot from '../assets/images/pallet_appliances_lot_1788994823585.jpg';
import palletToolsLot from '../assets/images/pallet_tools_lot_1788994837160.jpg';
import palletApparelLot from '../assets/images/pallet_apparel_lot_1788994849787.jpg';
import palletTvScreensLot from '../assets/images/pallet_tv_screens_1788994861804.jpg';
import palletManifestSeal from '../assets/images/pallet_manifest_seal_1788994875278.jpg';
import palletGamingLot from '../assets/images/pallet_gaming_lot_1788994889705.jpg';
import palletVacuumLot from '../assets/images/pallet_vacuum_lot_1788994901223.jpg';
import palletSmartHomeLot from '../assets/images/pallet_smarthome_lot_1788994914615.jpg';
import palletOutdoorLot from '../assets/images/pallet_outdoor_lot_1788994925936.jpg';
import palletLaptopsLot from '../assets/images/pallet_laptops_lot_1788995598793.jpg';
import palletPowerLot from '../assets/images/pallet_power_lot_1788995613193.jpg';
import palletWearablesLot from '../assets/images/pallet_wearables_lot_1788996773738.jpg';
import appleWatchUltraLive from '../assets/images/apple_watch_ultra_live_1788996786720.jpg';
import appleWatchUltraMacro from '../assets/images/apple_watch_ultra_macro_1788996798976.jpg';
import garminFenix7xLive from '../assets/images/garmin_fenix_7x_live_1788996812918.jpg';
import garminFenix7xDetail from '../assets/images/garmin_fenix_7x_detail_1788996826466.jpg';
import garminMarqGen2Live from '../assets/images/garmin_marq_gen2_live_1788996839792.jpg';
import garminMarqGen2Macro from '../assets/images/garmin_marq_gen2_macro_1788996853104.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-plt-01-sony-wh1000xm5',
    palletNumber: 1,
    palletCode: 'PLT-01',
    sku: 'PLT-01-SNY-XM5',
    title: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones (Pallet Lot #01)',
    brand: 'Sony',
    categoryId: 'electronics-audio',
    categoryName: 'Electronics & Audio',
    price: 249,
    originalMSRP: 419,
    unboxedTotalWorth: 419,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 41,
    rating: 4.8,
    reviewCount: 318,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 6,
    featured: true,
    dealOfTheDay: true,
    badge: 'PALLET #01 • 41% OFF',
    images: [
      palletElectronicsLot,
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Industry-leading noise canceling with two processors and 8 microphones for unprecedented quiet. Crystal clear hands-free calling with 4 beamforming microphones and advanced audio signal processing. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €419 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €170 / 41% margin against the €249 liquidation pallet price).',
    keyFeatures: [
      'Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)',
      'Ultra-comfortable, lightweight design with soft fit leather',
      'Multipoint connection allows you to quickly switch between devices',
      'Intuitive touch control settings to pause play skip tracks and control volume'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€419 (European Retail Value)',
      'Unboxed Resale Margin': '€170 (41% Immediate Equity)',
      'Pallet Reference': 'PLT-01 / Lot 849',
      'Battery Life': '30 hours (ANC on)',
      'Charging Port': 'USB-C Fast Charge',
      'Weight': '250 grams',
      'Bluetooth Version': '5.2 with LDAC support',
      'Warranty': '24 Months European Manufacturer Warranty'
    },
    variants: [
      { id: 'v-black', name: 'Color', value: 'Midnight Black' },
      { id: 'v-silver', name: 'Color', value: 'Platinum Silver' }
    ],
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-01',
    reviews: [
      {
        id: 'r1',
        userName: 'Lars van den Berg',
        userCountry: 'Netherlands',
        rating: 5,
        date: '2026-03-02',
        title: 'Insane discount, arrived in 24 hours!',
        comment: 'Factory sealed box with original Sony seal intact. Saved €170 compared to retail stores in Amsterdam. Sound quality is astonishing.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-02-sonos-move-2',
    palletNumber: 2,
    palletCode: 'PLT-02',
    sku: 'PLT-02-SNS-MOV2',
    title: 'Sonos Move 2 Portable Smart Speaker with Spatial Audio (Pallet Lot #02)',
    brand: 'Sonos',
    categoryId: 'electronics-audio',
    categoryName: 'Electronics & Audio',
    price: 289,
    originalMSRP: 499,
    unboxedTotalWorth: 499,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 42,
    rating: 4.8,
    reviewCount: 142,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 5,
    featured: true,
    badge: 'PALLET #02 • 42% OFF',
    images: [
      palletSmartHomeLot,
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Upgraded inside and out, Sonos Move 2 delivers heart-pumping stereo sound wherever you go. IP56 weather resistance makes it durable for outdoor patios, while 24-hour battery life keeps the party going. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €499 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €210 / 42% margin against the €289 liquidation pallet price).',
    keyFeatures: [
      'Trueplay tuning dynamically adapts sound to your specific environment',
      'Dual tweeters create a spacious stereo soundstage with ultra-crisp highs',
      'Built-in handle and IP56 dust and water resistance for garden/patio use',
      'Wi-Fi and Bluetooth simultaneous connectivity with USB-C device charging'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€499 (European Retail Value)',
      'Unboxed Resale Margin': '€210 (42% Immediate Equity)',
      'Pallet Reference': 'PLT-02 / Lot 850',
      'Battery Life': '24 continuous hours',
      'Weather Resistance': 'IP56 rated',
      'Connectivity': 'Wi-Fi 6, Bluetooth 5.0, Apple AirPlay 2',
      'Weight': '3.0 kg',
      'Warranty': '24 Months European Warranty'
    },
    variants: [
      { id: 'v-sns-white', name: 'Color', value: 'Matte White' },
      { id: 'v-sns-black', name: 'Color', value: 'Shadow Black' }
    ],
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-02',
    reviews: [
      {
        id: 'r2',
        userName: 'Matteo Rossi',
        userCountry: 'Italy',
        rating: 5,
        date: '2026-02-28',
        title: 'Authentic Sonos at nearly half price',
        comment: 'Comes in original factory packaging with Dutch serial number. Paired seamlessly with my existing Sonos beam setup.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-03-apple-ipad-air-m2',
    palletNumber: 3,
    palletCode: 'PLT-03',
    sku: 'PLT-03-APL-IPDAIR',
    title: 'Apple iPad Air 11-inch M2 Chip 128GB Wi-Fi (Pallet Lot #03)',
    brand: 'Apple',
    categoryId: 'smartphones-tablets',
    categoryName: 'Smartphones & Tablets',
    price: 499,
    originalMSRP: 699,
    unboxedTotalWorth: 699,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 29,
    rating: 4.9,
    reviewCount: 420,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: true,
    badge: 'PALLET #03 • APPLE M2',
    images: [
      palletElectronicsLot,
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'The redesigned 11-inch iPad Air is supercharged by the astonishingly fast Apple M2 chip. It features a stunning Liquid Retina display, a new landscape camera perfect for FaceTime calls, and blazing-fast Wi-Fi 6E. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €699 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €200 / 29% margin against the €499 liquidation pallet price).',
    keyFeatures: [
      'Apple M2 chip with 8-core CPU and 10-core GPU',
      'Stunning 11-inch Liquid Retina display with P3 wide color and True Tone',
      'Landscape 12MP Ultra Wide front camera with Center Stage',
      'Compatible with Apple Pencil Pro and Magic Keyboard'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€699 (European Retail Value)',
      'Unboxed Resale Margin': '€200 (29% Immediate Equity)',
      'Pallet Reference': 'PLT-03 / Lot 851',
      'Processor': 'Apple M2 Silicon',
      'Storage': '128GB Flash',
      'Display': '11-inch LED-backlit Multi-Touch display with IPS',
      'Weight': '462 grams',
      'Warranty': '12 Months Official Apple Warranty'
    },
    variants: [
      { id: 'v-space-gray', name: 'Color', value: 'Space Gray' },
      { id: 'v-starlight', name: 'Color', value: 'Starlight' },
      { id: 'v-blue', name: 'Color', value: 'Sky Blue' }
    ],
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-03',
    reviews: [
      {
        id: 'r3',
        userName: 'Chloe Dubois',
        userCountry: 'France',
        rating: 5,
        date: '2026-03-01',
        title: 'Original EU retail packaging with AppleCare eligible',
        comment: 'Activated on Apple website without any issue, full manufacturer coverage showed up immediately. Extraordinary bargain.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-04-samsung-galaxy-s24-plus',
    palletNumber: 4,
    palletCode: 'PLT-04',
    sku: 'PLT-04-SSG-S24P',
    title: 'Samsung Galaxy S24+ 5G 256GB Dual-SIM with Galaxy AI (Pallet Lot #04)',
    brand: 'Samsung',
    categoryId: 'smartphones-tablets',
    categoryName: 'Smartphones & Tablets',
    price: 649,
    originalMSRP: 1149,
    unboxedTotalWorth: 1149,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 43,
    rating: 4.8,
    reviewCount: 215,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 3,
    featured: true,
    badge: 'PALLET #04 • 43% OFF',
    images: [
      palletElectronicsLot,
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Meet Galaxy S24+, the ultimate smartphone with built-in Galaxy AI. Search like never before, get real-time voice translation on phone calls, and enhance your photos to perfection with generative editing. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,149 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €500 / 43% margin against the €649 liquidation pallet price).',
    keyFeatures: [
      '6.7" QHD+ Dynamic AMOLED 2X Display with adaptive 1-120Hz refresh',
      'Armor Aluminum frame with IP68 water and dust resistance',
      'Triple Pro-Grade Camera: 50MP Wide with OIS, 10MP Telephoto 3x, 12MP Ultra-Wide',
      'Long-lasting 4900 mAh battery with 45W super-fast wired charging'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,149 (European Retail Value)',
      'Unboxed Resale Margin': '€500 (43% Immediate Equity)',
      'Pallet Reference': 'PLT-04 / Lot 852',
      'Storage / RAM': '256GB / 12GB LPDDR5X',
      'Display': '6.7-inch 3120 x 1440 QHD+ 2600 nits peak',
      'OS': 'Android 14 with One UI 6.1 (7 Years of OS Updates)',
      'Dual SIM': 'Nano-SIM + eSIM supported',
      'Warranty': '24 Months European Samsung Warranty'
    },
    variants: [
      { id: 'v-onyx-black', name: 'Color', value: 'Onyx Black' },
      { id: 'v-marble-gray', name: 'Color', value: 'Marble Gray' }
    ],
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-04',
    reviews: [
      {
        id: 'r4',
        userName: 'Klaus Richter',
        userCountry: 'Germany',
        rating: 5,
        date: '2026-02-27',
        title: 'Brand new European unlocked unit',
        comment: 'Original factory seals on the Samsung box. Unlocked for all European networks (tested with Telekom Germany). Fast delivery.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-05-nintendo-switch-oled',
    palletNumber: 5,
    palletCode: 'PLT-05',
    sku: 'PLT-05-NTD-SWOLED',
    title: 'Nintendo Switch OLED Console & Super Mario Kart 8 Bundle (Pallet Lot #05)',
    brand: 'Nintendo',
    categoryId: 'computing-gaming',
    categoryName: 'Computing & Gaming',
    price: 239,
    originalMSRP: 369,
    unboxedTotalWorth: 369,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 35,
    rating: 4.9,
    reviewCount: 340,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 7,
    featured: true,
    badge: 'PALLET #05 • BUNDLE PACK',
    images: [
      palletGamingLot,
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1612287233207-686940026e6d?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Feast your eyes on vivid colors and crisp contrast with a 7-inch OLED screen. The wide adjustable stand allows comfortable viewing in tabletop mode, while 64GB of internal storage gives ample room for games. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €369 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €130 / 35% margin against the €239 liquidation pallet price).',
    keyFeatures: [
      'Vibrant 7-inch OLED screen with deep blacks and intense colors',
      'Wide, adjustable kickstand for optimal tabletop multiplayer viewing',
      'Wired LAN port built into the TV dock for lag-free online racing',
      'Includes Mario Kart 8 Deluxe digital voucher code'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€369 (European Retail Value)',
      'Unboxed Resale Margin': '€130 (35% Immediate Equity)',
      'Pallet Reference': 'PLT-05 / Lot 853',
      'Screen': '7-inch OLED Multi-touch (1280 x 720)',
      'Storage': '64GB internal + MicroSD expansion',
      'Battery Life': 'Approx. 4.5 to 9 hours',
      'Warranty': '24 Months European Warranty'
    },
    variants: [
      { id: 'v-white-joycon', name: 'Color', value: 'White Joy-Con' },
      { id: 'v-neon-joycon', name: 'Color', value: 'Neon Red / Neon Blue' }
    ],
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-05',
    reviews: [
      {
        id: 'r5',
        userName: 'Sven Lindholm',
        userCountry: 'Sweden',
        rating: 5,
        date: '2026-02-25',
        title: 'Great bundle for my kids',
        comment: 'Box was in pristine condition with all European power cords included. Arrived in Stockholm in 3 business days.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-06-asus-rog-ally',
    palletNumber: 6,
    palletCode: 'PLT-06',
    sku: 'PLT-06-ASU-ROGZ1X',
    title: 'ASUS ROG Ally 7-inch 120Hz Gaming Handheld with AMD Ryzen Z1 Extreme (Pallet Lot #06)',
    brand: 'ASUS',
    categoryId: 'computing-gaming',
    categoryName: 'Computing & Gaming',
    price: 469,
    originalMSRP: 799,
    unboxedTotalWorth: 799,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 41,
    rating: 4.8,
    reviewCount: 189,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: false,
    badge: 'PALLET #06 • 120HZ FHD',
    images: [
      palletGamingLot,
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Play all your PC games anywhere on Windows 11 with the ASUS ROG Ally. Powered by the high-performance AMD Ryzen Z1 Extreme processor and equipped with a smooth 120Hz 1080p display with AMD FreeSync Premium. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €799 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €330 / 41% margin against the €469 liquidation pallet price).',
    keyFeatures: [
      'AMD Ryzen Z1 Extreme 8-core / 16-thread APU with RDNA 3 graphics',
      '7-inch Full HD 1080p 120Hz display with 500 nits and Gorilla Glass Victus',
      'Ergonomic lightweight 608g chassis with dual fans and anti-gravity heat pipes',
      'Supports Steam, Xbox Game Pass, Epic Games, and EA Play natively'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€799 (European Retail Value)',
      'Unboxed Resale Margin': '€330 (41% Immediate Equity)',
      'Pallet Reference': 'PLT-06 / Lot 854',
      'Processor': 'AMD Ryzen Z1 Extreme (Zen 4, 30W turbo)',
      'RAM / Storage': '16GB LPDDR5 / 512GB PCIe 4.0 NVMe SSD',
      'Operating System': 'Windows 11 Home',
      'Warranty': '24 Months European ASUS Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-06',
    reviews: [
      {
        id: 'r6',
        userName: 'Wojciech Kowalski',
        userCountry: 'Poland',
        rating: 5,
        date: '2026-03-03',
        title: 'Plays Cyberpunk and Forza flawlessly on the go',
        comment: 'Huge discount compared to Polish retail chains. Unit is brand new and runs Windows 11 without any bloatware.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-07-philips-hue-starter-kit',
    palletNumber: 7,
    palletCode: 'PLT-07',
    sku: 'PLT-07-PHL-HUE3PK',
    title: 'Philips Hue White & Color Ambiance E27 Starter Kit with Bridge (Pallet Lot #07)',
    brand: 'Philips Hue',
    categoryId: 'smart-home',
    categoryName: 'Smart Home & Lighting',
    price: 89,
    originalMSRP: 159,
    unboxedTotalWorth: 159,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 44,
    rating: 4.8,
    reviewCount: 264,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 8,
    featured: false,
    badge: 'PALLET #07 • POPULAR',
    images: [
      palletSmartHomeLot,
      'https://images.unsplash.com/photo-1550985543-f47f38aeee65?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Transform your home lighting with 16 million colors and 50,000 shades of warm-to-cool white light. Includes 3x E27 smart LED bulbs, Hue Bridge hub, and Smart Wireless Dimmer Switch. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €159 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €70 / 44% margin against the €89 liquidation pallet price).',
    keyFeatures: [
      '16 million colors and tunable white light from 2000K to 6500K',
      'Includes Hue Bridge for out-of-home control and automated schedules',
      'Works with Apple HomeKit, Amazon Alexa, and Google Assistant',
      'Smart Dimmer Switch with magnetic wall plate included in box'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€159 (European Retail Value)',
      'Unboxed Resale Margin': '€70 (44% Immediate Equity)',
      'Pallet Reference': 'PLT-07 / Lot 855',
      'Fitting Type': 'Standard E27 Edison screw base',
      'Brightness': '1100 lumens per bulb (75W equivalent)',
      'Energy Consumption': '9.5W LED per bulb',
      'Warranty': '24 Months Manufacturer Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-07',
    reviews: [
      {
        id: 'r7',
        userName: 'Emma Watson',
        userCountry: 'United Kingdom',
        rating: 5,
        date: '2026-02-18',
        title: 'Easy setup and genuine Philips quality',
        comment: 'Installed across my living room in 10 minutes. Syncs with music and movies effortlessly. Fantastic value.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-08-google-nest-bundle',
    palletNumber: 8,
    palletCode: 'PLT-08',
    sku: 'PLT-08-GGL-NSTBDL',
    title: 'Google Nest Learning Thermostat (3rd Gen) & Nest Doorbell Smart Bundle (Pallet Lot #08)',
    brand: 'Google Nest',
    categoryId: 'smart-home',
    categoryName: 'Smart Home & Lighting',
    price: 199,
    originalMSRP: 429,
    unboxedTotalWorth: 429,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 53,
    rating: 4.8,
    reviewCount: 153,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: false,
    badge: 'PALLET #08 • 53% OFF',
    images: [
      palletSmartHomeLot,
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Upgrade your home energy efficiency and front door security in one package. The Nest Learning Thermostat learns your schedule to save on heating bills, while the Nest Doorbell (Battery) alerts you to packages and visitors. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €429 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €230 / 53% margin against the €199 liquidation pallet price).',
    keyFeatures: [
      'Thermostat auto-schedules based on your living habits and checks OpenTherm boilers',
      'Wire-free HDR video doorbell with intelligent person, package, vehicle, and animal detection',
      'Control both devices from the Google Home app on iOS or Android',
      'High-resolution color display on thermostat shows time or temperature when approached'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€429 (European Retail Value)',
      'Unboxed Resale Margin': '€230 (53% Immediate Equity)',
      'Pallet Reference': 'PLT-08 / Lot 856',
      'Compatibility': 'Combi boilers, heat pumps, zoned systems',
      'Doorbell Camera': '1.3MP color sensor, 6x digital zoom, 3:4 aspect ratio',
      'Battery / Power': 'Rechargeable Li-ion battery or hardwire',
      'Warranty': '24 Months European Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-08',
    reviews: [
      {
        id: 'r8',
        userName: 'Frederik Hansen',
        userCountry: 'Denmark',
        rating: 5,
        date: '2026-02-14',
        title: 'Cut my heating bill immediately',
        comment: 'Both items are European specification with EU Heat Link module included. Superb build quality.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-09-delonghi-magnifica-s',
    palletNumber: 9,
    palletCode: 'PLT-09',
    sku: 'PLT-09-DLG-ECAM22',
    title: "De'Longhi Magnifica S Compact Bean-to-Cup Espresso Machine (Pallet Lot #09)",
    brand: "De'Longhi",
    categoryId: 'kitchen-appliances',
    categoryName: 'Kitchen & Coffee',
    price: 269,
    originalMSRP: 449,
    unboxedTotalWorth: 449,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 40,
    rating: 4.7,
    reviewCount: 512,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 8,
    featured: true,
    badge: 'PALLET #09 • BESTSELLER',
    images: [
      palletAppliancesLot,
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: "Enjoy freshly brewed Italian coffee at home with the De'Longhi Magnifica S. Built-in steel burr grinder with 13 grind settings, traditional milk frothing arm for creamy cappuccinos, and customizable aroma strength. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €449 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €180 / 40% margin against the €269 liquidation pallet price).",
    keyFeatures: [
      '13 adjustable grind settings for fresh whole beans with pre-ground bypass option',
      'Traditional manual milk frother produces rich, velvety froth for lattes & cappuccinos',
      'Removable brewing unit for effortless cleaning under running tap water',
      'Automatic descaling and rinse cycles maintain hygiene and extend machine life'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€449 (European Retail Value)',
      'Unboxed Resale Margin': '€180 (40% Immediate Equity)',
      'Pallet Reference': 'PLT-09 / Lot 857',
      'Pump Pressure': '15 Bar Italian Pump',
      'Water Tank Capacity': '1.8 Liters',
      'Bean Container': '250g capacity',
      'Dimensions': '23.8 x 43.0 x 35.1 cm',
      'Warranty': '24 Months European Manufacturer Warranty'
    },
    variants: [
      { id: 'v-silver-black', name: 'Finish', value: 'Brushed Silver & Black' }
    ],
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-09',
    reviews: [
      {
        id: 'r9',
        userName: 'Giuseppe Bellini',
        userCountry: 'Italy',
        rating: 5,
        date: '2026-02-24',
        title: 'Authentic espresso crema every morning',
        comment: 'As an Italian I was skeptical buying liquidation goods, but this is 100% factory original in unopened retail packaging.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-10-ninja-foodi-dual-zone',
    palletNumber: 10,
    palletCode: 'PLT-10',
    sku: 'PLT-10-NNJ-AF400EU',
    title: 'Ninja Foodi MAX DualZone 9.5L Air Fryer with Smart Cook System (Pallet Lot #10)',
    brand: 'Ninja',
    categoryId: 'kitchen-appliances',
    categoryName: 'Kitchen & Coffee',
    price: 159,
    originalMSRP: 269,
    unboxedTotalWorth: 269,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 41,
    rating: 4.9,
    reviewCount: 489,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 6,
    featured: true,
    badge: 'PALLET #10 • TOP RATED',
    images: [
      palletAppliancesLot,
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Cook two different foods, two different ways, and finish at the exact same time with Ninja DualZone technology. Extra-large 9.5-liter capacity feeds 8+ people, with up to 75% less fat than traditional deep frying. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €269 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €110 / 41% margin against the €159 liquidation pallet price).',
    keyFeatures: [
      '2 independent cooking zones with SYNC and MATCH cook functions',
      '6 cooking modes: Air Fry, Max Crisp, Roast, Bake, Reheat, Dehydrate',
      'Includes digital cooking probe that monitors internal meat temperature continuously',
      'Non-stick, dishwasher safe baskets and crisper plates for easy cleanup'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€269 (European Retail Value)',
      'Unboxed Resale Margin': '€110 (41% Immediate Equity)',
      'Pallet Reference': 'PLT-10 / Lot 858',
      'Total Capacity': '9.5 Liters (2 x 4.75L)',
      'Power Wattage': '2470 Watts',
      'Temperature Range': '40°C to 240°C',
      'Warranty': '24 Months European Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-10',
    reviews: [
      {
        id: 'r10',
        userName: 'Sophie Martin',
        userCountry: 'Belgium',
        rating: 5,
        date: '2026-03-01',
        title: 'Replaced my conventional oven completely',
        comment: 'Roasts chicken in zone 1 and chips in zone 2, finishes simultaneously. Outstanding build quality and rapid delivery.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-11-designer-apparel-suits',
    palletNumber: 11,
    palletCode: 'PLT-11',
    sku: 'PLT-11-APP-HGB894',
    title: "Hugo Boss & Ralph Lauren Designer Apparel & Tailored Suits Lot (Pallet Lot #11)",
    brand: 'Hugo Boss',
    categoryId: 'apparel-footwear',
    categoryName: 'Apparel, Footwear & Designer Goods',
    price: 389,
    originalMSRP: 995,
    unboxedTotalWorth: 995,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 61,
    rating: 4.9,
    reviewCount: 218,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: true,
    badge: 'PALLET #11 • DESIGNER APPAREL',
    images: [
      palletApparelLot,
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Certified Grade-A overstock assortment from premier European department store clearances. Includes Hugo Boss slim-fit tailored virgin wool jackets, Ralph Lauren Oxford cotton shirts, and Tommy Hilfiger knitwear with all security seals, tags, and original hangers. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €995 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €606 / 61% margin against the €389 liquidation pallet price).',
    keyFeatures: [
      '100% authentic designer apparel with factory retail hangtags and EAN barcodes intact',
      'Master lot includes virgin wool blazer suits, pique polos, and premium knit sweaters',
      'Manufactured in Europe with certified origin documentation and Grade-A clearance certificates',
      'Includes branded garment bags and protective anti-dust retail packaging'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€995 (European Retail Value)',
      'Unboxed Resale Margin': '€606 (61% Immediate Equity)',
      'Pallet Reference': 'PLT-11 / Lot 859',
      'Category': 'Apparel, Footwear & Designer Goods',
      'Origin': 'Trade Port Venlo Wholesale Hub (NL)',
      'Condition': 'Grade-A Brand New Overstock (Factory Tagged)',
      'Assortment': 'Tailored Suits, Oxford Shirts, Premium Knitwear',
      'Warranty': 'Authenticity Guaranteed • 30-Day Inspection Period'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-11',
    reviews: [
      {
        id: 'r11',
        userName: 'Maximilian Krause',
        userCountry: 'Germany',
        rating: 5,
        date: '2026-02-26',
        title: 'Impeccable genuine Hugo Boss suits',
        comment: 'All garments arrived with original boutique tags and factory bags. Outstanding fabric quality and incredible savings over retail.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-12-designer-footwear-sneakers',
    palletNumber: 12,
    palletCode: 'PLT-12',
    sku: 'PLT-12-FTW-NKE821',
    title: 'Nike, Adidas & Italian Handcrafted Leather Footwear Master Lot (Pallet Lot #12)',
    brand: 'Nike',
    categoryId: 'apparel-footwear',
    categoryName: 'Apparel, Footwear & Designer Goods',
    price: 349,
    originalMSRP: 849,
    unboxedTotalWorth: 849,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 59,
    rating: 4.9,
    reviewCount: 294,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 5,
    featured: true,
    badge: 'PALLET #12 • FOOTWEAR CLEARANCE',
    images: [
      palletApparelLot,
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'High-value liquidation footwear collection sourced from German and Dutch retail chains. Features authentic Nike Air Max editions, Adidas Ultraboost running shoes, and handcrafted Tuscan Italian calfskin leather dress shoes in original individual retail shoe boxes. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €849 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €500 / 59% margin against the €349 liquidation pallet price).',
    keyFeatures: [
      'Complete brand new footwear in pristine original manufacturer shoe boxes with barcodes',
      'Includes top-tier lifestyle sneakers, athletic running shoes, and Italian formal shoes',
      'Grade-A certified liquidation with zero customer returns or defects',
      'Each pair certified authentic with European distribution proof'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€849 (European Retail Value)',
      'Unboxed Resale Margin': '€500 (59% Immediate Equity)',
      'Pallet Reference': 'PLT-12 / Lot 860',
      'Category': 'Apparel, Footwear & Designer Goods',
      'Origin': 'Trade Port Venlo Central Logistics Hub (NL)',
      'Condition': 'Brand New (Original Factory Boxes)',
      'Brands Included': 'Nike, Adidas Originals, Italian Tuscan Leather',
      'Warranty': 'Authenticity Guaranteed • 30-Day Money-Back Guarantee'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-12',
    reviews: [
      {
        id: 'r12',
        userName: 'Matteo Rossi',
        userCountry: 'Italy',
        rating: 5,
        date: '2026-02-20',
        title: 'Authentic Nike and Italian leather shoes',
        comment: 'Boxed pairs in pristine condition. Barcodes scan directly in retailer databases. Arrived via DPD in 2 days.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-13-dyson-v15-detect',
    palletNumber: 13,
    palletCode: 'PLT-13',
    sku: 'PLT-13-DYS-V15TC',
    title: 'Dyson V15 Detect Total Clean Cordless Vacuum with Fluffy Optic Head (Pallet Lot #13)',
    brand: 'Dyson',
    categoryId: 'floorcare-vacuums',
    categoryName: 'Floorcare & Vacuums',
    price: 459,
    originalMSRP: 799,
    unboxedTotalWorth: 799,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 43,
    rating: 4.9,
    reviewCount: 388,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 5,
    featured: true,
    badge: 'PALLET #13 • 43% OFF',
    images: [
      palletVacuumLot,
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Dyson most powerful intelligent cordless vacuum. Features Fluffy Optic cleaner head that reveals 2x more invisible dust, and an acoustic piezo sensor that counts and measures the size of dust particles. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €799 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €340 / 43% margin against the €459 liquidation pallet price).',
    keyFeatures: [
      '240 Air Watts of fade-free cyclone suction power',
      'Fluffy Optic cleaner head illuminates microscopic dust on hard floors',
      'Digital Motorbar cleaner head detangles wrapped hair automatically',
      'LCD screen shows real-time scientific proof of deep clean and battery run time'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€799 (European Retail Value)',
      'Unboxed Resale Margin': '€340 (43% Immediate Equity)',
      'Pallet Reference': 'PLT-13 / Lot 861',
      'Run Time': 'Up to 60 minutes with click-in battery',
      'Bin Volume': '0.76 Liters with point-and-shoot hygienic emptying',
      'Filtration': 'Whole-machine HEPA filtration traps 99.99% particles down to 0.1 microns',
      'Warranty': '24 Months European Dyson Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-13',
    reviews: [
      {
        id: 'r13',
        userName: 'Marc Vermeulen',
        userCountry: 'Netherlands',
        rating: 5,
        date: '2026-03-04',
        title: 'The laser illumination is scary good',
        comment: 'You do not realize how dirty hard floors are until the green laser illuminates them. Genuine EU serial registered on Dyson site.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-14-irobot-roomba-j9',
    palletNumber: 14,
    palletCode: 'PLT-14',
    sku: 'PLT-14-IRB-J9PLUS',
    title: 'iRobot Roomba Combo j9+ Auto-Fill & Self-Emptying Robot Vacuum & Mop (Pallet Lot #14)',
    brand: 'iRobot',
    categoryId: 'floorcare-vacuums',
    categoryName: 'Floorcare & Vacuums',
    price: 549,
    originalMSRP: 1399,
    unboxedTotalWorth: 1399,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 61,
    rating: 4.7,
    reviewCount: 88,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: true,
    badge: 'PALLET #14 • SAVE €850',
    images: [
      palletVacuumLot,
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'The pinnacle of automated floorcare. Features 100% more suction power and the Clean Base Auto-Fill Dock that empties debris for up to 60 days and refills liquid for up to 30 days of hands-free cleaning. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,399 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €850 / 61% margin against the €549 liquidation pallet price).',
    keyFeatures: [
      'D.R.I. (Dry Rug Intelligence) fully retracts mop pad to the top of the robot over carpets',
      'Clean Base Auto-Fill Dock empties dirt for 60 days and refills mop tank for 30 days',
      'PrecisionVision Navigation detects pet waste, charging cables, and shoes reliably',
      'DirtDetective learns which rooms get dirtiest fastest and prioritizes cleaning order'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,399 (European Retail Value)',
      'Unboxed Resale Margin': '€850 (61% Immediate Equity)',
      'Pallet Reference': 'PLT-14 / Lot 862',
      'Docking Station': 'Auto-empty, auto-liquid refill with premium wood-accent dock',
      'Suction Power': 'Power-Lifting Suction with 4-Stage Cleaning System',
      'Smart Assistant': 'Alexa, Siri Shortcuts, and Google Home compatible',
      'Warranty': '24 Months European Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-14',
    reviews: [
      {
        id: 'r14',
        userName: 'Guillaume Leroux',
        userCountry: 'France',
        rating: 5,
        date: '2026-02-27',
        title: 'Truly hands-free floor maintenance',
        comment: 'The dock looks like high-end furniture with the wood top. Mops tiles without ever dampening my wool rugs.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-15-bosch-18v-drill-set',
    palletNumber: 15,
    palletCode: 'PLT-15',
    sku: 'PLT-15-BSH-GSB18V',
    title: 'Bosch Professional 18V Brushless Combi Drill & Impact Driver Kit in L-BOXX (Pallet Lot #15)',
    brand: 'Bosch Professional',
    categoryId: 'power-tools',
    categoryName: 'Power Tools & DIY',
    price: 199,
    originalMSRP: 379,
    unboxedTotalWorth: 379,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 47,
    rating: 4.9,
    reviewCount: 194,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 7,
    featured: false,
    badge: 'PALLET #15 • CONTRACTOR GRADE',
    images: [
      palletToolsLot,
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Heavy-duty 18V cordless combo for trade professionals. Includes brushless combi drill GSB 18V-55 with metal chuck, GDR 18V-200 impact driver, two 4.0Ah ProCORE18V high-output batteries, GAL 18V-40 quick charger, and rugged L-BOXX case. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €379 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €180 / 47% margin against the €199 liquidation pallet price).',
    keyFeatures: [
      'Brushless EC motors deliver up to 55 Nm torque and extended tool lifespan',
      'Heavy-duty 13mm metal chuck for maximum durability and drill bit grip',
      'Includes two ProCORE18V 4.0Ah compact batteries with COOLPACK 2.0 heat dissipation',
      'Heavy-duty modular stackable L-BOXX 136 case included'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€379 (European Retail Value)',
      'Unboxed Resale Margin': '€180 (47% Immediate Equity)',
      'Pallet Reference': 'PLT-15 / Lot 863',
      'Battery Platform': 'Bosch Professional 18V AMPShare compatible',
      'Impact Rate': '0 - 27,000 bpm',
      'Max Torque': '55 Nm (Drill) / 200 Nm (Impact Driver)',
      'Warranty': '36 Months Bosch Pro360 Registration Warranty'
    },
    warrantyMonths: 36,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-15',
    reviews: [
      {
        id: 'r15',
        userName: 'Janusz Dabrowski',
        userCountry: 'Poland',
        rating: 5,
        date: '2026-03-01',
        title: 'Unbeatable price for genuine Bosch blue tools',
        comment: 'Registered the serials on Bosch Pro360 app for the full 3-year warranty without problem. L-BOXX case arrived clean and undamaged.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-16-makita-18v-combo',
    palletNumber: 16,
    palletCode: 'PLT-16',
    sku: 'PLT-16-MKT-DLX600',
    title: 'Makita 18V LXT 6-Piece Heavy Duty Cordless Tool Set with 2x 5.0Ah Batteries (Pallet Lot #16)',
    brand: 'Makita',
    categoryId: 'power-tools',
    categoryName: 'Power Tools & DIY',
    price: 489,
    originalMSRP: 899,
    unboxedTotalWorth: 899,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 46,
    rating: 4.9,
    reviewCount: 84,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: true,
    badge: 'PALLET #16 • 6-TOOL LOT',
    images: [
      palletToolsLot,
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'The ultimate professional contractor outfit. Contains combi drill DHP453, impact driver DTD152, circular saw DSS611, reciprocating saw DJR186, angle grinder DGA452, LED torch, two 5.0Ah LXT batteries, DC18RC rapid charger, and heavy-duty duffle. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €899 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €410 / 46% margin against the €489 liquidation pallet price).',
    keyFeatures: [
      '6 full-size 18V cordless tools powered by Makita legendary LXT battery system',
      'Includes 2x genuine BL1850B 5.0Ah batteries with built-in 4-stage fuel gauge',
      'Rapid cooling charger charges 5.0Ah battery in only 45 minutes',
      'Reinforced ballistic nylon tool carry bag with heavy-duty brass zippers'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€899 (European Retail Value)',
      'Unboxed Resale Margin': '€410 (46% Immediate Equity)',
      'Pallet Reference': 'PLT-16 / Lot 864',
      'Battery Voltage': '18V Lithium-Ion LXT',
      'Number of Tools': '6 Cordless Professional Tools',
      'Charger': 'DC18RC Smart Air-Cooled Rapid Charger',
      'Warranty': '36 Months Makita European Warranty'
    },
    warrantyMonths: 36,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-16',
    reviews: [
      {
        id: 'r16',
        userName: 'Brendan O’Connor',
        userCountry: 'Ireland',
        rating: 5,
        date: '2026-02-22',
        title: 'Everything you need on a jobsite in one kit',
        comment: 'Circular saw cuts clean through 45mm timber without bogging down. Batteries hold charge all day long. Delivered by DPD in 48h.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-17-garmin-fenix-7x',
    palletNumber: 17,
    palletCode: 'PLT-17',
    sku: 'PLT-17-GRM-FNX7X',
    title: 'Garmin Fēnix 7X Sapphire Solar Titanium Multisport GPS Watch (Pallet Lot #17)',
    brand: 'Garmin',
    categoryId: 'smartwatches-wearables',
    categoryName: 'Smartwatches & Fitness',
    price: 499,
    originalMSRP: 899,
    unboxedTotalWorth: 899,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 44,
    rating: 4.9,
    reviewCount: 167,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: true,
    badge: 'PALLET #17 • SAPPHIRE SOLAR',
    images: [
      palletWearablesLot,
      garminFenix7xLive,
      garminFenix7xDetail,
      palletManifestSeal
    ],
    description: 'Conquer every hour of the day with advanced training features, 24/7 health and wellness monitoring, scratch-resistant sapphire solar lens, and an ultra-bright built-in multi-LED flashlight. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €899 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €400 / 44% margin against the €499 liquidation pallet price).',
    keyFeatures: [
      'Power Sapphire solar charging lens harvests sunlight to extend battery life up to 37 days',
      'Built-in bright multi-LED flashlight with variable intensities and red strobe safety light',
      'Multi-band GNSS with SatIQ technology delivers superior outdoor positioning accuracy',
      'Preloaded TopoActive Europe maps, ski resort maps, and 43,000+ golf courses'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€899 (European Retail Value)',
      'Unboxed Resale Margin': '€400 (44% Immediate Equity)',
      'Pallet Reference': 'PLT-17 / Lot 865',
      'Case Size': '51 mm Titanium bezel with fiber-reinforced polymer case',
      'Water Rating': '10 ATM (100 meters dive proof)',
      'Memory': '32 GB preloaded maps and music storage',
      'Warranty': '24 Months European Garmin Warranty'
    },
    variants: [
      { id: 'v-black-titanium', name: 'Finish', value: 'Carbon Gray DLC Titanium' }
    ],
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-17',
    reviews: [
      {
        id: 'r17',
        userName: 'Mikko Korhonen',
        userCountry: 'Finland',
        rating: 5,
        date: '2026-03-02',
        title: 'Incredible battery life for mountain ultramarathons',
        comment: 'GPS accuracy in dense Finnish pine forests is pinpoint. Flashlight is surprisingly bright in the dark. 100% genuine.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-18-apple-watch-ultra-2',
    palletNumber: 18,
    palletCode: 'PLT-18',
    sku: 'PLT-18-APL-WULT2',
    title: 'Apple Watch Ultra 2 GPS + Cellular 49mm Titanium Case (Pallet Lot #18)',
    brand: 'Apple',
    categoryId: 'smartwatches-wearables',
    categoryName: 'Smartwatches & Fitness',
    price: 629,
    originalMSRP: 899,
    unboxedTotalWorth: 899,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 30,
    rating: 4.9,
    reviewCount: 220,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 3,
    featured: false,
    badge: 'PALLET #18 • TITANIUM 49MM',
    images: [
      palletWearablesLot,
      appleWatchUltraLive,
      appleWatchUltraMacro,
      palletManifestSeal
    ],
    description: 'The most capable and rugged Apple Watch. Built for endurance, outdoor adventure, and water sports with a 49mm aerospace-grade titanium case, extra-long battery life, and the brightest Apple display ever (3,000 nits). Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €899 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €270 / 30% margin against the €629 liquidation pallet price).',
    keyFeatures: [
      'Powered by S9 SiP with Double Tap gesture control and on-device Siri',
      '3000-nit Always-On Retina display readable in brightest direct sunlight',
      'Dual-frequency GPS with Precision Start button and 86-decibel Emergency Siren',
      'Certified EN13319 water resistance for recreational scuba diving to 40m'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€899 (European Retail Value)',
      'Unboxed Resale Margin': '€270 (30% Immediate Equity)',
      'Pallet Reference': 'PLT-18 / Lot 866',
      'Case Material': 'Aerospace-grade natural titanium 49mm',
      'Connectivity': 'LTE 4G Cellular + GPS, Wi-Fi 4, Bluetooth 5.3, UWB 2',
      'Battery Life': 'Up to 36 hours regular / 72 hours in Low Power Mode',
      'Warranty': '12 Months Official Apple Worldwide Warranty'
    },
    variants: [
      { id: 'v-trail-loop', name: 'Band', value: 'Blue/Black Trail Loop' },
      { id: 'v-ocean-band', name: 'Band', value: 'Midnight Ocean Band' }
    ],
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-18',
    reviews: [
      {
        id: 'r18',
        userName: 'Henrik Vestergaard',
        userCountry: 'Denmark',
        rating: 5,
        date: '2026-02-25',
        title: 'Factory sealed with active Apple warranty',
        comment: 'Serial verified immediately in Apple Support app with complete coverage. The titanium case is flawless.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-19-lg-oled-55-c3',
    palletNumber: 19,
    palletCode: 'PLT-19',
    sku: 'PLT-19-LG-OLED55',
    title: 'LG 55-inch OLED evo C3 4K Smart TV with α9 Gen6 AI Processor & Dolby Vision (Pallet Lot #19)',
    brand: 'LG',
    categoryId: 'tvs-home-cinema',
    categoryName: 'TVs & Home Cinema',
    price: 899,
    originalMSRP: 1599,
    unboxedTotalWorth: 1599,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 44,
    rating: 4.9,
    reviewCount: 178,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 2,
    featured: true,
    badge: 'PALLET #19 • SAVE €700',
    images: [
      palletTvScreensLot,
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Self-lit OLED pixels shine brighter with Brightness Booster. Infinite contrast, 100% color volume, ultra-fast 0.1ms response time, 4x HDMI 2.1 ports for 120Hz 4K gaming, and Dolby Atmos cinematic sound. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,599 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €700 / 44% margin against the €899 liquidation pallet price).',
    keyFeatures: [
      'OLED evo self-lit pixel technology powered by α9 AI Processor Gen6',
      'Dolby Vision and Dolby Atmos cinema grade image and surround sound',
      'Ultra-fast 0.1ms response time, 120Hz, VRR, G-Sync, and FreeSync Premium',
      'webOS smart platform with Magic Remote and hands-free voice control'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,599 (European Retail Value)',
      'Unboxed Resale Margin': '€700 (44% Immediate Equity)',
      'Pallet Reference': 'PLT-19 / Lot 867',
      'Screen Size': '55 inches (139 cm diagonal)',
      'Resolution': '4K Ultra HD (3840 x 2160)',
      'Refresh Rate': '120Hz Native',
      'Ports': '4x HDMI 2.1, 3x USB, eARC, Optical, Ethernet',
      'Warranty': '24 Months European Manufacturer Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-19',
    reviews: [
      {
        id: 'r19',
        userName: 'Jean-Luc Dupont',
        userCountry: 'France',
        rating: 5,
        date: '2026-02-22',
        title: 'Mind-blowing picture quality',
        comment: 'Black levels are infinite and gaming on PS5 at 120Hz is buttery smooth. Freight delivery was on time with text updates.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-20-karcher-k5-power',
    palletNumber: 20,
    palletCode: 'PLT-20',
    sku: 'PLT-20-KCH-K5PC',
    title: 'Kärcher K5 Power Control 145-Bar High Pressure Washer with Patio Cleaner (Pallet Lot #20)',
    brand: 'Kärcher',
    categoryId: 'outdoor-garden',
    categoryName: 'Outdoor & Garden Living',
    price: 249,
    originalMSRP: 439,
    unboxedTotalWorth: 439,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 43,
    rating: 4.8,
    reviewCount: 112,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 5,
    featured: false,
    badge: 'PALLET #20 • 43% OFF',
    images: [
      palletOutdoorLot,
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'For effortless cleaning of stone patios, driveways, cars, and garden walls. Water-cooled induction motor provides superior reliability and long service life. Integrated Plug "n" Clean detergent system for instant detergent application. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €439 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €190 / 43% margin against the €249 liquidation pallet price).',
    keyFeatures: [
      'Power Control spray gun with manual pressure level indicator on handle',
      'Vario Power Jet lance and Dirt Blaster rotary high-impact nozzle included',
      'Water-cooled induction motor designed for maximum endurance and low noise',
      'Telescopic handle made of high-grade aluminum and 10m high-pressure hose'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€439 (European Retail Value)',
      'Unboxed Resale Margin': '€190 (43% Immediate Equity)',
      'Pallet Reference': 'PLT-20 / Lot 868',
      'Max Pressure': '145 Bar (2100 PSI)',
      'Flow Rate': '500 Liters / hour',
      'Area Performance': '40 m² / hour',
      'Hose Length': '10 meters premium steel-reinforced',
      'Warranty': '36 Months European Manufacturer Warranty'
    },
    warrantyMonths: 36,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-20',
    reviews: [
      {
        id: 'r20',
        userName: 'Christoph Wagner',
        userCountry: 'Austria',
        rating: 5,
        date: '2026-03-02',
        title: 'Cleaned a 60m² stone terrace in under an hour',
        comment: 'Plenty of pressure to blast away years of moss and grime. Delivered in original yellow Kärcher box.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-21-ps5-pro-bundle',
    palletNumber: 21,
    palletCode: 'PLT-21',
    sku: 'PLT-21-SNY-PS5PRO',
    title: 'Sony PlayStation 5 Pro 2TB Console & DualSense Wireless Controllers Liquidation Pallet (Lot #21)',
    brand: 'Sony PlayStation',
    categoryId: 'computing-gaming',
    categoryName: 'Computing & Gaming',
    price: 589,
    originalMSRP: 899,
    unboxedTotalWorth: 899,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 34,
    rating: 4.9,
    reviewCount: 312,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: true,
    badge: 'PALLET #21 • HIGH DEMAND',
    images: [
      palletGamingLot,
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'The pinnacle of console gaming performance. PS5 Pro features PlayStation Spectral Super Resolution (PSSR) AI upscaling, 2TB ultra-fast internal NVMe SSD, advanced ray tracing, and stable 4K 60-120fps fidelity mode gaming. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €899 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €310 / 34% margin against the €589 liquidation pallet price).',
    keyFeatures: [
      'Upgraded GPU with 67% more Compute Units and 28% faster memory',
      'Advanced hardware ray tracing providing 2-3x dynamic lighting reflections',
      'PlayStation Spectral Super Resolution (PSSR) AI-driven image clarity',
      'Includes 2x official DualSense Wireless Controllers and Astro Bot pre-installed'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€899 (European Retail Value)',
      'Unboxed Resale Margin': '€310 (34% Immediate Equity)',
      'Pallet Reference': 'PLT-21 / Lot 901',
      'Storage': '2TB High-Speed NVMe Internal SSD',
      'Video Output': 'HDMI 2.1 supporting 4K 120Hz, 8K, and VRR',
      'Connectivity': 'Wi-Fi 7 (IEEE 802.11be), Bluetooth 5.1, Gigabit Ethernet',
      'Warranty': '24 Months Official Sony European Guarantee'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-21',
    reviews: [
      {
        id: 'r21',
        userName: 'Sven Lindqvist',
        userCountry: 'Sweden',
        rating: 5,
        date: '2026-03-05',
        title: 'Factory shrink-wrapped master pallet',
        comment: 'All serial numbers are intact and covered under official Sony European warranty. Absolutely unbeatable price for PS5 Pro.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-22-iphone-15-pro-max',
    palletNumber: 22,
    palletCode: 'PLT-22',
    sku: 'PLT-22-APL-IP15PM',
    title: 'Apple iPhone 15 Pro Max 256GB Natural Titanium Factory Sealed Master Carton Lot (Pallet Lot #22)',
    brand: 'Apple',
    categoryId: 'smartphones-tablets',
    categoryName: 'Smartphones & Tablets',
    price: 849,
    originalMSRP: 1479,
    unboxedTotalWorth: 1479,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 43,
    rating: 5.0,
    reviewCount: 428,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 3,
    featured: true,
    badge: 'PALLET #22 • TITANIUM 256GB',
    images: [
      palletElectronicsLot,
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Forged in titanium with aerospace-grade strength. Powered by the groundbreaking A17 Pro chip with console-quality graphics, customizable Action button, and Apple most powerful smartphone camera system with 5x optical zoom. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,479 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €630 / 43% margin against the €849 liquidation pallet price).',
    keyFeatures: [
      'Strong and lightweight titanium design with contoured edges and textured matte glass back',
      '6.7-inch Super Retina XDR display with ProMotion 120Hz and Always-On display',
      'A17 Pro industry-first 3-nanometer chip delivering unprecedented mobile graphics performance',
      'Pro camera system with 48MP Main sensor and 5x optical telephoto lens (120mm equivalent)'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,479 (European Retail Value)',
      'Unboxed Resale Margin': '€630 (43% Immediate Equity)',
      'Pallet Reference': 'PLT-22 / Lot 902',
      'Finish': 'Natural Titanium',
      'Capacity': '256GB NVMe High-Speed Flash',
      'Port': 'USB-C supporting USB 3 speeds up to 10Gbps',
      'Warranty': '12 Months Official Apple Worldwide Warranty'
    },
    variants: [
      { id: 'v-natural-ti', name: 'Color', value: 'Natural Titanium' },
      { id: 'v-blue-ti', name: 'Color', value: 'Blue Titanium' }
    ],
    warrantyMonths: 12,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-22',
    reviews: [
      {
        id: 'r22',
        userName: 'Matteo Rossi',
        userCountry: 'Italy',
        rating: 5,
        date: '2026-03-04',
        title: 'Original Apple pull-tabs completely intact',
        comment: 'Checked warranty coverage on Apple portal immediately upon receiving the freight. 100% genuine sealed EU stock.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-23-dewalt-xr-8piece-combo',
    palletNumber: 23,
    palletCode: 'PLT-23',
    sku: 'PLT-23-DWT-XR8PC',
    title: 'DeWalt 18V XR Brushless 8-Piece Heavy-Duty Contractor Kit with ToughSystem 2.0 (Pallet Lot #23)',
    brand: 'DeWalt',
    categoryId: 'power-tools',
    categoryName: 'Power Tools & DIY',
    price: 749,
    originalMSRP: 1349,
    unboxedTotalWorth: 1349,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 44,
    rating: 4.9,
    reviewCount: 164,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 5,
    featured: false,
    badge: 'PALLET #23 • CONTRACTOR KIT',
    images: [
      palletToolsLot,
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Heavy-duty construction outfit for certified trade contractors. Packed in IP65 weather-sealed ToughSystem 2.0 stacking storage boxes. High-efficiency brushless motors provide 57% more run time than brushed equivalents. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,349 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €600 / 44% margin against the €749 liquidation pallet price).',
    keyFeatures: [
      'Includes DCD996 3-speed Combi Hammer Drill and DCF887 205Nm 3-speed Impact Driver',
      'DCS570 184mm Circular Saw, DCS367 Compact Reciprocating Saw, and DCS331 Jigsaw',
      'DCL050 Pivot Worklight, DCG405 125mm Angle Grinder, and DCH273 SDS+ Hammer',
      'Includes 3x 5.0Ah XR Li-Ion Batteries, DCB115 Multi-Voltage Fast Charger, and ToughSystem Cart'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,349 (European Retail Value)',
      'Unboxed Resale Margin': '€600 (44% Immediate Equity)',
      'Pallet Reference': 'PLT-23 / Lot 903',
      'Battery Platform': 'DeWalt 18V XR Lithium-Ion',
      'Motor Technology': 'Brushless Heavy-Duty',
      'Storage System': 'ToughSystem 2.0 Modular Mobile Rolling Cart',
      'Warranty': '36 Months DeWalt European Trade Warranty'
    },
    warrantyMonths: 36,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-23',
    reviews: [
      {
        id: 'r23',
        userName: 'Gerd Zimmermann',
        userCountry: 'Germany',
        rating: 5,
        date: '2026-03-01',
        title: 'Incredible value for building company',
        comment: 'Every tool arrived brand new in original DeWalt ToughSystem boxes. The brushless motors run super cool under heavy load.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-24-dyson-airwrap-multistyler',
    palletNumber: 24,
    palletCode: 'PLT-24',
    sku: 'PLT-24-DYS-AWPMLT',
    title: 'Dyson Airwrap Multi-Styler Complete Long Nickel & Copper Presentation Case Lot (Pallet Lot #24)',
    brand: 'Dyson',
    categoryId: 'kitchen-appliances',
    categoryName: 'Kitchen & Coffee',
    price: 369,
    originalMSRP: 599,
    unboxedTotalWorth: 599,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 38,
    rating: 4.8,
    reviewCount: 385,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 6,
    featured: false,
    badge: 'PALLET #24 • FAST SELLER',
    images: [
      palletAppliancesLot,
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Curl, shape, smooth, and hide flyaways with no extreme heat. Re-engineered styling attachments harness Enhanced Coanda airflow for faster, easier styling with greater control. Packaged in a cushioned Prussian blue presentation case. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €599 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €230 / 38% margin against the €369 liquidation pallet price).',
    keyFeatures: [
      'Powered by the Dyson digital motor V9 spinning at up to 110,000rpm',
      'Intelligent heat control measures airflow temperature over 40 times a second',
      'Airwrap barrels create clockwise and counterclockwise curls with a single barrel',
      'Coanda smoothing dryer switches from drying to smoothing mode instantly'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€599 (European Retail Value)',
      'Unboxed Resale Margin': '€230 (38% Immediate Equity)',
      'Pallet Reference': 'PLT-24 / Lot 904',
      'Color Finish': 'Special Edition Nickel & Copper',
      'Power Rating': '1300 Watts / 230V EU Plug',
      'Case': 'Prussian Blue cushioned presentation storage case',
      'Warranty': '24 Months Dyson Official European Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-24',
    reviews: [
      {
        id: 'r24',
        userName: 'Anouk van der Meer',
        userCountry: 'Netherlands',
        rating: 5,
        date: '2026-02-28',
        title: 'Original Dyson security seals intact',
        comment: 'Resold half the lot within 3 days and kept one for personal use. Authentic serial registered without any friction on Dyson.nl.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-25-samsung-neo-qled-65',
    palletNumber: 25,
    palletCode: 'PLT-25',
    sku: 'PLT-25-SMG-65QN90',
    title: 'Samsung 65-inch Neo QLED 4K QN90C Smart TV with Quantum Matrix & Neural Quantum Processor (Pallet Lot #25)',
    brand: 'Samsung',
    categoryId: 'tvs-home-cinema',
    categoryName: 'TVs & Home Cinema',
    price: 999,
    originalMSRP: 1899,
    unboxedTotalWorth: 1899,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 47,
    rating: 4.9,
    reviewCount: 142,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 2,
    featured: true,
    badge: 'PALLET #25 • SAVE €900',
    images: [
      palletTvScreensLot,
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Brilliant picture quality powered by Quantum Mini LEDs. Noticeable detail in both the darkest and brightest scenes with ultra-fine light control. Anti-Glare with Ultra Viewing Angle eliminates reflections in sunlit rooms. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,899 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €900 / 47% margin against the €999 liquidation pallet price).',
    keyFeatures: [
      'Quantum Matrix Technology with dense Quantum Mini LEDs for extreme peak contrast',
      'Neural Quantum Processor 4K with 20 AI neural networks for real-time 4K upscaling',
      'Motion Xcelerator Turbo Pro with up to 144Hz refresh rate and FreeSync Premium Pro',
      'Dolby Atmos and Object Tracking Sound+ (OTS+) 60W 4.2.2 channel cinematic sound'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,899 (European Retail Value)',
      'Unboxed Resale Margin': '€900 (47% Immediate Equity)',
      'Pallet Reference': 'PLT-25 / Lot 905',
      'Screen Size': '65-inch (163cm diagonal)',
      'Resolution': '4K Ultra HD (3840 x 2160)',
      'Refresh Rate': '144Hz Native Motion Rate',
      'HDMI Ports': '4x HDMI 2.1 (4K@144Hz, eARC, ALLM)',
      'Warranty': '24 Months Official Samsung European Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-25',
    reviews: [
      {
        id: 'r25',
        userName: 'Philippe Moreau',
        userCountry: 'Belgium',
        rating: 5,
        date: '2026-03-03',
        title: 'Outstanding brightness and zero glare',
        comment: 'Pallet arrived securely strapped on wooden base with protective foam corners. TV boots up instantly with solar remote.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-26-bose-qc-ultra-bundle',
    palletNumber: 26,
    palletCode: 'PLT-26',
    sku: 'PLT-26-BSE-QCUSET',
    title: 'Bose QuietComfort Ultra Noise-Cancelling Headphones & SoundLink Max Speaker Crate (Pallet Lot #26)',
    brand: 'Bose',
    categoryId: 'electronics-audio',
    categoryName: 'Electronics & Audio',
    price: 419,
    originalMSRP: 729,
    unboxedTotalWorth: 729,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 43,
    rating: 4.8,
    reviewCount: 198,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: false,
    badge: 'PALLET #26 • ULTRA AUDIO',
    images: [
      palletElectronicsLot,
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'The definitive Bose audio package. Includes the flagship Bose QuietComfort Ultra Over-Ear headphones with breakthrough spatialized audio and world-class active noise cancellation, bundled with the rugged IP67 SoundLink Max portable boombox. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €729 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €310 / 43% margin against the €419 liquidation pallet price).',
    keyFeatures: [
      'Bose Immersive Audio pushes boundaries of spatial listening regardless of source',
      'CustomTune technology analyzes your ear shape to adapt sound and cancellation',
      'Quiet, Aware, and Immersion listening modes with Wind Block feature',
      'Bose SoundLink Max delivers deep stereo bass and 20 hours battery life with USB-C powerbank'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€729 (European Retail Value)',
      'Unboxed Resale Margin': '€310 (43% Immediate Equity)',
      'Pallet Reference': 'PLT-26 / Lot 906',
      'Headphone Battery': 'Up to 24 hours (up to 18 hours with Immersive Audio)',
      'Speaker Rating': 'IP67 Waterproof & Dustproof',
      'Bluetooth Version': 'Bluetooth 5.3 with Snapdragon Sound aptX Adaptive',
      'Warranty': '24 Months Bose European Guarantee'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-26',
    reviews: [
      {
        id: 'r26',
        userName: 'Lukas Meyer',
        userCountry: 'Switzerland',
        rating: 5,
        date: '2026-02-26',
        title: 'World class noise cancellation',
        comment: 'SoundLink Max shakes the room and QC Ultra blocks out all airplane hum. Super quick insured freight delivery from Venlo.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-27-roborock-s8-pro-ultra',
    palletNumber: 27,
    palletCode: 'PLT-27',
    sku: 'PLT-27-RBK-S8PRO',
    title: 'Roborock S8 Pro Ultra Robot Vacuum with RockDock Ultra Self-Emptying & Drying Station (Pallet Lot #27)',
    brand: 'Roborock',
    categoryId: 'floorcare-vacuums',
    categoryName: 'Floorcare & Vacuums',
    price: 799,
    originalMSRP: 1499,
    unboxedTotalWorth: 1499,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 47,
    rating: 4.9,
    reviewCount: 215,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 3,
    featured: true,
    badge: 'PALLET #27 • AUTOMATED DOCK',
    images: [
      palletVacuumLot,
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Completely forget about cleaning. The RockDock Ultra all-in-one docking station empties dust for up to 7 weeks, washes mop pads with warm air drying, and automatically refills clean water tank. Armed with 6,000Pa HyperForce suction. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,499 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €700 / 47% margin against the €799 liquidation pallet price).',
    keyFeatures: [
      'RockDock Ultra: Auto-Wash, Auto-Dry, Auto-Empty, and Auto-Refill in one unit',
      'DuoRoller Riser dual rubber roller brushes resist hair tangles on carpets',
      'VibraRise 2.0 sonic mopping system scrubs at 3,000 times/min with dual vibration modules',
      'Reactive 3D Obstacle Avoidance identifies and maneuvers around pet toys, shoes, and cables'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,499 (European Retail Value)',
      'Unboxed Resale Margin': '€700 (47% Immediate Equity)',
      'Pallet Reference': 'PLT-27 / Lot 907',
      'Suction Power': '6,000Pa HyperForce suction',
      'Mop Auto-Lifting': '5mm clearance when carpet detected',
      'Dustbag Capacity': '2.5 Liters (Up to 7 weeks storage)',
      'Warranty': '24 Months European Manufacturer Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-27',
    reviews: [
      {
        id: 'r27',
        userName: 'Wouter Janssen',
        userCountry: 'Netherlands',
        rating: 5,
        date: '2026-03-06',
        title: 'The drying function is a game changer',
        comment: 'No damp odor because the dock blows warm air over the mop pad. Factory sealed inside master outer box.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-28-segway-ninebot-max-g2',
    palletNumber: 28,
    palletCode: 'PLT-28',
    sku: 'PLT-28-SGW-MAXG2',
    title: 'Segway Ninebot KickScooter MAX G2 E-Scooter with Hydraulic Dual Suspension Pallet (Pallet Lot #28)',
    brand: 'Segway Ninebot',
    categoryId: 'outdoor-garden',
    categoryName: 'Outdoor & Garden Living',
    price: 529,
    originalMSRP: 899,
    unboxedTotalWorth: 899,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 41,
    rating: 4.8,
    reviewCount: 167,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: false,
    badge: 'PALLET #28 • 70KM RANGE',
    images: [
      palletOutdoorLot,
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1597404294360-feeeda04612e?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'The master of city commuting. Features RideyLONG range technology delivering up to 70km on a single charge, rear-wheel drive 900W motor conquering 22% inclines, front hydraulic suspension, and rear adjustable double springs. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €899 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €370 / 41% margin against the €529 liquidation pallet price).',
    keyFeatures: [
      'Up to 70km theoretical range powered by 551Wh battery with Smart-BMS system',
      'Double suspension system: front hydraulic damper and rear double spring shock absorption',
      '10-inch self-healing tubeless tires with internal jelly sealing layer against punctures',
      'Built-in front and rear turn signal indicators and Apple Find My network integration'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€899 (European Retail Value)',
      'Unboxed Resale Margin': '€370 (41% Immediate Equity)',
      'Pallet Reference': 'PLT-28 / Lot 908',
      'Motor Power': '450W Nominal / 900W Maximum',
      'Max Speed': '25 km/h (EU Compliant)',
      'Braking System': 'Front Drum Brake + Rear Electronic Regenerative Brake (E-ABS)',
      'Warranty': '24 Months Segway European Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-28',
    reviews: [
      {
        id: 'r28',
        userName: 'Florian Weber',
        userCountry: 'Germany',
        rating: 5,
        date: '2026-03-02',
        title: 'Smooth ride over cobblestones',
        comment: 'The dual suspension absorbs European city paving perfectly. Delivered with EU certificate of conformity.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-29-sage-barista-touch-impress',
    palletNumber: 29,
    palletCode: 'PLT-29',
    sku: 'PLT-29-SGE-BTOUCH',
    title: 'Sage Barista Touch Impress Brushed Stainless Steel Espresso Machine Pallet Lot (Pallet Lot #29)',
    brand: 'Sage / Breville',
    categoryId: 'kitchen-appliances',
    categoryName: 'Kitchen & Coffee',
    price: 649,
    originalMSRP: 1199,
    unboxedTotalWorth: 1199,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 46,
    rating: 4.9,
    reviewCount: 224,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 3,
    featured: true,
    badge: 'PALLET #29 • BARISTA CHOICE',
    images: [
      palletAppliancesLot,
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Third wave specialty coffee with assisted tamping and automated microfoam texturing. The touch touchscreen displays step-by-step barista guidance, while ThermoJet heating reaches extraction temperature in just 3 seconds. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,199 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €550 / 46% margin against the €649 liquidation pallet price).',
    keyFeatures: [
      'Impress Puck System delivers precision dose calculation and 10kg assisted tamping with 7-degree twist',
      'Auto MilQ automated hands-free microfoam texturing with settings optimized for Oat, Almond, and Soy milk',
      'ThermoJet heating system reaches optimum extraction temperature in 3 seconds flat',
      'Baratza European precision hardened steel conical burrs with 30 customizable grind sizes'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,199 (European Retail Value)',
      'Unboxed Resale Margin': '€550 (46% Immediate Equity)',
      'Pallet Reference': 'PLT-29 / Lot 909',
      'Material': 'Brushed Stainless Steel die-cast casing',
      'Water Tank': '2.0 Liters with integrated water filter',
      'Bean Hopper': '340g with airtight UV locking seal',
      'Warranty': '24 Months Official Sage European Guarantee'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-29',
    reviews: [
      {
        id: 'r29',
        userName: 'Marcello Moretti',
        userCountry: 'Italy',
        rating: 5,
        date: '2026-02-27',
        title: 'Cafe quality espresso at home',
        comment: 'Assisted tamping leaves zero coffee grounds on the counter. Silky microfoam for latte art every single morning.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-30-milwaukee-m18-fuel-trade',
    palletNumber: 30,
    palletCode: 'PLT-30',
    sku: 'PLT-30-MLW-M18FUL',
    title: 'Milwaukee M18 FUEL 6-Tool Heavy-Duty Trade Monster Kit with PACKOUT Rolling Cart (Pallet Lot #30)',
    brand: 'Milwaukee',
    categoryId: 'power-tools',
    categoryName: 'Power Tools & DIY',
    price: 829,
    originalMSRP: 1599,
    unboxedTotalWorth: 1599,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 48,
    rating: 5.0,
    reviewCount: 147,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: false,
    badge: 'PALLET #30 • TRADE MONSTER',
    images: [
      palletToolsLot,
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'The heavyweight standard for demolition, framing, and industrial mechanical installations. Milwaukee M18 FUEL combines POWERSTATE brushless motors, REDLITHIUM battery architecture, and REDLINK PLUS intelligence for unmatched durability. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,599 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €770 / 48% margin against the €829 liquidation pallet price).',
    keyFeatures: [
      'M18 FPD3 Heavy Duty Percussion Combi Drill with monster 158Nm torque',
      'M18 FID3 1/4" Hex Impact Driver with 4-mode DRIVE CONTROL and 226Nm output',
      'M18 CCS55 55mm Circular Saw, M18 FSZ SAWZALL, and M18 FSAG125X 125mm Angle Grinder',
      'Includes 2x 5.0Ah REDLITHIUM packs, 1x 8.0Ah HIGH OUTPUT battery, M12-18FC Rapid Charger, and PACKOUT rolling chest'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,599 (European Retail Value)',
      'Unboxed Resale Margin': '€770 (48% Immediate Equity)',
      'Pallet Reference': 'PLT-30 / Lot 910',
      'Motor': 'POWERSTATE Brushless',
      'Electronics': 'REDLINK PLUS Hardware Intelligence',
      'Storage': 'Milwaukee PACKOUT Modular Rolling Tool Box',
      'Warranty': '36 Months Official Milwaukee Commercial Warranty'
    },
    warrantyMonths: 36,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-30',
    reviews: [
      {
        id: 'r30',
        userName: 'Stefan Kowalski',
        userCountry: 'Poland',
        rating: 5,
        date: '2026-03-04',
        title: 'Indestructible tools for the job site',
        comment: '158Nm drill punches through solid oak and concrete without flinching. PACKOUT cart rolled right off the delivery pallet into work.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-31-luxury-designer-handbags',
    palletNumber: 31,
    palletCode: 'PLT-31',
    sku: 'PLT-31-DSG-HBGAUT',
    title: 'European Luxury Designer Leather Handbags & Accessories Assortment (Pallet Lot #31)',
    brand: 'Luxury Designer',
    categoryId: 'apparel-footwear',
    categoryName: 'Apparel, Footwear & Designer Goods',
    price: 1890,
    originalMSRP: 4850,
    unboxedTotalWorth: 4850,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 61,
    rating: 4.9,
    reviewCount: 92,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 2,
    featured: true,
    badge: 'PALLET #31 • 61% OFF LUXURY',
    images: [
      palletApparelLot,
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Certified authentic Grade-A department store liquidation crate sourced from Milan and Paris boutique clearances. Assortment includes structured full-grain calfskin shoulder bags, crossbodies, cardholders, and matching leather wallets from Gucci, Prada, and Saint Laurent. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €4,850 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €2,960 / 61% margin against the €1,890 liquidation pallet price).',
    keyFeatures: [
      '100% Guaranteed Authentic with RFID microchip verification and stamped manufacturer serial numbers',
      'Crafted in Italy and France using vegetable-tanned grain calfskin leather with gold-tone hardware',
      'All pieces in original protective fabric dust bags with authentic boutique tags and care booklets',
      'Ideal for luxury resellers, boutique outlets, and high-end retail clearance merchants'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€4,850 (European Retail Value)',
      'Unboxed Resale Margin': '€2,960 (61% Immediate Equity)',
      'Pallet Reference': 'PLT-31 / Lot 911',
      'Origin': 'Italian & French Department Store Clearances',
      'Authentication': 'RFID Tagged & Certified Grade-A Manifested',
      'Included Items': '12x Designer Leather Bags + 18x Small Leather Goods (Wallets/Pouch)',
      'Condition': 'Pristine Store Overstock (Never Displayed)'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-31',
    reviews: [
      {
        id: 'r31',
        userName: 'Camille Leroux',
        userCountry: 'France',
        rating: 5,
        date: '2026-03-01',
        title: 'Authenticity checked out 100%',
        comment: 'Scanned microchips and matched serials against boutique records. Flawless gold hardware and beautiful leather smell.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-32-apple-macbook-pro-14-m3',
    palletNumber: 32,
    palletCode: 'PLT-32',
    sku: 'PLT-32-APL-MBP14M',
    title: 'Apple MacBook Pro 14-inch M3 Pro (18GB Unified Memory, 512GB SSD, Space Black) Master Crate Lot (Pallet Lot #32)',
    brand: 'Apple',
    categoryId: 'computing-gaming',
    categoryName: 'Computing & Gaming',
    price: 1490,
    originalMSRP: 2499,
    unboxedTotalWorth: 2499,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 40,
    rating: 5.0,
    reviewCount: 189,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 3,
    featured: true,
    badge: 'PALLET #32 • M3 PRO SPACE BLACK',
    images: [
      palletLaptopsLot,
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'The world most advanced pro laptop. Powered by M3 Pro with 11-core CPU and 14-core GPU with hardware-accelerated ray tracing. Liquid Retina XDR display with 1,000 nits sustained brightness and up to 18 hours of continuous battery life. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €2,499 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €1,009 / 40% margin against the €1,490 liquidation pallet price).',
    keyFeatures: [
      'Apple M3 Pro silicon delivers blistering speed for 4K video editing, 3D rendering, and software compiling',
      '14.2-inch Liquid Retina XDR display with Extreme Dynamic Range and ProMotion 120Hz refresh rate',
      '18GB unified high-speed memory and 512GB PCIe Gen 4 SSD storage',
      'MagSafe 3, 3x Thunderbolt 4 ports, HDMI port, SDXC card slot, and studio-quality 3-mic array'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€2,499 (European Retail Value)',
      'Unboxed Resale Margin': '€1,009 (40% Immediate Equity)',
      'Pallet Reference': 'PLT-32 / Lot 912',
      'Chipset': 'Apple M3 Pro (11-core CPU, 14-core GPU, 16-core Neural Engine)',
      'Color': 'Space Black Anodized Aluminum with anti-fingerprint seal',
      'Keyboard': 'European ISO QWERTY Backlit Magic Keyboard with Touch ID',
      'Warranty': '12 Months Official Apple Worldwide Warranty'
    },
    warrantyMonths: 12,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-32',
    reviews: [
      {
        id: 'r32',
        userName: 'Lars Thomsen',
        userCountry: 'Denmark',
        rating: 5,
        date: '2026-03-06',
        title: 'Original brown Apple shipper with security pull tab',
        comment: 'Clean shrinkwrap, Space Black looks phenomenal, battery cycle count was 0 out of the box. Top tier liquidation.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-33-ecoflow-delta-2-max',
    palletNumber: 33,
    palletCode: 'PLT-33',
    sku: 'PLT-33-ECO-DLT2MX',
    title: 'EcoFlow DELTA 2 Max 2400W Portable Power Station with 400W Bifacial Solar Panel (Pallet Lot #33)',
    brand: 'EcoFlow',
    categoryId: 'outdoor-garden',
    categoryName: 'Outdoor & Garden Living',
    price: 1149,
    originalMSRP: 2099,
    unboxedTotalWorth: 2099,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 45,
    rating: 4.9,
    reviewCount: 135,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 3,
    featured: true,
    badge: 'PALLET #33 • 2048WH SOLAR',
    images: [
      palletPowerLot,
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Energy independence for home backup, off-grid camping, and outdoor workstations. 2048Wh premium LFP (LiFePO4) chemistry lasts 10 years of daily use (3,000 cycles). Charges from 0-80% in 43 minutes with dual AC + solar combination. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €2,099 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €950 / 45% margin against the €1,149 liquidation pallet price).',
    keyFeatures: [
      '2048Wh LFP battery expandable up to 6144Wh with extra battery modules',
      '2400W pure sine wave AC output (X-Boost mode powers appliances up to 3100W)',
      'Charges in 81 minutes from AC wall outlet or 2.3 hours via 1000W solar input',
      'Includes 400W IP68 waterproof portable folding bifacial solar panel with kickstand case'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€2,099 (European Retail Value)',
      'Unboxed Resale Margin': '€950 (45% Immediate Equity)',
      'Pallet Reference': 'PLT-33 / Lot 913',
      'Battery Chemistry': 'LFP (LiFePO4) - 3000 cycles to 80%+ capacity',
      'AC Outlets': '4x 230V EU Schuko (2400W continuous / 4800W surge)',
      'Solar Input': '11-60V 15A single port / 1000W Max dual ports',
      'Warranty': '60 Months (5 Years) EcoFlow European Manufacturer Guarantee'
    },
    warrantyMonths: 60,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-33',
    reviews: [
      {
        id: 'r33',
        userName: 'Hannes Gruber',
        userCountry: 'Austria',
        rating: 5,
        date: '2026-03-03',
        title: 'Runs my power tools and fridge with ease',
        comment: 'Whisper quiet at under 30dB on low loads. Delivered on heavy duty pallet with dangerous goods battery markings compliant with ADR.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-34-garmin-marq-gen2-adventurer',
    palletNumber: 34,
    palletCode: 'PLT-34',
    sku: 'PLT-34-GRM-MRQG2A',
    title: 'Garmin MARQ Gen 2 Adventurer Tool Watch with Grade-5 Titanium & Sapphire AMOLED (Pallet Lot #34)',
    brand: 'Garmin',
    categoryId: 'smartwatches-wearables',
    categoryName: 'Smartwatches & Fitness',
    price: 980,
    originalMSRP: 1950,
    unboxedTotalWorth: 1950,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 50,
    rating: 4.9,
    reviewCount: 88,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 4,
    featured: false,
    badge: 'PALLET #34 • HALF PRICE',
    images: [
      palletWearablesLot,
      garminMarqGen2Live,
      garminMarqGen2Macro,
      palletManifestSeal
    ],
    description: 'A modern tool watch handcrafted from a single block of Grade-5 titanium for 5x greater hardness than steel. Features a domed sapphire crystal, 360-degree compass markings on the bezel, and an innovative hybrid leather/FKM rubber sweat-resistant strap. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,950 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €970 / 50% margin against the €980 liquidation pallet price).',
    keyFeatures: [
      'Brilliant 1.2-inch AMOLED touchscreen display readable in direct alpine sunlight',
      'Grade-5 titanium case with 360-degree compass bezel and ceramic inlay',
      'Multi-band GNSS with SatIQ technology ensuring pinpoint positioning in canyons and forests',
      'Preloaded TopoActive Europe maps, ski resort maps, and golf course maps worldwide'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,950 (European Retail Value)',
      'Unboxed Resale Margin': '€970 (50% Immediate Equity)',
      'Pallet Reference': 'PLT-34 / Lot 914',
      'Case Diameter': '46mm Grade-5 Titanium',
      'Lens': 'Domed Sapphire Crystal',
      'Water Rating': '10 ATM (100 meters dive & swim rated)',
      'Battery Life': 'Up to 16 days smartwatch mode / 42 hours GPS mode',
      'Warranty': '24 Months Official Garmin European Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-34',
    reviews: [
      {
        id: 'r34',
        userName: 'Bernhard Hofer',
        userCountry: 'Switzerland',
        rating: 5,
        date: '2026-02-24',
        title: 'Pure luxury military craft',
        comment: 'The magnetic charging clip snaps into place with a solid click. Topo maps on AMOLED screen make alpine trails effortless.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-35-dji-mini-4-pro-fly-more',
    palletNumber: 35,
    palletCode: 'PLT-35',
    sku: 'PLT-35-DJI-MN4FLM',
    title: 'DJI Mini 4 Pro Fly More Combo with DJI RC 2 Smart Controller Pallet Lot (Pallet Lot #35)',
    brand: 'DJI',
    categoryId: 'electronics-audio',
    categoryName: 'Electronics & Audio',
    price: 679,
    originalMSRP: 1129,
    unboxedTotalWorth: 1129,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 40,
    rating: 5.0,
    reviewCount: 260,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 5,
    featured: false,
    badge: 'PALLET #35 • FLY MORE COMBO',
    images: [
      palletElectronicsLot,
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'DJI most advanced mini drone to date. Weighing under 249g to exempt pilots from strict training certifications in many countries. Features omnidirectional obstacle sensing, ActiveTrack 360, 4K/60fps HDR true vertical video, and 20km FHD video transmission. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,129 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €450 / 40% margin against the €679 liquidation pallet price).',
    keyFeatures: [
      'Ultralight sub-249g design requires no registration or license in most European jurisdictions (C0 certified)',
      'Omnidirectional Active Obstacle Sensing with wide-angle and downward vision sensors',
      'DJI RC 2 Smart Controller with built-in 5.5-inch 700-nit ultra-bright FHD screen',
      'Includes 3x Intelligent Flight Batteries (up to 102 mins flight), Two-Way Charging Hub, and shoulder bag'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,129 (European Retail Value)',
      'Unboxed Resale Margin': '€450 (40% Immediate Equity)',
      'Pallet Reference': 'PLT-35 / Lot 915',
      'Camera': '1/1.3-inch CMOS, f/1.7 aperture, 48MP Photo, 4K/60fps HDR',
      'Transmission': 'DJI O4 HD video transmission up to 20km range',
      'Color Profile': '10-bit D-Log M and HLG for pro color grading',
      'Warranty': '24 Months DJI European Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-35',
    reviews: [
      {
        id: 'r35',
        userName: 'Daan Meijer',
        userCountry: 'Netherlands',
        rating: 5,
        date: '2026-03-05',
        title: 'No pilot exam needed, unbelievable 4K quality',
        comment: 'Factory shrinkwrap with DJI tamper seal. RC 2 remote screen is bright enough to see in noon sunshine.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-36-kitchenaid-artisan-stand-mixer',
    palletNumber: 36,
    palletCode: 'PLT-36',
    sku: 'PLT-36-KCH-ART48L',
    title: 'KitchenAid Artisan 4.8L Tilt-Head Stand Mixer with Dual Bowls & Flex Edge Beater (Pallet Lot #36)',
    brand: 'KitchenAid',
    categoryId: 'kitchen-appliances',
    categoryName: 'Kitchen & Coffee',
    price: 349,
    originalMSRP: 649,
    unboxedTotalWorth: 649,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 46,
    rating: 4.9,
    reviewCount: 310,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 5,
    featured: false,
    badge: 'PALLET #36 • CAST IRON ARTISAN',
    images: [
      palletAppliancesLot,
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'The kitchen icon built to last generations. Full die-cast metal construction ensures rock-solid stability during kneading heavy bread doughs. Features planetary mixing action where the beater rotates while moving around the bowl to 59 touchpoints. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €649 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €300 / 46% margin against the €349 liquidation pallet price).',
    keyFeatures: [
      'Full zinc die-cast metal construction with durable baked-on enamel finish',
      'Includes dual stainless steel bowls (4.8L and 3.0L) for uninterrupted baking',
      'Original planetary mixing action with 10 speeds from gentle fold to fast whip',
      'Includes flex edge beater, 6-wire whip, dough hook, flat beater, and pouring shield'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€649 (European Retail Value)',
      'Unboxed Resale Margin': '€300 (46% Immediate Equity)',
      'Pallet Reference': 'PLT-36 / Lot 916',
      'Motor': 'Direct Drive 300W high-efficiency induction motor',
      'Finish': 'Cast Iron Matte Anthracite / Empire Red',
      'Capacity': '4.8L (Bakes up to 9 dozen cookies or 2kg bread dough)',
      'Warranty': '60 Months (5 Years) KitchenAid European Warranty'
    },
    variants: [
      { id: 'v-matte-black', name: 'Color', value: 'Matte Anthracite' },
      { id: 'v-empire-red', name: 'Color', value: 'Empire Red' }
    ],
    warrantyMonths: 60,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-36',
    reviews: [
      {
        id: 'r36',
        userName: 'Inge De Smet',
        userCountry: 'Belgium',
        rating: 5,
        date: '2026-02-25',
        title: 'Heirloom quality mixer',
        comment: 'Doesn’t budge on the counter even when kneading 1.5kg of sourdough rye. Two bowls save so much cleanup time.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-37-philips-sonicare-9900-prestige',
    palletNumber: 37,
    palletCode: 'PLT-37',
    sku: 'PLT-37-PHL-SC9900',
    title: 'Philips Sonicare DiamondClean Prestige 9900 with SenseIQ AI & Leather Travel Case (Pallet Lot #37)',
    brand: 'Philips Sonicare',
    categoryId: 'kitchen-appliances',
    categoryName: 'Kitchen & Coffee',
    price: 189,
    originalMSRP: 349,
    unboxedTotalWorth: 349,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 46,
    rating: 4.8,
    reviewCount: 176,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 6,
    featured: false,
    badge: 'PALLET #37 • SENSEIQ AI',
    images: [
      palletAppliancesLot,
      'https://images.unsplash.com/photo-1559591937-e6205844439c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'The most advanced electric toothbrush in the world. SenseIQ technology senses pressure, motion, and coverage up to 100 times per second, automatically adjusting intensity when you press too hard. Finished in seamless Champagne Gold with stitched vegan leather charging case. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €349 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €160 / 46% margin against the €189 liquidation pallet price).',
    keyFeatures: [
      'SenseIQ real-time adaptive feedback protects enamel and receding gums',
      'All-in-One brush head combines angled bristles for 20x more plaque removal and 15x healthier gums',
      'Sonic fluid action drives micro-bubbles between teeth at 62,000 movements per minute',
      'USB-C rechargeable vegan leather travel case allows charging directly inside the case'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€349 (European Retail Value)',
      'Unboxed Resale Margin': '€160 (46% Immediate Equity)',
      'Pallet Reference': 'PLT-37 / Lot 917',
      'Finish': 'Champagne Gold / Midnight Blue',
      'Sensors': 'Pressure, scrub, position, coverage, and motion sensors',
      'App Integration': 'Sonicare AI app with 3D mouth mapping and personalized coaching',
      'Warranty': '24 Months Official Philips European Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-37',
    reviews: [
      {
        id: 'r37',
        userName: 'Katarina Novak',
        userCountry: 'Slovenia',
        rating: 5,
        date: '2026-03-01',
        title: 'My teeth feel dental-cleaned every day',
        comment: 'The haptic light warns if you scrub too hard. Premium leather travel case charges via standard USB-C.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-38-marshall-stanmore-iii',
    palletNumber: 38,
    palletCode: 'PLT-38',
    sku: 'PLT-38-MSH-STM3BT',
    title: 'Marshall Stanmore III Bluetooth Home Speaker & Major V Wireless Headphones Pack (Pallet Lot #38)',
    brand: 'Marshall',
    categoryId: 'electronics-audio',
    categoryName: 'Electronics & Audio',
    price: 269,
    originalMSRP: 499,
    unboxedTotalWorth: 499,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 46,
    rating: 4.9,
    reviewCount: 194,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 5,
    featured: false,
    badge: 'PALLET #38 • ICONIC SOUND',
    images: [
      palletElectronicsLot,
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Classic rock heritage meets cutting-edge acoustic engineering. Stanmore III has an outward-angled tweeter array and updated waveguides to deliver a consistently solid sound that is so wide it chases you around the room. Bundled with Major V on-ear headphones with 100+ hours battery life. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €499 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €230 / 46% margin against the €269 liquidation pallet price).',
    keyFeatures: [
      'Outward-angled tweeters and updated waveguides deliver an expansive stereo stage',
      'Dynamic Loudness balances tonal balance of sound to ensure music sounds brilliant at every volume',
      'Bluetooth 5.2 next-generation LE Audio-ready with multi-host functionality and 3.5mm AUX input',
      'Includes Marshall Major V headphones delivering 100+ hours wireless playtime with wireless charging'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€499 (European Retail Value)',
      'Unboxed Resale Margin': '€230 (46% Immediate Equity)',
      'Pallet Reference': 'PLT-38 / Lot 918',
      'Amplifiers': 'One 50W Class D for woofer + Two 15W Class D for tweeters (80W total)',
      'Cabinet Principle': 'Bass-reflex with rear port and analogue brass control knobs',
      'Finish': 'Classic Black vinyl textured casing with salt & pepper vintage fret',
      'Warranty': '24 Months Official European Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-38',
    reviews: [
      {
        id: 'r38',
        userName: 'Lucas Larsson',
        userCountry: 'Sweden',
        rating: 5,
        date: '2026-03-04',
        title: 'Deep analog bass and timeless looks',
        comment: 'Looks gorgeous on the sideboard and shakes the floor on rock tracks. The headphones play forever on one charge.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-39-stihl-cordless-landscape-set',
    palletNumber: 39,
    palletCode: 'PLT-39',
    sku: 'PLT-39-STL-MSA200',
    title: 'Stihl MSA 200 C-B Cordless Chainsaw & FSA 86 R Brushcutter AP System Pro Crate (Pallet Lot #39)',
    brand: 'Stihl',
    categoryId: 'outdoor-garden',
    categoryName: 'Outdoor & Garden Living',
    price: 649,
    originalMSRP: 1190,
    unboxedTotalWorth: 1190,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 45,
    rating: 5.0,
    reviewCount: 118,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 3,
    featured: false,
    badge: 'PALLET #39 • STIHL PRO KIT',
    images: [
      palletOutdoorLot,
      'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'Quiet, emission-free power for professional arborists, forestry caretakers, and property estates. Stihl AP battery system delivers gas-equivalent cutting torque without exhaust, pull cords, or engine maintenance. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €1,190 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €541 / 45% margin against the €649 liquidation pallet price).',
    keyFeatures: [
      'Stihl MSA 200 C-B with 35cm Guide Bar and 1/4" Picco Micro 3 (PM3) low-vibration saw chain',
      'Toolless Stihl Quick Chain Tensioning (B) and transparent oil tank with toolless filler cap',
      'Stihl FSA 86 R cordless brushcutter with loop handle and AutoCut C 6-2 mowing head',
      'Includes 2x AP 300 S high-capacity lithium-ion batteries and AL 500 high-speed charger (35-min charge)'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€1,190 (European Retail Value)',
      'Unboxed Resale Margin': '€541 (45% Immediate Equity)',
      'Pallet Reference': 'PLT-39 / Lot 919',
      'Battery System': 'Stihl AP Professional 36V System',
      'Chainsaw Bar Length': '35cm / 14 inches',
      'Weather Protection': 'IPX4 certified for operation in pouring rain',
      'Warranty': '24 Months Stihl Commercial European Warranty'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-39',
    reviews: [
      {
        id: 'r39',
        userName: 'Klaus Brandner',
        userCountry: 'Germany',
        rating: 5,
        date: '2026-03-03',
        title: 'Professional tree work without gas fumes',
        comment: 'Cuts through 30cm pine logs effortlessly. The AL 500 charger recharges the AP 300S batteries before the spare runs out.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plt-40-stone-island-moncler-outerwear',
    palletNumber: 40,
    palletCode: 'PLT-40',
    sku: 'PLT-40-STN-MNCJKT',
    title: 'Stone Island & Moncler Designer Down Jackets & Technical Outerwear Overstock Lot (Pallet Lot #40)',
    brand: 'Designer Outerwear',
    categoryId: 'apparel-footwear',
    categoryName: 'Apparel, Footwear & Designer Goods',
    price: 2150,
    originalMSRP: 5600,
    unboxedTotalWorth: 5600,
    productQuality: 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)',
    discountPercentage: 62,
    rating: 5.0,
    reviewCount: 79,
    condition: 'Brand New (Factory Sealed)',
    inStock: true,
    stockCount: 2,
    featured: true,
    badge: 'PALLET #40 • 62% OFF DOWN JACKETS',
    images: [
      palletApparelLot,
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce667823?auto=format&fit=crop&w=1200&q=80',
      palletManifestSeal
    ],
    description: 'High-margin winter luxury liquidation lot sourced from luxury department store seasonal clearances across Zurich, Milan, and Amsterdam. Master sealed garments include Stone Island Crinkle Reps NY garment-dyed down parkas and iconic Moncler Maya lacquer down jackets. Product Quality: Grade A+ Factory Sealed (100% brand new, verified authentic retail stock in original manufacturer packaging with intact tamper-evident security seals, zero cosmetic wear, and full manufacturer warranty eligibility). Total Worth After Unboxing: €5,600 (total retail replacement value across verified European retail outlets; yields an instant unboxed equity surplus of €3,450 / 62% margin against the €2,150 liquidation pallet price).',
    keyFeatures: [
      'Certified authentic with active Certilogo and Moncler NFC microchip security authentication tags',
      'Direct premium 90/10 goose down filling with lightweight water-resistant technical membranes',
      'Includes original branded velvet hanger sets, protective zip dust bags, and boutique spare button pouches',
      'Grade-A pristine warehouse clearance with zero defects or retail customer returns'
    ],
    specifications: {
      'Product Quality Grade': 'Grade A+ Factory Sealed (Untampered OEM Seals)',
      'Total Worth After Unboxing': '€5,600 (European Retail Value)',
      'Unboxed Resale Margin': '€3,450 (62% Immediate Equity)',
      'Pallet Reference': 'PLT-40 / Lot 920',
      'Lot Size': '14x Premium Down Parkas & Quilted Jackets (Assorted sizes S through XXL)',
      'Brands Included': 'Stone Island (8 units) & Moncler (6 units)',
      'Authentication': 'Certilogo QR + Moncler NFC micro-tag certified',
      'Packaging': 'Hanging protective heavy-duty garment shipping cartons on pallet base'
    },
    warrantyMonths: 24,
    freeShippingEligible: true,
    sourceLot: 'Trade Port Venlo Liquidation Lot #PLT-40',
    reviews: [
      {
        id: 'r40',
        userName: 'Alessandro Bardi',
        userCountry: 'Italy',
        rating: 5,
        date: '2026-03-07',
        title: 'Certilogo scanned authentic on every single jacket',
        comment: 'Moncler Maya lacquer jackets and Stone Island compass badges all pristine. Sold 4 pieces in 48 hours with tremendous margins.',
        verifiedPurchase: true
      }
    ]
  }
];
