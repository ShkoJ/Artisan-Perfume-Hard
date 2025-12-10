// =========================================================================
// --- DATA FILE: CUSTOM PRIORITY SORTED ---
// =========================================================================

export const initialPerfumes = [
    // --- TOP 6 PRIORITY (ALL & MEN'S VIEW) ---
    { id: 29, name: "Supremacy Collector's Edition", brand: "Afnan", priceIQD: 60000, category: "men", image: "supremacy_collector.jpeg", 
      description: "Exclusive pineapple and white flowers with oakmoss ambergris. Regal collector's masterpiece.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Exclusive Pineapple Flowers",
      topNotes: "Pineapple, Bergamot, White Flowers", middleNotes: "Orange Blossom, Birch, Amber", bottomNotes: "Oakmoss, Musk, Ambergris"
    },
    { id: 27, name: "Liquid Brun", brand: "French Avenue", priceIQD: 50000, category: "unisex", image: "liquid.jpeg", 
      description: "Warm cinnamon-cognac with buttery praline woods. Decadent French indulgence.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Floral",
      shortDescription: "Warm Cinnamon Cognac",
      topNotes: "Cinnamon, Orange Blossom, Cardamom", middleNotes: "Bourbon Vanilla, Elemi Resin", bottomNotes: "Praline, Ambroxan, Guaiac Wood"
    },
    { id: 33, name: "Turathi Blue", brand: "Afnan", priceIQD: 45000, category: "men", image: "Turathi.jpeg", 
      description: "Bright citrus freshness with amber-woody musk. Coastal elegant versatility.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Aquatic",
      shortDescription: "Bright Citrus Freshness",
      topNotes: "Citrus", middleNotes: "Amber, Woody Notes", bottomNotes: "Musk, Spices, Patchouli"
    },
    { id: 38, name: "Badee Al Oud Oud For Glory", brand: "Lattafa", priceIQD: 35000, category: "men", image: "BadeeOudForGlory.jpeg", 
      description: "Dark, majestic oud with sweet saffron and patchouli. A powerful statement scent.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Evening_Woody",
      shortDescription: "Majestic Oud Saffron",
      topNotes: "Saffron, Nutmeg, Lavender", middleNotes: "Agarwood (Oud), Patchouli", bottomNotes: "Agarwood (Oud), Patchouli, Musk"
    },
    { id: 36, name: "Asad", brand: "Lattafa", priceIQD: 30000, category: "men", image: "Asad.jpeg", 
      description: "A signature masculine fragrance blending spicy black pepper with tobacco and warm vanilla woods.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Evening_Woody",
      shortDescription: "Spicy Black Pepper",
      topNotes: "Black Pepper, Tobacco, Pineapple", middleNotes: "Patchouli, Coffee, Iris", bottomNotes: "Vanilla, Amber, Dry Wood, Benzoin"
    },
    { id: 43, name: "Vintage Radio", brand: "Lattafa", priceIQD: 50000, category: "men", image: "VintageRadio.jpeg", 
      description: "A unique, calming blend of plum and palo santo wood. Nostalgic yet modern.", 
      longevity: "Long Lasting", sillage: "Medium", profile: "Anytime_Woody",
      shortDescription: "Plum Palo Santo",
      topNotes: "Lavender, Sage, Bergamot", middleNotes: "Plum, Palo Santo", bottomNotes: "Sandalwood, Oud"
    },

    // --- PRIORITY WOMEN'S (Placed here to appear early when filtering for Women) ---
    { id: 31, name: "Teriaq Intense", brand: "Lattafa", priceIQD: 50000, category: "women", image: "Teriaq.jpeg", 
      description: "Luxurious saffron-plum with warm cinnamon tonka. Intense oriental sophistication.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Luxurious Saffron Plum",
      topNotes: "Saffron, Bergamot", middleNotes: "Plum Liquor, Cinnamon", bottomNotes: "Amber, Tonka Bean, Benzoin"
    },
    { id: 11, name: "Eclair", brand: "Lattafa", priceIQD: 40000, category: "women", image: "eclaire.jpeg", 
      description: "Decadent caramel and milk with honeyed florals. Irresistible gourmand luxury.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Floral",
      shortDescription: "Decadent Caramel Milk",
      topNotes: "Caramel, Milk, Sugar", middleNotes: "Honey, White Flowers", bottomNotes: "Vanilla, Praline, Musk"
    },
    { id: 20, name: "Her Confession", brand: "Lattafa", priceIQD: 50000, category: "women", image: "her_confession.jpeg", 
      description: "Mystical cinnamon-tuberose with warm vanilla tonka. Romantic feminine expression.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Floral",
      shortDescription: "Mystical Cinnamon Tuberose",
      topNotes: "Mystikal, Cinnamon", middleNotes: "Tuberose, Jasmine, Incense", bottomNotes: "Vanilla Tonka, Musk"
    },
    // Note: Liquid Brun is already at #2 above, so it will show up here in Women's filter automatically.
    { id: 7, name: "Badee Al Oud Honor And Glory", brand: "Lattafa", priceIQD: 35000, category: "unisex", image: "badee_honor.jpeg", 
      description: "Pineapple and creme brulee with spicy cinnamon warmth. Regal and golden sophistication.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Floral",
      shortDescription: "Pineapple Creme Brulee",
      topNotes: "Pineapple, Creme Brulee", middleNotes: "Cinnamon, Turmeric, Black Pepper", bottomNotes: "Vanilla, Sandalwood Cashmeran"
    },
    { id: 41, name: "Mayar", brand: "Lattafa", priceIQD: 35000, category: "women", image: "Mayar.jpeg", 
      description: "A bright, joyful bouquet of lychee and white flowers. Feminine and uplifting.", 
      longevity: "Moderate", sillage: "Medium", profile: "Daytime_Floral",
      shortDescription: "Bright Lychee Floral",
      topNotes: "Lychee, Raspberry, Violet Leaf", middleNotes: "White Rose, Peony, Jasmine", bottomNotes: "Musk, Vanilla"
    },

    // --- REST OF CATALOG ---
    { id: 10, name: "Delilah Pour Femme", brand: "Maison Alhambra", priceIQD: 25000, category: "women", image: "delilah.jpeg", 
      description: "Romantic Turkish rose and peony with creamy vanilla musk. Feminine grace perfected.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Floral",
      shortDescription: "Turkish Rose Peony",
      topNotes: "Rhubarb, Litchi, Bergamot", middleNotes: "Turkish Rose, Peony, Lily", bottomNotes: "White Musk, Cashmeran, Vanilla"
    },
    { id: 30, name: "Supremacy Not Only Intense", brand: "Afnan", priceIQD: 60000, category: "men", image: "not_only.jpeg", 
      description: "Bold black currant and apple with intense saffron musk. Commanding modern power.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Bold Black Currant",
      topNotes: "Black Currant, Bergamot, Apple", middleNotes: "Oakmoss, Patchouli, Lavender", bottomNotes: "Ambergris, Musk, Saffron"
    },
    { id: 24, name: "Khamrah", brand: "Lattafa", priceIQD: 40000, category: "unisex", image: "Khamrah.jpeg", 
      description: "Spiced dates and praline with creamy tuberose. Sensual oriental masterpiece.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Floral",
      shortDescription: "Spiced Dates Praline",
      topNotes: "Cinnamon, Nutmeg, Bergamot", middleNotes: "Dates, Praline, Tuberose", bottomNotes: "Vanilla, Tonka Bean, Amberwood"
    },
    { id: 26, name: "Khamrah Qahwa", brand: "Lattafa", priceIQD: 40000, category: "unisex", image: "khamra_qahwa.jpeg", 
      description: "Rich coffee and cinnamon with candied fruit sweetness. Bold aromatic magnetism.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Rich Coffee Cinnamon",
      topNotes: "Cinnamon, Cardamom, Ginger", middleNotes: "Praline, Candied Fruits, White Fruits", bottomNotes: "Vanilla, Coffee, Tonka Bean"
    },
    { id: 25, name: "Khamrah Dukhan", brand: "Lattafa", priceIQD: 40000, category: "unisex", image: "khamrah_dukhan.jpeg", 
      description: "Smoky incense and spicy pimento with rich tobacco depth. Dramatic oriental intensity.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Smoky Incense Pimento",
      topNotes: "Spices, Pimento, Mandarin", middleNotes: "Incense, Labdanum, Orange Blossom", bottomNotes: "Praline, Tobacco, Amber"
    },
    { id: 1, name: "9:00 PM Rebel", brand: "Afnan", priceIQD: 40000, category: "men", image: "9 PM Rebel.jpeg", 
      description: "A bold pineapple and apple opening with warm vanilla and caramel depth. Seductive and commanding.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Bold Pineapple Apple",
      topNotes: "Pineapple, Apple, Mandarin", middleNotes: "Oakmoss, Vanilla, Cedarwood", bottomNotes: "Dry Wood, Ambergris, Caramel"
    },
    { id: 2, name: "9:00 PM", brand: "Afnan", priceIQD: 40000, category: "men", image: "9 PM.jpeg", 
      description: "Iconic apple-cinnamon warmth with creamy vanilla and amber. Timeless seduction for unforgettable nights.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Apple Cinnamon Warmth",
      topNotes: "Apple, Cinnamon, Lavender", middleNotes: "Orange Blossom, Lily-of-the-Valley", bottomNotes: "Vanilla, Tonka Bean, Amber"
    },
    { id: 37, name: "Asad Elixir", brand: "Lattafa", priceIQD: 30000, category: "men", image: "AsadElixir.jpeg", 
      description: "An intense, spicy evolution of the original with saffron and leather nuances.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Evening_Woody",
      shortDescription: "Intense Saffron Leather",
      topNotes: "Pink Pepper, Saffron, Grapefruit", middleNotes: "Tobacco, Cedar, Vanilla", bottomNotes: "Frankincense, Amber, Patchouli"
    },
    { id: 18, name: "Hawas Ice", brand: "Al Rasasi", priceIQD: 35000, category: "men", image: "hawas_ice.jpeg", 
      description: "Icy lemon and apple with cool cardamom freshness. Dynamic chilled confidence.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Aquatic",
      shortDescription: "Icy Lemon Apple",
      topNotes: "Apple, Italian Lemon, Sicilian Bergamot", middleNotes: "Plum, Orange Blossom, Cardamom", bottomNotes: "Musk, Amber, Driftwood"
    },
    { id: 17, name: "Hawas For Him", brand: "Al Rasasi", priceIQD: 35000, category: "men", image: "hawas.jpeg", 
      description: "Fresh apple and watery plum with ambergris magnetism. Ultimate modern gentleman.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Aquatic",
      shortDescription: "Fresh Apple Plum",
      topNotes: "Apple, Bergamot, Lemon", middleNotes: "Watery Notes, Plum, Orange Blossom", bottomNotes: "Ambergris, Musk, Patchouli"
    },
    { id: 42, name: "Nebras", brand: "Lattafa", priceIQD: 50000, category: "unisex", image: "Nebras.jpeg", 
      description: "A delicious gourmand treat of berries and cacao vanilla. Sweet and comforting.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Evening_Floral",
      shortDescription: "Sweet Cacao Berries",
      topNotes: "Red Berries, Mandarin", middleNotes: "Vanilla, Cacao, Rose", bottomNotes: "Sugar, Tonka Bean, Musk"
    },
    { id: 52, name: "Club De Nuit Iconic", brand: "Armaf", priceIQD: 50000, category: "men", image: "Iconic.jpeg", 
      description: "A blue masterpiece. Zesty grapefruit, mint and ginger with incense depth.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Daytime_Aquatic",
      shortDescription: "Blue Grapefruit Ginger",
      topNotes: "Grapefruit, Mint, Lemon", middleNotes: "Ginger, Melon, Jasmine", bottomNotes: "Incense, Amber, Sandalwood"
    },
    { id: 53, name: "Club De Nuit Limited Edition", brand: "Armaf", priceIQD: 85000, category: "men", image: "LimitedEdition.jpeg", 
      description: "The ultimate intense citrus-smoky fragrance. Smoother and richer than the original.", 
      longevity: "Very Long Lasting", sillage: "Strong", profile: "Daytime_Woody",
      shortDescription: "Intense Citrus Smoky",
      topNotes: "Pineapple, Bergamot, Lemon", middleNotes: "Birch, Rose, Jasmine", bottomNotes: "Vanilla, Musk, Ambergris"
    },
    { id: 15, name: "Fattan", brand: "Al Rasasi", priceIQD: 40000, category: "men", image: "fattan.jpeg", 
      description: "Zesty grapefruit and pink pepper with earthy vetiver depth. Modern timeless masculinity.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Woody",
      shortDescription: "Zesty Grapefruit Pepper",
      topNotes: "Grapefruit, Bergamot, Pink Pepper", middleNotes: "Vetiver, Cedar, Patchouli", bottomNotes: "Oakmoss, Benzoin, Amber"
    },
    { id: 40, name: "Turathi Electric", brand: "Afnan", priceIQD: 45000, category: "men", image: "TurathiElectric.jpeg", 
      description: "Electrifying ginger and citrus freshness inspired by high-energy summer days.", 
      longevity: "Moderate to Long", sillage: "Medium", profile: "Daytime_Aquatic",
      shortDescription: "Electrifying Ginger Citrus",
      topNotes: "Pear, Bergamot, Mandarin, Ginger", middleNotes: "Orange Blossom, Georgywood", bottomNotes: "Musk, Ambrofix, Akigalawood"
    },
    { id: 44, name: "KAAF", brand: "Ahmed Almaghribi", priceIQD: 30000, category: "men", image: "Kaaf.jpeg", 
      description: "A refreshing aquatic fragrance with red fruits and smooth sandalwood.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Daytime_Aquatic",
      shortDescription: "Fresh Red Fruits Aquatic",
      topNotes: "Red Fruits, Watermelon, Lavender", middleNotes: "Sandalwood, Ambroxan", bottomNotes: "Lotus, Jasmine, Sea Accord"
    },
    { id: 55, name: "Precieux 1", brand: "Armaf", priceIQD: 65000, category: "men", image: "Precioux.jpeg", 
      description: "A precious, complex blend of pineapple, caramel and anise. Luxurious extrait.", 
      longevity: "Long Lasting", sillage: "Medium", profile: "Evening_Floral",
      shortDescription: "Pineapple Caramel Anise",
      topNotes: "Pineapple, Pear, Caramel", middleNotes: "Anise, White Wood, Oakmoss", bottomNotes: "Vanilla, Leather, Amber"
    },
    { id: 5, name: "Asad Bourbon", brand: "Lattafa", priceIQD: 30000, category: "men", image: "Asad_bourbon.jpeg", 
      description: "Smoky bourbon vanilla with cacao and warm spices. Sophisticated gourmand confidence.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Smoky Bourbon Vanilla",
      topNotes: "Lavender, Mirabelle, Pink Pepper", middleNotes: "Cacao, Nutmeg, Davana", bottomNotes: "Bourbon Vanilla, Amber, Vetiver"
    },
    { id: 3, name: "Art Of Arabia I", brand: "Lattafa", priceIQD: 60000, category: "men", image: "art_1.jpeg", 
      description: "Fresh bergamot-mint meets sophisticated black tea and incense. Elegant daily luxury.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Aquatic",
      shortDescription: "Fresh Bergamot Mint",
      topNotes: "Bergamot, Mint", middleNotes: "Black Tea, Ginger, Lavender", bottomNotes: "Ambroxan, Frankincense, Cinnamon"
    },
    { id: 4, name: "Art Of Arabia III", brand: "Lattafa", priceIQD: 60000, category: "men", image: "art_3.jpeg", 
      description: "Rich dates and tobacco wrapped in myrrh and vanilla. Opulent oriental warmth.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Rich Dates Tobacco",
      topNotes: "Olibanum, Davana, Bergamot", middleNotes: "Dates, Tobacco, Sandalwood", bottomNotes: "Myrrh, Vanilla, Tonka Bean"
    },
    { id: 6, name: "Atlas", brand: "Lattafa", priceIQD: 35000, category: "men", image: "atlas.jpeg", 
      description: "Fresh sea notes and lemon with ambergris depth. Adventurous and versatile.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Aquatic",
      shortDescription: "Fresh Sea Lemon",
      topNotes: "Sea Notes, Salt, Lemon", middleNotes: "Davana, Iris", bottomNotes: "Ambergris, Oakmoss, Sandalwood"
    },
    { id: 8, name: "Badee Al Oud Sublime", brand: "Lattafa", priceIQD: 35000, category: "unisex", image: "badee_sublime.jpeg", 
      description: "Juicy apple and litchi with plush jasmine florals. Bright yet addictive elegance.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Floral",
      shortDescription: "Juicy Apple Litchi",
      topNotes: "Apple, Litchi, Rose", middleNotes: "Plum, Jasmine", bottomNotes: "Moss, Vanilla, Patchouli"
    },
    { id: 9, name: "Cassius", brand: "Maison Alhambra", priceIQD: 25000, category: "men", image: "cassius.jpeg", 
      description: "Spicy nutmeg and green apple with rich tonka depth. Charismatic masculine power.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Spicy Nutmeg Apple",
      topNotes: "Nutmeg, Green Apple", middleNotes: "Tonka Bean, Rose", bottomNotes: "Patchouli, Vanilla"
    },
    { id: 12, name: "Emeer", brand: "Lattafa", priceIQD: 40000, category: "men", image: "emeer.jpeg", 
      description: "Regal lemon and white tea with ambergris sophistication. Commanding oriental presence.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Regal Lemon Tea",
      topNotes: "Lemon, Bergamot, Clary Sage", middleNotes: "White Tea, Sandalwood, Cardamom", bottomNotes: "Ambergris, Cedarwood, Cashmeran"
    },
    { id: 13, name: "Exclusif Tabac", brand: "Maison Alhambra", priceIQD: 35000, category: "men", image: "exclusif_tabac.jpeg", 
      description: "Rich tobacco and osmanthus with smooth tonka warmth. Mature masculine elegance.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Rich Tobacco Osmanthus",
      topNotes: "Osmanthus, Artemisia, Citrus", middleNotes: "Tobacco, Patchouli, Guaiac Wood", bottomNotes: "Tonka Bean"
    },
    { id: 14, name: "Fusion Intense", brand: "Maison Alhambra", priceIQD: 40000, category: "men", image: "fabulo.jpeg", 
      description: "Dark lavender and leather with bitter almond intrigue. Mysterious masculine seduction.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Dark Lavender Leather",
      topNotes: "Lavender, Clary Sage", middleNotes: "Bitter Almond, Vanilla, Orris Root", bottomNotes: "Leather, White Woods, Tonka Bean"
    },
    { id: 16, name: "Hawas Black", brand: "Al Rasasi", priceIQD: 35000, category: "men", image: "hawas_black.jpeg", 
      description: "Dark bergamot-pineapple with intense patchouli amber. Midnight masculine allure.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Dark Bergamot Pineapple",
      topNotes: "Bergamot, Pineapple, Grapefruit", middleNotes: "Patchouli, Cedarwood, Jasmine", bottomNotes: "Oakmoss, Woody Notes, Amber"
    },
    { id: 39, name: "Hawas Elixir", brand: "Al Rasasi", priceIQD: 40000, category: "men", image: "HawasElixir.jpeg", 
      description: "A rich, potent blend featuring dark chocolate nuances mixed with fresh lavender.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Daytime_Aquatic",
      shortDescription: "Potent Lavender Chocolate",
      topNotes: "Mint, Bergamot, Artemisia", middleNotes: "Dark Chocolate, Lavender, Benzoin", bottomNotes: "Vanilla, Tonka Bean, Musk"
    },
    { id: 19, name: "Hayaati", brand: "Lattafa", priceIQD: 25000, category: "men", image: "hayaati.jpeg", 
      description: "Warm apple-cinnamon with creamy vanilla musk. Everyday sophisticated comfort.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Anytime_Woody",
      shortDescription: "Warm Apple Cinnamon",
      topNotes: "Apple, Bergamot", middleNotes: "Cinnamon, Woodsy Notes", bottomNotes: "Musk, Vanilla"
    },
    { id: 21, name: "His Confession", brand: "Lattafa", priceIQD: 50000, category: "men", image: "his_confession.jpeg", 
      description: "Spicy cinnamon-lavender with smooth amber tonka. Bold intimate masculinity.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Woody",
      shortDescription: "Spicy Cinnamon Lavender",
      topNotes: "Cinnamon, Lavender, Mandarin", middleNotes: "Iris, Benzoin, Cypress", bottomNotes: "Vanilla, Tonka, Amber"
    },
    { id: 22, name: "Jean Lowe Immortal", brand: "Maison Alhambra", priceIQD: 30000, category: "men", image: "immortal.jpeg", 
      description: "Zesty ginger-grapefruit with ambroxan amber depth. Timeless legendary power.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Zesty Ginger Grapefruit",
      topNotes: "Ginger, Grapefruit, Bergamot", middleNotes: "Rosemary, Water Notes, Sage", bottomNotes: "Ambroxan, Amber, Labdanum"
    },
    { id: 23, name: "Jean Lowe Ombre", brand: "Maison Alhambra", priceIQD: 30000, category: "men", image: "ombre.jpeg", 
      description: "Deep oud-incense with raspberry rose intrigue. Sophisticated dark elegance.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Deep Oud Incense",
      topNotes: "Oud, Incense", middleNotes: "Rose, Raspberry, Saffron", bottomNotes: "Amber, Benzoin, Geranium"
    },
    { id: 28, name: "Opulence Leather", brand: "Maison Alhambra", priceIQD: 40000, category: "men", image: "opulence.jpg", 
      description: "Rich cardamom-leather with jasmine and moss depth. Luxurious masculine statement.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Evening_Woody",
      shortDescription: "Rich Cardamom Leather",
      topNotes: "Cardamom", middleNotes: "Leather, Jasmine Sambac", bottomNotes: "Amber, Moss, Patchouli"
    },
    { id: 32, name: "Tobacco Touch", brand: "Maison Alhambra", priceIQD: 50000, category: "men", image: "tobacco_touch.jpeg", 
      description: "Smooth tobacco and spicy vanilla with dried fruit warmth. Elegant everyday signature.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Anytime_Woody",
      shortDescription: "Smooth Tobacco Vanilla",
      topNotes: "Tobacco, Spicy Notes", middleNotes: "Tobacco, Vanilla, Tonka Bean", bottomNotes: "Dried Fruits, Woody Notes"
    },
    { id: 34, name: "Winsome", brand: "Maison Alhambra", priceIQD: 40000, category: "men", image: "winsome.jpg", 
      description: "Delicate violet-rose with bourbon vanilla warmth. Charming feminine radiance.", 
      longevity: "Long Lasting (8-10 hours)", sillage: "Medium to Strong", profile: "Daytime_Floral",
      shortDescription: "Delicate Violet Rose",
      topNotes: "Violet Leaf, Coriander, Bergamot", middleNotes: "Rose, Black Pepper, Lily-of-the-Valley", bottomNotes: "Patchouli, Bourbon Vanilla, Ambergris"
    },
    { id: 45, name: "L'Aventure", brand: "Al Haramain", priceIQD: 45000, category: "men", image: "Laventure.jpeg", 
      description: "A legendary chypre fruity fragrance. Crisp lemon and woody depth.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Daytime_Woody",
      shortDescription: "Crisp Lemon Woody",
      topNotes: "Lemon, Bergamot, Elemi", middleNotes: "Woody Notes, Jasmine, Lily-of-the-Valley", bottomNotes: "Musk, Patchouli, Amber"
    },
    { id: 47, name: "Rare Carbon", brand: "Afnan", priceIQD: 40000, category: "men", image: "RareCarbon.jpeg", 
      description: "Deep leather and violet leaf, reminiscent of the open road. Rugged and bold.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Evening_Woody",
      shortDescription: "Deep Leather Violet",
      topNotes: "Leather, Violet Leaf, Cinnamon", middleNotes: "Violet, Rose, Oud", bottomNotes: "Amber, Sandalwood, Vetiver"
    },
    { id: 48, name: "Rare Reef", brand: "Afnan", priceIQD: 40000, category: "men", image: "RareReef.jpeg", 
      description: "A relaxing aquatic scent with unique fig and date nuances. Refreshingly different.", 
      longevity: "Moderate", sillage: "Medium", profile: "Daytime_Aquatic",
      shortDescription: "Aquatic Fig Dates",
      topNotes: "Orange, Citron, Mint", middleNotes: "Apricot, Basil, Rose", bottomNotes: "Fig, Dates, Amberwood"
    },
    { id: 49, name: "Odyssey Aqua", brand: "Armaf", priceIQD: 35000, category: "men", image: "OddyseyAqua.jpeg", 
      description: "A versatile aquatic fresh scent perfect for the gym or office.", 
      longevity: "Moderate", sillage: "Medium", profile: "Daytime_Aquatic",
      shortDescription: "Fresh Aquatic Herbal",
      topNotes: "Grapefruit, Orange, Artemisia", middleNotes: "Lavender, Mint", bottomNotes: "Cypress, Patchouli, Amberwood"
    },
    { id: 50, name: "Odyssey Homme", brand: "Armaf", priceIQD: 35000, category: "men", image: "Oddysey.jpeg", 
      description: "Warm amber and vanilla with a powdery iris touch. Elegant night wear.", 
      longevity: "Long Lasting", sillage: "Medium", profile: "Evening_Woody",
      shortDescription: "Warm Iris Vanilla",
      topNotes: "Vanilla, Amber", middleNotes: "Iris, Oriental Spices", bottomNotes: "Jasmine, Leather"
    },
    { id: 51, name: "Private Key To My Success", brand: "Armaf", priceIQD: 70000, category: "men", image: "PrivateKey.jpeg", 
      description: "Exclusive and rich blend of ginger, spices and akigalawood. The scent of success.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Evening_Woody",
      shortDescription: "Ginger Spices Wood",
      topNotes: "Bergamot, Ginger, Chilli", middleNotes: "Spices, Lavender", bottomNotes: "Akigalawood, Leather"
    },
    { id: 54, name: "Club De Nuit Sillage", brand: "Armaf", priceIQD: 45000, category: "unisex", image: "Sillage.jpeg", 
      description: "Metallic fresh citrus, black currant and musk. Sharp, clean, and professional.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Daytime_Aquatic",
      shortDescription: "Metallic Black Currant",
      topNotes: "Bergamot, Black Currant, Lemon", middleNotes: "Rose, Jasmine, Iris", bottomNotes: "Musk, Ambroxan, Sandalwood"
    },
    { id: 56, name: "Club De Nuit Milestone", brand: "Armaf", priceIQD: 45000, category: "unisex", image: "Milestone.jpeg", 
      description: "Salty watermelon and marine notes reminiscent of gold. Vacation in a bottle.", 
      longevity: "Long Lasting", sillage: "Medium", profile: "Daytime_Aquatic",
      shortDescription: "Salty Watermelon Marine",
      topNotes: "Sea Notes, Red Fruits, Bergamot", middleNotes: "Violet, White Woods", bottomNotes: "Musk, Ambroxan"
    },
    { id: 57, name: "Sao Paulo", brand: "Zodiac", priceIQD: 55000, category: "men", image: "SaoPaolo.jpeg", 
      description: "Vibrant neroli and orange blossom. A party in a bottle.", 
      longevity: "Moderate", sillage: "Medium", profile: "Daytime_Woody",
      shortDescription: "Vibrant Neroli Orange",
      topNotes: "Neroli, Bergamot", middleNotes: "Orange Blossom, Ylang Ylang", bottomNotes: "Floral Musk, Amber"
    },
    { id: 58, name: "Craze", brand: "Armaf", priceIQD: 35000, category: "men", image: "Craze.jpeg", 
      description: "Almond and vanilla fougere with metallic freshness. Distinctive and alluring.", 
      longevity: "Long Lasting", sillage: "Strong", profile: "Evening_Woody",
      shortDescription: "Almond Vanilla Fougere",
      topNotes: "Cumin, Heliotrope, Bergamot", middleNotes: "Bitter Almond, Lavender, Sage", bottomNotes: "Vanilla, Amber, Sandalwood"
    },
    { id: 59, name: "Tres Nuit", brand: "Armaf", priceIQD: 30000, category: "men", image: "TresNuit.jpeg", 
      description: "Fresh green violet leaf and iris. A classic gentleman's scent.", 
      longevity: "Moderate", sillage: "Medium", profile: "Daytime_Floral",
      shortDescription: "Fresh Green Violet",
      topNotes: "Lemon, Verbena, Iris", middleNotes: "Lavender, Violet, Spicy Notes", bottomNotes: "Ambergris, Sandalwood"
    }
];
