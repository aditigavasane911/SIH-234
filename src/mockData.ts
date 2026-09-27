import { FoodBatch, AppAlert, RedistributionTicket, LeaderboardEntry, SubscriptionPlan } from './types';

export const INITIAL_BATCHES: FoodBatch[] = [
  {
    id: 'batch-1',
    batchNumber: 'CR-882',
    title: 'Cooked Basmati Rice & Lentils',
    category: 'Cooked Meals',
    volumeKg: 45,
    aiFreshnessScore: 94,
    shelfLifeRemainingHours: 13,
    storageTempC: 3.2,
    targetTempC: 4.0,
    preparationTime: 'Today, 11:30 AM',
    status: 'matched',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxrmg1n_1BdPUulYQrcBYE9DrUl5AWJDi5pII1atAS_HoFMfShQtcKgo_NcY287fq0feaMGBXNqbfNe0wSwMEMB5xdwupFz3w_gR0YPvGUVGRorxrPrIfZ9Wt9fBkihCUf06qw8Iy67xGgV9R45ODMIiNb46pJVdCfwDCiqsA0p_mYVxOR1onFgo15h_i7Cp0F6SWXlSc688tPiwRhKhHApogq3bzHYyj5GGw2IJnSyECyrSYT6_pg',
    triageDestination: 'Annapurna Community Kitchen',
    matchedOrg: {
      id: 'org-1',
      name: 'Annapurna Community Kitchen',
      type: 'Community Kitchen',
      distanceKm: 2.8,
      matchScore: 98,
      assignedDriver: 'Ramesh (Tata Ace EV #09)',
      vehiclePlate: 'KA-51-AB-1234'
    },
    co2eAvertedKg: 72,
    otp: '4091'
  },
  {
    id: 'batch-2',
    batchNumber: 'VT-410',
    title: 'Vegetable Peels, Trimmings & Tops',
    category: 'Biomass / Trimmings',
    volumeKg: 28,
    aiFreshnessScore: 88,
    shelfLifeRemainingHours: 22,
    storageTempC: 6.8,
    targetTempC: 8.0,
    preparationTime: 'Today, 08:15 AM',
    status: 'matched',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZS-MhxhRwNueZGPhRUT-SFH7Cu4JdPrxEaJ9MTlue8PKpKIqi2zAMZ9xnwNu6eqIZkFZwQ_OeyGH5GWNqkJWq9ktE_fMiDDtsgljg4bhjXUMTQDcliE3Xn22SUFq3X_Yc-XBdkgQryqs1HmibVDHiUrFR7LZAa9s7Iie4e_21LYTp1LLbVnDP8zb3seJ9Rm-jrQj09N47-rn_HlEE5h9aziwfuwv8ztWtMZ3rzFE9W7AatZngGy97',
    triageDestination: 'GreenCycle Biogas (Digester #3)',
    matchedOrg: {
      id: 'org-3',
      name: 'GreenCycle Biogas Unit',
      type: 'Biogas Unit',
      distanceKm: 6.5,
      matchScore: 94,
      assignedDriver: 'Manoj (Biogas Tanker B-04)',
      vehiclePlate: 'MH-15-CD-9921'
    },
    co2eAvertedKg: 46,
    otp: '7823'
  },
  {
    id: 'batch-3',
    batchNumber: 'CK-9021',
    title: 'Sliced Bell Peppers & Crisp Greens',
    category: 'Fresh Produce',
    volumeKg: 32,
    aiFreshnessScore: 96,
    shelfLifeRemainingHours: 28,
    storageTempC: 3.4,
    targetTempC: 4.0,
    preparationTime: 'Today, 06:45 AM',
    status: 'active',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAplNx-12b4XtFOr-5oFSg5hLVjjCHE9nfT6rZlUQsiU5OLAcQCs5s7SJtuMI-d6lHorGypoEgLY60Y54RPHLac6t88dyqZCS4_PAeQe-olQQnv08vHijIw8CEs1R4vYyYD56fXypu6UKeghEblYEUvpE_jAoxhjarM1jlF_1ZeGRPz83t6aGMlIdMj8fTGN9G0fWz9iH_4rZMs4hG11PMweahwhMTXlBKytgb_JdzisXXO3y8Y4Ydt',
    triageDestination: 'Primary Kitchen Dispatch Window',
    co2eAvertedKg: 51
  },
  {
    id: 'batch-4',
    batchNumber: 'BK-105',
    title: 'Whole Wheat Pav & Multigrain Loaves',
    category: 'Bakery & Dairy',
    volumeKg: 18,
    aiFreshnessScore: 91,
    shelfLifeRemainingHours: 16,
    storageTempC: 18.0,
    targetTempC: 20.0,
    preparationTime: 'Today, 05:30 AM',
    status: 'active',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbRy-L2EWY_yeM--RWePE9HY28x_ndCB_tpju4C97p5tNwzTcjj35B5lqNh2WzpvNoBYxczowz52bMS2YYtzoDnuOOF5ZcJ8QNbQH6EObvzTTVaAt_XcBRsL07TwogUQwSy_VCCq0S8rSqwCVx6xQ3cr_OT1DXyclQmQzKRvCB-5iU1DAQiR9uuSZDgq05K4KDC5SfotgIRcfvibQJU5h4BS1FYBdCmKrMw6vlfPVMWFaYw01s7fcE',
    triageDestination: 'Shanti Shelter Child Care',
    co2eAvertedKg: 29
  }
];

