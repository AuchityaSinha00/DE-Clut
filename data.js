const categories = {
  "home-essentials": {
    name: "Home Essentials",
    intro: "Everyday helpers for setting up a practical home fast.",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
    items: [
      ["Steam Irons", "Wrinkle-free clothes without buying another appliance.", "From Rs. 49/day"],
      ["Room Heaters", "Compact heating for winter rooms and short stays.", "From Rs. 89/day"],
      ["Cookware Sets", "Pots, pans, and everyday cooking basics.", "From Rs. 79/day"],
      ["Cleaning Kits", "Vacuum cleaners, mops, brushes, and deep-clean packs.", "From Rs. 59/day"],
      ["Storage Organizers", "Boxes, racks, hangers, and closet helpers.", "From Rs. 39/day"],
      ["Quick Setup Bundles", "Move-in starter sets for bedrooms and rented flats.", "From Rs. 199/day"],
    ],
  },
  furniture: {
    name: "Furniture",
    intro: "Comfortable pieces for homes, work corners, guest rooms, and temporary stays.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    items: [
      ["Sofas", "Two-seaters, loungers, and compact living-room seating.", "From Rs. 249/day"],
      ["Beds", "Single, queen, and guest bed rental options.", "From Rs. 299/day"],
      ["Work Desks", "Study and work tables for daily productivity.", "From Rs. 149/day"],
      ["Dining Sets", "Tables and chairs for family meals or hosting.", "From Rs. 229/day"],
      ["Shelves", "Bookcases, utility racks, and display units.", "From Rs. 99/day"],
      ["Move-in Bundles", "Bedroom, living room, and study room sets.", "From Rs. 599/day"],
    ],
  },
  electronics: {
    name: "Electronics",
    intro: "Useful tech for work, entertainment, connectivity, and events.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    items: [
      ["Laptops", "Work, study, and project-ready laptops.", "From Rs. 399/day"],
      ["Monitors", "Extra screens for workstations and gaming.", "From Rs. 199/day"],
      ["Speakers", "Bluetooth speakers and soundbars for rooms or events.", "From Rs. 129/day"],
      ["Routers", "Wi-Fi routers and extenders for temporary connections.", "From Rs. 79/day"],
      ["Gaming Consoles", "Console rentals for weekends and house parties.", "From Rs. 499/day"],
      ["Chargers & Adapters", "Power banks, adapters, and cable kits.", "From Rs. 39/day"],
    ],
  },
  carpets: {
    name: "Carpets & Rugs",
    intro: "Soft surfaces and statement textures for rooms, events, and staging.",
    image:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80",
    items: [
      ["Area Rugs", "Warm up bedrooms and living rooms instantly.", "From Rs. 119/day"],
      ["Runners", "Hallway and entryway rug rentals.", "From Rs. 69/day"],
      ["Event Carpets", "Large-format carpets for functions and pop-ups.", "From Rs. 349/day"],
      ["Washable Mats", "Easy-care mats for kitchens, baths, and doors.", "From Rs. 39/day"],
      ["Statement Textures", "Premium patterns for decor shoots and hosting.", "From Rs. 179/day"],
      ["Kids Play Mats", "Soft floor mats for play zones and family stays.", "From Rs. 89/day"],
    ],
  },
  edibles: {
    name: "Branded Edibles",
    intro: "Sealed, packaged pantry and snack supplies for temporary homes and events.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    items: [
      ["Snack Boxes", "Sealed branded snack packs for groups and stays.", "From Rs. 149/box"],
      ["Pantry Staples", "Rice, flour, pulses, oil, and basic sealed supplies.", "From Rs. 299/kit"],
      ["Beverage Crates", "Tea, coffee, juices, and soft drink packs.", "From Rs. 199/crate"],
      ["Breakfast Kits", "Cereal, spreads, oats, and quick breakfast bundles.", "From Rs. 179/kit"],
      ["Party Packs", "Packaged treats and hosting-ready food bundles.", "From Rs. 399/pack"],
      ["Monthly Grocery Kits", "Curated branded supplies for longer stays.", "From Rs. 999/kit"],
    ],
  },
  decor: {
    name: "Decor & Lighting",
    intro: "Make a temporary space feel finished without storing decor forever.",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80",
    items: [
      ["Table Lamps", "Warm lighting for desks, bedsides, and corners.", "From Rs. 69/day"],
      ["Mirrors", "Full-length and accent mirrors for rooms.", "From Rs. 99/day"],
      ["Planters", "Indoor plant stands, pots, and artificial greenery.", "From Rs. 49/day"],
      ["Wall Art", "Framed prints and removable decor sets.", "From Rs. 79/day"],
      ["Festive Decor", "Seasonal lights, hangings, and celebration kits.", "From Rs. 199/day"],
      ["Mood Lighting", "LED strips, floor lamps, and ambient light kits.", "From Rs. 89/day"],
    ],
  },
  laundry: {
    name: "Laundry & Care",
    intro: "Laundry appliances and garment-care tools for clean daily living.",
    image:
      "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1200&q=80",
    items: [
      ["Washing Machines", "Top-load and compact machines for rented homes.", "From Rs. 299/day"],
      ["Steamers", "Garment steamers for daily wear and events.", "From Rs. 79/day"],
      ["Dryers", "Portable dryers and drying stands.", "From Rs. 149/day"],
      ["Garment Racks", "Clothing racks for rooms and boutiques.", "From Rs. 59/day"],
      ["Fabric-care Tools", "Lint removers, irons, and care kits.", "From Rs. 49/day"],
      ["Laundry Baskets", "Sorters, hampers, and utility baskets.", "From Rs. 29/day"],
    ],
  },
  kitchen: {
    name: "Kitchen & Dining",
    intro: "Cooking, serving, and dining gear for daily meals or one-time hosting.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    items: [
      ["Cooktops", "Induction, gas, and portable cooking units.", "From Rs. 129/day"],
      ["Mixers", "Mixer-grinders and blenders for everyday cooking.", "From Rs. 99/day"],
      ["Dinnerware", "Plates, bowls, glasses, and cutlery sets.", "From Rs. 79/day"],
      ["Coffee Makers", "French press, drip, and espresso-style machines.", "From Rs. 149/day"],
      ["Juicers", "Cold press and citrus juicers for short stays.", "From Rs. 99/day"],
      ["Party Serveware", "Trays, dispensers, chafing dishes, and serving sets.", "From Rs. 199/day"],
    ],
  },
  work: {
    name: "Work & Study",
    intro: "Build a focused desk setup for exams, remote work, or short projects.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    items: [
      ["Office Chairs", "Ergonomic chairs for work-from-home comfort.", "From Rs. 129/day"],
      ["Study Desks", "Compact desks for rooms and student housing.", "From Rs. 119/day"],
      ["Task Lamps", "Focused lighting for reading and late work.", "From Rs. 49/day"],
      ["Monitors", "Productivity screens for laptops and desktops.", "From Rs. 199/day"],
      ["Whiteboards", "Planning boards for study, teams, and tutoring.", "From Rs. 89/day"],
      ["Focus Kits", "Desk, chair, lamp, and organizer bundles.", "From Rs. 299/day"],
    ],
  },
};

window.deClutCategories = categories;
