import { Product, QuizQuestion } from './types';

export const INVEGROW_PRODUCTS: Product[] = [
  {
    id: 'broad-spectrum-cbd-oils',
    name: 'Broad Spectrum CBD Oils 30 ml',
    tagline: 'First licensed cultivator & processor by the Malawian Government',
    category: 'wellness',
    description: 'Pure, GACP/GMP certified broad spectrum CBD extracts cultivated naturally under the warm Malawian sun.',
    extendedDescription: 'Harvested from Invegrow’s legal organic crops in Salima and Lilongwe, Malawi. These premium oils undergo meticulous low-temperature ethanol extraction in GACP/GMP certified facilities to isolate active cannabinoids, ensuring a completely non-psychoactive relief profile conforming highly to South African pharmaceutical regulations. Available in 300mg and 600mg formulations (with a potent 1200mg selection coming soon).',
    benefits: [
      'GACP/GMP Certified cultivation & processing standards',
      'Provides daily nervous system calming and anxiety relief',
      'Promotes robust, restful sleep cycle optimization'
    ],
    dosage: 'Standard Dosage: Draw 5–10 drops (Approx. 10mg - 20mg) under your tongue. Hold for 60 seconds before swallowing.',
    ingredients: ['Broad Spectrum Malawian Hemp Flower Extract', 'Cold-Pressed Hemp Seed Carrier Oil'],
    size: '30ml (300mg / 600mg Options)',
    priceZAR: 390,
    rating: 4.9,
    reviewsCount: 186,
    imageUrl: '/invegrow_cbd_tinctures.png',
    inStock: true
  },
  {
    id: 'delicious-cbd-honey',
    name: 'Delicious CBD Hemp Honey 500g',
    tagline: 'Mineral-rich Malawi wild honey infused with active CBD',
    category: 'wellness',
    description: 'Gold-standard Malawian honey natively infused with 200mg of broad-spectrum CBD per 500g jar.',
    extendedDescription: 'Fully licensed Malawi-made product combining the natural minerals of local wildflower nectars with the comforting, restorative properties of high-altitude broad-spectrum cannabidiol extract. Pure wellness in every single spoonful.',
    benefits: [
      'Rich in beneficial natural organic minerals & enzymes',
      'Infused with 200mg CBD per jar to promote cellular calmness',
      'Perfect raw sugar alternative for immune supplementation'
    ],
    dosage: 'Stir 1–2 teaspoons into warm herbal teas, oatmeal, or take directly by mouth as a morning restorative.',
    ingredients: ['Organic Wild Malawian Meadow Honey', 'Broad Spectrum Cannabidiol (CBD)'],
    size: '500g Glass Jar',
    priceZAR: 295,
    rating: 4.9,
    reviewsCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'relaxing-cbd-herbal-tea',
    name: 'Relaxing CBD Herbal Tea 50g',
    tagline: 'A mild and delicious infusion of CBD-rich hemp leaves',
    category: 'wellness',
    description: 'Slow-dried raw hemp foliage and herbal flowers crafted to promote deep sleep and significantly reduce daily stress.',
    extendedDescription: 'A fully licensed Malawi-made product consisting of hand-harvested hemp foliage. Rich in antioxidants and calming hemp compounds, this fragrant caffeine-free organic nightcap naturally eases bedtime overthinking and relaxes the physical body.',
    benefits: [
      'Encourages immediate nervous system relaxation',
      'Rich in biological flavonoids & natural antioxidants',
      '100% caffeine-free botanical nightcap protocol'
    ],
    dosage: 'Steep 1–2 teaspoons in 85°C hot water for 5 to 7 minutes. Sip slowly before your evening wind-down.',
    ingredients: ['Young Green Hemp Flower Foliage & Calyxes', 'Lemongrass Leaves'],
    size: '50g Box',
    priceZAR: 110,
    rating: 4.8,
    reviewsCount: 78,
    imageUrl: '/invegrow_cbd_tea.png',
    inStock: true
  },
  {
    id: 'hearty-hemp-shelled-seeds',
    name: 'Hearty Hemp Shelled Seeds 500g',
    tagline: 'Rich, nutty, easily digestible raw superfood seeds',
    category: 'nutrition',
    description: 'Premium dehulled raw hemp seed hearts loaded with raw complete protein, zinc, and bioavailable magnesium.',
    extendedDescription: 'These legal, Malawian-grown hemp seeds are safely shelled at low temperatures to protect the fatty acids. A perfect plant-based complete protein containing all nine essential amino acids. Deliciously creamy with a flavor reminiscent of pine nuts or sunflower seeds.',
    benefits: [
      'Dense in essential dietary trace minerals (Magnesium, Zinc, Iron)',
      'High protein, easily digestible raw food source for lean muscle',
      'Provides crash-free stamina and sustainable mental performance'
    ],
    dosage: 'Scoop 2–3 tablespoons over breakfast muesli, fruit bowls, yogurt, salads, or blend into homemade seed milk.',
    ingredients: ['100% Raw Shelled Industrial Hemp Seed Hearts'],
    size: '500g Eco-Pouch',
    priceZAR: 195,
    rating: 5.0,
    reviewsCount: 112,
    imageUrl: '/invegrow_shelled_seed.jpg',
    inStock: true,
    nutritionFacts: {
      servingSize: '30g',
      calories: '180 kcal',
      protein: '10g',
      fat: '15g',
      omega3: '3.0g',
      omega6: '9.0g',
      fiber: '1.2g'
    }
  },
  {
    id: 'nutritious-hemp-protein-powder',
    name: 'Nutritious Hemp Protein Powder 500g',
    tagline: 'High protein plant-based dietary power source',
    category: 'nutrition',
    description: 'Milled complete vegan protein to support optimal physical health, immunity, and clean muscle mass.',
    extendedDescription: 'Produced by gently extracting seed oils, then stone-milling the remaining seed cake at low temperatures. A high-protein, fiber-rich supplement that avoids the whey bloating commonly caused by conventional dairy powders. Hypoallergenic and highly bioavailable.',
    benefits: [
      'Hypoallergenic complete protein with 9 essential amino acids',
      'Substantial prebiotic insoluble dietary fiber to soothe digestion',
      'Excellent iron and performance mineral densities'
    ],
    dosage: 'Blend 2-3 tablespoons into smoothies, pre-workout shakes, oats, or use as a protein flour substitute in healthy baking.',
    ingredients: ['100% Pure Mechanical Stone-Milled Hemp Seed Protein Cake'],
    size: '500g Eco-Pouch',
    priceZAR: 240,
    rating: 4.8,
    reviewsCount: 135,
    imageUrl: '/invegrow_product_range.jpg',
    inStock: true,
    nutritionFacts: {
      servingSize: '30g',
      calories: '110 kcal',
      protein: '15g',
      fat: '3g',
      fiber: '8g',
      iron: '35% RDA'
    }
  },
  {
    id: 'culinary-hemp-seed-oil',
    name: 'Culinary Hemp Seed Oil 250 ml',
    tagline: 'A natural cold-pressed oil rich in Omegas 3 & 6',
    category: 'nutrition',
    description: 'Velvety, expeller-pressed culinary oil for managing healthy cholesterol levels and maintaining heart health.',
    extendedDescription: '100% pure cold-pressed oil from Malawian-grown hemp seeds. Never exposed to chemical solvents or heat, maintaining its high-quality polyunsaturated essential fatty acids. Boasts the perfect 3:1 ratio of Omega-6 to Omega-3 required for human biome health.',
    benefits: [
      'Assists with healthy cholesterol and long-term cardiovascular support',
      'Supports brain function and metabolic cellular energy',
      'Extremely rich culinary alternative for raw dressings'
    ],
    dosage: 'Enjoy 1-2 tablespoons raw daily. Drizzle over fresh salads, pasta, hummus, or soups. (Do not heat above smoking point/fry).',
    ingredients: ['100% Pure Raw Cold-Pressed Industrial Hemp Seed Oil'],
    size: '250ml Glass Bottle',
    priceZAR: 150,
    rating: 4.9,
    reviewsCount: 86,
    imageUrl: '/invegrow_hemp_seed_oil.png',
    inStock: true,
    nutritionFacts: {
      servingSize: '1 Tablespoon (15ml)',
      calories: '120 kcal',
      protein: '0g',
      fat: '14g',
      omega3: '2.5g',
      omega6: '7.5g'
    }
  },
  {
    id: 'cosmetic-hair-body-oil',
    name: 'Hemp Seed Hair & Body Oil 250ml',
    tagline: 'Cosmetic grade, heavy-lipid hydration treatment',
    category: 'skincare',
    description: 'Deeply moisturizing treatment for dry skin, hair, and locks. Nourishes directly at the follicle level.',
    extendedDescription: 'Cosmetic-grade, Malawi-made pure hemp seed oil naturally abundant in protective essential fatty acids and natural Vitamin E. Absorbs beautifully without clogging pores to soothe dry dermal barriers, restore scalp flexibility, and add natural shine to dry hair.',
    benefits: [
      'Instantly hydrates parched skin cells & dry hair',
      'Naturally high in Vitamin E and soothing lipids',
      'Creates a breathable moisture barrier on hair and body'
    ],
    dosage: 'Apply a few drops directly to damp skin after bathing, or massage directly into scalp and hair shafts as a nourishing hair mask.',
    ingredients: ['100% Pure Cosmetic-Grade Cold-Pressed Industrial Hemp Seed Oil'],
    size: '250ml Flip Bottle',
    priceZAR: 85,
    rating: 4.7,
    reviewsCount: 64,
    imageUrl: '/invegrow_hair_body_oil.png',
    inStock: true
  },
  {
    id: 'amari-cbd-topical-balm',
    name: 'Amari CBD Topical Balm 50ml',
    tagline: 'Deep soothing recovery for dry, irritated skin & joints',
    category: 'skincare',
    description: 'A deeply nourishing skin ointment rich in high-potency CBD to help your skin find natural balance.',
    extendedDescription: 'A fully licensed Malawi-made product combining Invegrow cold-pressed hemp seed oil, unrefined African shea butter, organic therapeutic herbs, and broad spectrum cannabidiol. Ideal for soothing dry target zones, eczema-prone skin, and tired over-exercised joints.',
    benefits: [
      'Eases dry spots, skin scaling, and epidermal itching',
      'Provides intense local moisture lock with unrefined Shea Butter',
      'Supports target recovery for sore joints and stiff muscles'
    ],
    dosage: 'Warm a pea-sized draft of balm between fingers and rub gently into dry areas or sore muscle clusters until fully absorbed.',
    ingredients: ['Invegrow Cold-Pressed Hemp Seed Oil', 'Broad Spectrum Cannabidiol', 'Raw African Shea Butter', 'Natural Beeswax', 'Eucalyptus & Peppermint Botanical Oils'],
    size: '50ml Glass Jar',
    priceZAR: 160,
    rating: 4.9,
    reviewsCount: 122,
    imageUrl: '/invegrow_crude_oil.jpg',
    inStock: true
  },
  {
    id: 'cbd-smoking-flower-blue-monkey',
    name: 'CBD Smoking Flowers (Blue Monkey) 5g',
    tagline: 'Premium outdoor-cultivated, non-psychoactive blooms',
    category: 'wellness',
    description: 'Hemp flower buds rich in relaxing cannabidiol, grown in outdoor Malawian sunshine and dried to pristine freshness.',
    extendedDescription: 'Meticulously grown under high-altitude, carbon-negative agriculture and slow-cured for complete terpene preservation. Containing under 0.001% THC, these certified flowers are totally non-psychoactive and mainly produced within GMP criteria.',
    benefits: [
      'Grown naturally in Salima & Lilongwe with zero pesticides',
      'Rich in complete range of botanical terpenes and CBD',
      'Strictly non-psychoactive with certified laboratory assay profiles'
    ],
    dosage: 'For authorized vaporization or botanical infusion use according to domestic South African wellness frameworks.',
    ingredients: ['100% Cured Non-Psychoactive Female Industrial Hemp Flowers'],
    size: '5g Sealed Jar',
    priceZAR: 245,
    rating: 4.9,
    reviewsCount: 47,
    imageUrl: 'https://images.unsplash.com/photo-1538610113083-090623e1ca87?auto=format&fit=crop&w=600&q=80',
    inStock: true
  }
];

