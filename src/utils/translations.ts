export type Language = 'en' | 'de' | 'fr';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
  country: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', country: 'United Kingdom / EU' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', country: 'Deutschland / Österreich' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', country: 'France / Belgique' }
];

export interface Translations {
  // Top Bar
  flashSale: string;
  freeShipping: string;
  moneyBackGuarantee: string;
  trackOrder: string;
  
  // Header Logo & Nav
  storeTag: string;
  subLogo: string;
  searchPlaceholder: string;
  home: string;
  shop: string;
  about: string;
  contact: string;
  blog: string;
  myCart: string;
  wishlist: string;
  selectLanguage: string;
  allCategories: string;
  browseCatalog: string;

  // Homepage Headings
  palletSelectorTitle: string;
  palletSelectorDesc: string;
  categoriesTitle: string;
  categoriesDesc: string;
  dealsTitle: string;
  dealsDesc: string;
  trustpilotTitle: string;
  trustpilotSubtitle: string;
  blogTitle: string;
  blogSubtitle: string;
  faqTitle: string;
  faqSubtitle: string;
  viewAllPosts: string;
  readArticle: string;
  verifiedBuyer: string;
  excellent: string;
  basedOnReviews: string;
  liveUpdates: string;
  haveQuestions: string;
}

export const DICTIONARY: Record<Language, Translations> = {
  en: {
    flashSale: 'FLASH SALE: Extra 10% OFF with code OUTLET10',
    freeShipping: 'Free EU Tracked Shipping on orders over €50',
    moneyBackGuarantee: '30-Day Money-Back Guarantee',
    trackOrder: 'Track Order',
    storeTag: 'STORE',
    subLogo: "EUROPE'S LIQUIDATION & OUTLET SHOP",
    searchPlaceholder: 'Search liquidation pallets, brands (Sony, Dyson, Bosch)...',
    home: 'Home',
    shop: 'Shop',
    about: 'About',
    contact: 'Contact',
    blog: 'Blog',
    myCart: 'My Cart',
    wishlist: 'Wishlist',
    selectLanguage: 'Select Language',
    allCategories: 'All Categories',
    browseCatalog: 'Explore All Inventory',
    palletSelectorTitle: 'Direct Pallet Lot Selector (20 Lots Available)',
    palletSelectorDesc: 'Choose certified lots from our Venlo logistics hub with itemized manifests and instant checkout.',
    categoriesTitle: 'Browse Overstock Departments',
    categoriesDesc: 'Direct-from-retailer liquidations across top European consumer categories.',
    dealsTitle: 'Featured Overstock & Pallet Deals',
    dealsDesc: 'Deeply discounted single items and lots up to 80% below retail MSRP.',
    trustpilotTitle: 'Real-Time Customer Reviews',
    trustpilotSubtitle: 'Verified feedback from European resellers, retail store owners, and liquidation buyers.',
    blogTitle: 'Liquidation Insights & Reselling Guides',
    blogSubtitle: 'Expert operational advice on purchasing, grading, and flipping wholesale consumer goods.',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about pallet condition, freight delivery, and purchasing.',
    viewAllPosts: 'View All Guides & Insights',
    readArticle: 'Read Full Guide',
    verifiedBuyer: 'Verified Purchaser',
    excellent: 'Excellent',
    basedOnReviews: 'Based on 1,840+ European reviews',
    liveUpdates: 'Live Feed • Real-time updates',
    haveQuestions: 'Still have questions? Our Venlo support team is ready to help.'
  },
  de: {
    flashSale: 'BLITZ-ANGEBOT: Extra 10% RABATT mit Code OUTLET10',
    freeShipping: 'Kostenloser EU-Versand mit Sendungsverfolgung ab 50 €',
    moneyBackGuarantee: '30 Tage Geld-zurück-Garantie',
    trackOrder: 'Bestellung verfolgen',
    storeTag: 'SHOP',
    subLogo: 'EUROPAS RESTPOSTEN- & LIQUIDATIONS-OUTLET',
    searchPlaceholder: 'Paletten & Marken suchen (Sony, Dyson, Bosch)...',
    home: 'Startseite',
    shop: 'Sortiment',
    about: 'Über uns',
    contact: 'Kontakt',
    blog: 'Ratgeber',
    myCart: 'Warenkorb',
    wishlist: 'Merkliste',
    selectLanguage: 'Sprache wählen',
    allCategories: 'Alle Kategorien',
    browseCatalog: 'Gesamtes Inventar entdecken',
    palletSelectorTitle: 'Direkte Palettenauswahl (20 Paletten verfügbar)',
    palletSelectorDesc: 'Wählen Sie zertifizierte Paletten aus unserem Venlo-Hub mit detaillierter Stückliste.',
    categoriesTitle: 'Nach Überhangwaren-Kategorien stöbern',
    categoriesDesc: 'Direkte Händler-Restposten aus führenden europäischen Verbraucherkategorien.',
    dealsTitle: 'Aktuelle Restposten- & Paletten-Angebote',
    dealsDesc: 'Einzelartikel und Paletten mit bis zu 80% Rabatt unter der Hersteller-UVP.',
    trustpilotTitle: 'Echte Kundenbewertungen in Echtzeit',
    trustpilotSubtitle: 'Verifiziertes Feedback von europäischen Wiederverkäufern und Händlern.',
    blogTitle: 'Restposten-Einblicke & Wiederverkaufs-Tipps',
    blogSubtitle: 'Expertenwissen zu Einkauf, Zustandskontrolle und gewinnbringendem Weiterverkauf.',
    faqTitle: 'Häufig gestellte Fragen (FAQ)',
    faqSubtitle: 'Alles über Warenzustand, Speditionsversand und den Einkauf ab Venlo.',
    viewAllPosts: 'Alle Artikel & Ratgeber ansehen',
    readArticle: 'Vollständigen Beitrag lesen',
    verifiedBuyer: 'Verifizierter Käufer',
    excellent: 'Hervorragend',
    basedOnReviews: 'Basierend auf über 1.840 Bewertungen',
    liveUpdates: 'Live-Feed • Echtzeit-Synchronisation',
    haveQuestions: 'Haben Sie Fragen? Unser Support-Team in Venlo hilft Ihnen gerne.'
  },
  fr: {
    flashSale: 'VENTE FLASH : 10% de réduction en plus avec le code OUTLET10',
    freeShipping: 'Livraison suivie offerte dans toute l’UE dès 50 €',
    moneyBackGuarantee: 'Garantie satisfait ou remboursé 30 jours',
    trackOrder: 'Suivi de commande',
    storeTag: 'MAGASIN',
    subLogo: 'LE DÉSTOCKAGE & OUTLET N°1 EN EUROPE',
    searchPlaceholder: 'Rechercher palettes, marques (Sony, Dyson, Bosch)...',
    home: 'Accueil',
    shop: 'Boutique',
    about: 'À propos',
    contact: 'Contact',
    blog: 'Conseils & Blog',
    myCart: 'Mon Panier',
    wishlist: 'Favoris',
    selectLanguage: 'Choisir la langue',
    allCategories: 'Toutes les catégories',
    browseCatalog: 'Découvrir tout le catalogue',
    palletSelectorTitle: 'Sélecteur Direct de Palettes (20 Lots Disponibles)',
    palletSelectorDesc: 'Sélectionnez des lots certifiés depuis notre hub de Venlo avec manifestes détaillés.',
    categoriesTitle: 'Parcourir les Rayons Déstockage',
    categoriesDesc: 'Surstocks directs de distributeurs dans les plus grandes catégories grand public.',
    dealsTitle: 'Offres Vedettes & Lots de Palettes',
    dealsDesc: 'Produits et lots remisés jusqu’à -80% par rapport au prix public conseillé.',
    trustpilotTitle: 'Avis Clients Trustpilot en Temps Réel',
    trustpilotSubtitle: 'Retours authentiques de revendeurs et acheteurs professionnels européens.',
    blogTitle: 'Guides de Revente & Analyses de Déstockage',
    blogSubtitle: 'Conseils d’experts pour acheter, vérifier et revendre avec une rentabilité maximale.',
    faqTitle: 'Foire Aux Questions (FAQ)',
    faqSubtitle: 'Tout ce que vous devez savoir sur la qualité, la livraison et nos garanties.',
    viewAllPosts: 'Voir tous les guides & articles',
    readArticle: 'Lire l’article complet',
    verifiedBuyer: 'Acheteur Vérifié',
    excellent: 'Excellent',
    basedOnReviews: 'Basé sur plus de 1 840 avis vérifiés',
    liveUpdates: 'Flux en direct • Mises à jour en direct',
    haveQuestions: 'Vous avez des questions ? Notre équipe à Venlo est à votre écoute.'
  }
};

/**
 * Mock Translation Service Helper
 * Maps string keys to translated values based on active language.
 */
export const mockTranslate = (key: keyof Translations, lang: Language | string = 'en'): string => {
  const safeLang: Language = (lang === 'de' || lang === 'fr' || lang === 'en') ? (lang as Language) : 'en';
  const dict = DICTIONARY[safeLang] || DICTIONARY.en;
  return dict[key] || DICTIONARY.en[key] || key;
};