export const INITIAL_TICKETS: RedistributionTicket[] = [
  {
    ticketId: 'TK-4091',
    batchId: 'batch-1',
    batchTitle: 'Cooked Basmati Rice & Lentils (45kg)',
    volumeKg: 45,
    fromKitchen: 'Indiranagar Central Institutional Kitchen',
    toOrg: 'Annapurna Community Kitchen',
    driverName: 'Ramesh Kumar',
    vehicleNumber: 'KA-51-AB-1234 (Tata Ace EV)',
    pickupBay: 'Bay 03 (Cold Chute)',
    otp: '4091',
    status: 'accepted',
    etaMinutes: 22,
    freshnessScore: 94,
    timestamp: 'Today, 12:40 PM'
  },
  {
    ticketId: 'TK-5120',
    batchId: 'batch-2',
    batchTitle: 'Vegetable Peels & Organic Tops (28kg)',
    volumeKg: 28,
    fromKitchen: 'Indiranagar Central Institutional Kitchen',
    toOrg: 'GreenCycle Biogas Unit (Digester #3)',
    driverName: 'Manoj Shinde',
    vehicleNumber: 'MH-15-CD-9921 (Clean Bio-Tanker)',
    pickupBay: 'Bay 05 (Biomass Dock)',
    otp: '7823',
    status: 'pending_acceptance',
    etaMinutes: 45,
    freshnessScore: 88,
    timestamp: 'Today, 01:10 PM'
  }
];