export interface JourneyStage {
  id: number;
  title: string;
  source: string;
  description: string;
  metric: string;
  iconName: string;
}

export const SOIL_TO_BOTTLE_JOURNEY: JourneyStage[] = [
  {
    id: 1,
    title: 'GACP Legal Sowing',
    source: 'Lilongwe Farm Plains',
    description: 'Invegrow, Malawi’s historic first licensed grower and processor, sows legal organic seeds under strict GACP/GMP certified farming guidelines.',
    metric: 'First Malawi License (Est. 2013)',
    iconName: 'Sprout'
  },
  {
    id: 2,
    title: 'Equatorial Sun Curing',
    source: 'Salima Cultivation Valleys',
    description: 'Flowered plants ripen naturally under direct, warm sub-Saharan equatorial sunshine, irrigated by tropical rainfall and monitored closely by field agronomists.',
    metric: '100% Pesticide-Free Cultivation',
    iconName: 'Sun'
  },
  {
    id: 3,
    title: 'GACP / GMP Cold Squeezing',
    source: 'Invegrow Processing Lab',
    description: 'Cured seeds and flower heads are mechanically pressed at cold temperatures or ethanol-extracted in a GMP certified modern facility, maintaining lipid molecular chains.',
    metric: 'Woman-Founded & Led Business',
    iconName: 'Cpu'
  },
  {
    id: 4,
    title: 'Earthcure SA Lab Bottling',
    source: 'Cape Town ISO Labs',
    description: 'Imported legally under strict SA Health (DOH) regulations, every batch undergoes thorough dual-lab HPLC purity checks before placement in UV-blocking glass.',
    metric: '< 0.001% THC (Non-Psychoactive Approved)',
    iconName: 'FlaskConical'
  },
  {
    id: 5,
    title: 'Speed courier delivery',
    source: 'Johannesburg & Western Cape Hubs',
    description: 'Every order is secured in recycled paper packing cartons and dispatched via swift express door couriers anywhere across RSA within 2–4 business days.',
    metric: 'Free SA Courier over R500',
    iconName: 'Truck'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'What is your primary wellness or physical focus today?',
    category: 'focus',
    options: [
      { text: 'Anxiety relief, calming active thoughts & immune health', value: 'wellness', description: 'Seeking calm, peace, and natural nerve unwinding.' },
      { text: 'Daily plant proteins, digestive health & energy balance', value: 'nutrition', description: 'Looking to boost daily nutrition, heart vitality, and complete proteins.' },
      { text: 'Eczema relief, deeper skin moisturization & joint recovery', value: 'skincare', description: 'Targeting dry patches, dermatitis, or tight muscle recovery.' }
    ]
  },
  {
    id: 2,
    text: 'How do you prefer to include botanicals in your daily schedule?',
    category: 'method',
    options: [
      { text: 'Placing oil drops under my tongue or adding extracts in meals', value: 'drops', description: 'Fast-absorbing, pure targeted dosage.' },
      { text: 'Mixing complete clean protein powder or superfood seeds in breakfasts', value: 'powders', description: 'Filling, nutritious botanical dietary fuel.' },
      { text: 'Brewing a warm, fragrant botanical infusion in evenings', value: 'tea', description: 'A peaceful end-of-day sleep preparation ritual.' }
    ]
  },
  {
    id: 3,
    text: 'What describes your experience level with industrial hemp products?',
    category: 'experience',
    options: [
      { text: 'Complete beginner - I want gentle, safe, and easily manageable options', value: 'beginner', description: 'We will recommend gentle startup ratios.' },
      { text: 'Restorative practitioner - I recognize the value of active phytocannabinoids', value: 'intermediate', description: 'We will suggest higher-strength therapeutic grades.' }
    ]
  }
];
