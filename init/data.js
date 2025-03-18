const sampleListings = [
  {
    "title": "Cozy Beachfront Cottage",
    "description": "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    "image": {
      "filename": "beachfront_cottage",
      "url": "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 1500,
    "location": "Malibu",
    "country": "United States"
  },
  {
    "title": "Luxury Villa with Infinity Pool",
    "description": "Indulge in luxury at this modern villa with a private infinity pool overlooking the ocean.",
    "image": {
      "filename": "luxury_villa_infinity",
      "url": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    "price": 5000,
    "location": "Santorini",
    "country": "Greece"
  },
  {
    "title": "Secluded Mountain Cabin",
    "description": "A rustic mountain retreat surrounded by pine forests and breathtaking views.",
    "image": {
      "filename": "mountain_cabin",
      "url": "https://images.unsplash.com/photo-1474690870540-30096cc14db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    "price": 1200,
    "location": "Aspen",
    "country": "United States"
  },
  {
    "title": "Charming Italian Countryside Villa",
    "description": "Relax in the heart of Tuscany in this beautiful countryside villa with rolling vineyard views.",
    "image": {
      "filename": "italian_villa",
      "url": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    "price": 3200,
    "location": "Tuscany",
    "country": "Italy"
  },
  {
    "title": "Modern Loft in Downtown New York",
    "description": "Experience city life in this stylish loft with stunning skyline views.",
    "image": {
      "filename": "nyc_loft",
      "url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    "price": 2500,
    "location": "New York City",
    "country": "United States"
  },
  {
    "title": "Private Island Paradise",
    "description": "Have an entire island to yourself for the ultimate luxury vacation.",
    "image": {
      "filename": "private_island",
      "url": "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    "price": 10000,
    "location": "Fiji",
    "country": "Fiji"
  },
  {
    "title": "Ski Lodge in the Alps",
    "description": "Hit the slopes in this cozy ski lodge with a fireplace and hot tub.",
    "image": {
      "filename": "ski_lodge",
      "url": "https://images.unsplash.com/photo-1519052537078-e6302a4968d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    "price": 3500,
    "location": "Swiss Alps",
    "country": "Switzerland"
  },
  {
    "title": "Beach House in Bali",
    "description": "Wake up to the sound of waves in this tropical beachfront house.",
    "image": {
      "filename": "bali_beachhouse",
      "url": "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    "price": 1800,
    "location": "Bali",
    "country": "Indonesia"
  },
  {
    "title": "Historic Castle in Scotland",
    "description": "Live like royalty in this historic Scottish castle with medieval charm.",
    "image": {
      "filename": "scottish_castle",
      "url": "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    "price": 4000,
    "location": "Edinburgh",
    "country": "United Kingdom"
  },
  {
    "title": "Tropical Villa in Phuket",
    "description": "Relax in this luxurious Thai villa with a private pool and ocean views.",
    "image": {
      "filename": "phuket_villa",
      "url": "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    "price": 3000,
    "location": "Phuket",
    "country": "Thailand"
  },
  {
    "title": "Lake Cabin Retreat",
    "description": "Unplug and unwind in this peaceful lakeside cabin surrounded by nature.",
    "image": {
      "filename": "lake_cabin",
      "url": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    "price": 1300,
    "location": "Lake Tahoe",
    "country": "United States"
  },
  {
    "title": "Modern Penthouse in Dubai",
    "description": "Stay in a luxury high-rise penthouse with panoramic city views.",
    "image": {
      "filename": "dubai_penthouse",
      "url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    "price": 5500,
    "location": "Dubai",
    "country": "United Arab Emirates"
  }
];

  
  module.exports = { data: sampleListings };