export const INITIAL_ALERTS: AppAlert[] = [
  {
    id: 'alert-1',
    category: 'critical',
    title: 'Cold Storage #04 Anomaly Detected',
    description: 'Temperature rose to 5.2°C (threshold: <4.0°C) in Indiranagar Central Hub. Compressor cycling check required.',
    timestamp: '12m ago',
    source: 'IoT Telemetry • Sensor CS-04',
    unread: true,
    statusBadge: 'Action Req',
    actionType: 'view_log',
    actionTargetScreen: 'kitchen_dashboard'
  },
  {
    id: 'alert-2',
    category: 'freshness',
    title: 'Shelf-Life Degradation: Cooked Rice #CR-882',
    description: 'Freshness index dropped to 82%. Urgency auto-elevated for NGO redistribution queue.',
    timestamp: '28m ago',
    source: 'Krishi AI Optic • Model v0.1',
    unread: true,
    statusBadge: '8h Left',
    actionType: 'expedite',
    actionTargetScreen: 'matched_orgs',
    relatedBatchId: 'batch-1'
  },
  {
    id: 'alert-3',
    category: 'pickup',
    title: 'Pickup Confirmed — Annapurna Kitchen',
    description: 'Driver Ramesh (Tata Ace KA-51-AB-1234) en route for 45kg Rice Batch. ETA: 22 mins at Bay 03. OTP: 4091.',
    timestamp: '45m ago',
    source: 'Redistribution Ticket #TK-4091',
    unread: true,
    statusBadge: 'En Route',
    actionType: 'track',
    actionTargetScreen: 'logistics_dashboard',
    ticketId: 'TK-4091'
  },
  {
    id: 'alert-4',
    category: 'freshness',
    title: 'Fresh Vegetable Trim Batch Verified',
    description: 'Batch #VT-410 scored fresh index grade. Auto-matched with GreenCycle Biogas unit for clean circular processing.',
    timestamp: '2h ago',
    source: 'Shift Morning Inspection',
    unread: false,
    statusBadge: 'Grade 88/100',
    actionType: 'certificate',
    actionTargetScreen: 'sustainability_dashboard'
  },
  {
    id: 'alert-5',
    category: 'critical',
    title: 'Humidity Restabilized in Bay #2',
    description: 'Relative humidity restored to optimal 85% after scheduled automated ventilation cycle purge.',
    timestamp: '3h ago',
    source: 'Auto Action • Sensor HD-209',
    unread: false,
    statusBadge: 'Resolved',
    actionType: 'resolved'
  },
  {
    id: 'alert-6',
    category: 'pickup',
    title: 'Donation Delivered: 37,125 Meals',
    description: 'Shanti Shelter verified intake of 32kg produce. 24kg CO2e offset recorded into ESG redistribution ledger.',
    timestamp: '5h ago',
    source: 'ESG Redistribution Ledger',
    unread: false,
    statusBadge: 'Impact',
    actionType: 'receipt',
    actionTargetScreen: 'sustainability_dashboard'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Taj Gateway Culinary Hub',
    type: 'Luxury Hospitality Group',
    location: 'Nashik Central',
    kgDiverted: 4210,
    percentDiverted: 99.1,
    co2eTons: 9.2,
    badge: 'Diamond Circular Steward'
  },
  {
    rank: 2,
    name: 'Indiranagar Central Institutional Kitchen',
    type: 'Corporate Dining & Cloud Facility',
    location: 'Nashik Midc',
    kgDiverted: 3840,
    percentDiverted: 98.2,
    co2eTons: 8.4,
    badge: 'Zero-Waste Champion (Tier A)',
    isCurrentUser: true
  },
  {
    rank: 3,
    name: 'Tech Mahindra Campus Cafeteria',
    type: 'IT Enterprise Cafeteria',
    location: 'Ambad IT Park',
    kgDiverted: 3210,
    percentDiverted: 97.5,
    co2eTons: 7.1,
    badge: 'Gold Sustainability Star'
  },
  {
    rank: 4,
    name: 'Symbiosis University Central Mess',
    type: 'Higher Education Dining',
    location: 'Gangapur Road',
    kgDiverted: 2890,
    percentDiverted: 96.0,
    co2eTons: 6.3,
    badge: 'Silver Circular Campus'
  },
  {
    rank: 5,
    name: 'Apollo Hospital Dietary Services',
    type: 'Healthcare Nutrition Unit',
    location: 'Dwarka Junction',
    kgDiverted: 2450,
    percentDiverted: 94.8,
    co2eTons: 5.4,
    badge: 'Bronze Community Anchor'
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Community Impact',
    price: 'Free',
    billingPeriod: 'Forever for NGOs',
    tagline: 'Basic redistribution tracking and food safety validation.',
    features: [
      'Standard AI Freshness Scanning',
      'Local NGO matching within 10km',
      'Basic Handover OTP generation',
      'Monthly meal rescue summary'
    ]
  },
  {
    id: 'institutional_green',
    name: 'Institutional Green Pro',
    price: '₹4,999',
    billingPeriod: 'per month',
    popular: true,
    tagline: 'Audit-ready ESG certification, BRSR reports & priority routing.',
    features: [
      'Everything in Community, plus:',
      'Real-time IoT Cold Storage Telemetry',
      'SEBI BRSR & Scope 3 carbon certificates',
      'Automated Bio-Digester & Composting routing',
      'Custom branded QR handover certificates',
      'Priority EV Logistics fleet dispatch'
    ]
  },
  {
    id: 'enterprise_circular',
    name: 'Enterprise Zero-Waste Grid',
    price: '₹14,999',
    billingPeriod: 'per month',
    tagline: 'For high-volume processing units, hotel chains and tech campuses.',
    features: [
      'Multi-site central management (Unlimited hubs)',
      'Dedicated ESG Sustainability Auditor review',
      'Sponsored Green Badge on public leaderboard',
      'Direct API webhook integration into ERP/SAP',
      'Guaranteed 30-min pickup SLA with cold-chain EVs',
      '24/7 Krishi AI Telemetry & emergency sensor hotline'
    ]
  }
];
