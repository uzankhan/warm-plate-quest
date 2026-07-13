// Recipe dataset — 50 curated cooking & baking recipes.
// Images use Unsplash direct URLs (food photography).

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Recipe {
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  cookingTime: number; // minutes
  bakingTemp?: number; // °F, only for baked goods
  difficulty: Difficulty;
  rating: number; // 0..5
  reviews: number;
  ingredients: string[];
  equipment: string[];
  steps: string[];
  tips: string[];
  bakingTips?: string[];
  storage: string;
  serving: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  youtubeId: string;
  featured?: boolean;
  trending?: boolean;
}

// A small set of vibrant, food-focused Unsplash photos cycled across recipes.
const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&q=75", // pancakes
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=75",   // buddha bowl
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=75", // pancakes berries
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=75",   // burger
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=900&q=75", // salad
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=75",   // steak
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=75", // pizza
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=900&q=75",   // burger 2
  "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=900&q=75", // avocado toast
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=75", // pasta bowl
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=900&q=75", // ramen
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=75", // brunch
  "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=900&q=75", // pancake stack
  "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=900&q=75", // cookies
  "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=900&q=75", // chocolate cake
  "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=900&q=75", // waffles
  "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=900&q=75", // strawberries
  "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=900&q=75", // muffins
  "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=900&q=75", // bread
  "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=900&q=75", // burrito bowl
];

const CATEGORIES = [
  "Breakfast", "Desserts", "Main Course", "Salads",
  "Baking", "Pasta", "Vegan", "Soups", "Drinks", "Snacks",
] as const;

export const CATEGORY_LIST = [...CATEGORIES];

interface Seed {
  name: string;
  category: (typeof CATEGORIES)[number];
  desc: string;
  ingredients: string[];
  time: number;
  temp?: number;
  difficulty: Difficulty;
  cal: number;
  p: number;
  c: number;
  f: number;
  yt: string;
}

const SEEDS: Seed[] = [
  { name: "Fluffy Buttermilk Pancakes", category: "Breakfast", desc: "Tall, tender pancakes with crisp golden edges and a pillowy centre.", ingredients: ["2 cups all-purpose flour","2 tbsp sugar","2 tsp baking powder","1/2 tsp baking soda","1/2 tsp salt","2 cups buttermilk","2 large eggs","1/4 cup melted butter","Maple syrup, to serve"], time: 25, temp: 375, difficulty: "Easy", cal: 320, p: 8, c: 42, f: 12, yt: "1IszT_guI08" },
  { name: "Classic Chocolate Chip Cookies", category: "Baking", desc: "Chewy centres, crisp edges, and pools of dark chocolate.", ingredients: ["1 cup butter, softened","1 cup brown sugar","1/2 cup white sugar","2 eggs","2 tsp vanilla","2 1/4 cups flour","1 tsp baking soda","1 tsp salt","2 cups chocolate chips"], time: 30, temp: 375, difficulty: "Easy", cal: 180, p: 2, c: 24, f: 9, yt: "hVeXQBbLKGE" },
  { name: "Creamy Tuscan Chicken", category: "Main Course", desc: "Pan-seared chicken in a sun-dried tomato and spinach cream sauce.", ingredients: ["4 chicken breasts","2 tbsp olive oil","4 cloves garlic","1 cup heavy cream","1/2 cup parmesan","1/2 cup sun-dried tomatoes","2 cups spinach","Salt & pepper"], time: 35, difficulty: "Medium", cal: 480, p: 42, c: 8, f: 30, yt: "3AAdKl1UYZs" },
  { name: "Sourdough Country Loaf", category: "Baking", desc: "Open crumb, blistered crust, tangy and deeply flavoured.", ingredients: ["500g bread flour","350g water","100g sourdough starter","10g salt"], time: 240, temp: 500, difficulty: "Hard", cal: 210, p: 7, c: 42, f: 1, yt: "8pfshCf-Y5g" },
  { name: "Roasted Tomato Basil Soup", category: "Soups", desc: "Sweet roasted tomatoes blended with fresh basil and cream.", ingredients: ["2 lb roma tomatoes","1 onion","4 garlic cloves","3 tbsp olive oil","2 cups stock","1/4 cup basil","1/2 cup cream"], time: 55, temp: 425, difficulty: "Easy", cal: 210, p: 4, c: 18, f: 14, yt: "cGkAWTZ_xCA" },
  { name: "Neapolitan Margherita Pizza", category: "Main Course", desc: "Blistered thin crust, San Marzano sauce, fresh mozzarella.", ingredients: ["Pizza dough","1/2 cup San Marzano tomato sauce","4 oz fresh mozzarella","Fresh basil","Olive oil","Sea salt"], time: 90, temp: 550, difficulty: "Medium", cal: 260, p: 12, c: 32, f: 9, yt: "G-jPoROGHGE" },
  { name: "Silky Chocolate Ganache Tart", category: "Desserts", desc: "Buttery cocoa shell filled with pure dark chocolate ganache.", ingredients: ["1 1/2 cups flour","1/2 cup cocoa","3/4 cup butter","1/2 cup sugar","1 egg","8 oz dark chocolate","1 cup cream","Flaky sea salt"], time: 90, temp: 350, difficulty: "Medium", cal: 380, p: 5, c: 34, f: 26, yt: "H5o57Bhi1_c" },
  { name: "Green Goddess Grain Bowl", category: "Salads", desc: "Farro, avocado, cucumber, herbs, and a creamy tahini dressing.", ingredients: ["1 cup farro","1 avocado","1 cucumber","1/2 cup parsley","1/2 cup mint","2 tbsp tahini","Lemon juice","Olive oil"], time: 30, difficulty: "Easy", cal: 420, p: 12, c: 48, f: 22, yt: "GnBK9zNo3iw" },
  { name: "Cacio e Pepe", category: "Pasta", desc: "Three ingredients, endless soul: pasta, pecorino, black pepper.", ingredients: ["1 lb spaghetti","1 1/2 cups pecorino romano","2 tsp fresh black pepper","Pasta water"], time: 20, difficulty: "Medium", cal: 480, p: 18, c: 70, f: 14, yt: "Zj_Nak8jL04" },
  { name: "Cinnamon Roll Morning Buns", category: "Baking", desc: "Layered enriched dough swirled with brown sugar and cinnamon.", ingredients: ["4 cups flour","1/2 cup sugar","2 1/4 tsp yeast","1 cup milk","1/3 cup butter","2 eggs","2 tbsp cinnamon","1 cup brown sugar","Cream cheese frosting"], time: 180, temp: 350, difficulty: "Medium", cal: 420, p: 6, c: 62, f: 16, yt: "AoJI-J8bqdI" },
  { name: "Thai Coconut Curry", category: "Main Course", desc: "Fragrant red curry with vegetables and creamy coconut milk.", ingredients: ["2 tbsp red curry paste","1 can coconut milk","1 lb chicken or tofu","2 cups vegetables","1 tbsp fish sauce","Basil","Lime","Jasmine rice"], time: 40, difficulty: "Easy", cal: 460, p: 28, c: 38, f: 22, yt: "eYuVLQ3B8Y0" },
  { name: "Lemon Blueberry Muffins", category: "Baking", desc: "Sunshine-bright muffins bursting with juicy blueberries.", ingredients: ["2 cups flour","3/4 cup sugar","2 tsp baking powder","1/2 cup butter","2 eggs","3/4 cup milk","2 tbsp lemon zest","1 1/2 cups blueberries"], time: 35, temp: 400, difficulty: "Easy", cal: 240, p: 4, c: 34, f: 10, yt: "PbAvJUSCKKk" },
  { name: "Beef Bourguignon", category: "Main Course", desc: "Slow-braised beef in red wine with pearl onions and mushrooms.", ingredients: ["3 lb chuck roast","6 slices bacon","1 bottle red wine","4 cups beef stock","Pearl onions","Mushrooms","Herbs de Provence"], time: 210, difficulty: "Hard", cal: 620, p: 45, c: 12, f: 32, yt: "PBoRTZmpiZM" },
  { name: "Caesar Salad with Sourdough Croutons", category: "Salads", desc: "Crisp romaine, garlicky anchovy dressing, hand-torn croutons.", ingredients: ["2 romaine hearts","1/2 cup parmesan","Sourdough croutons","2 anchovies","1 egg yolk","Lemon","Olive oil","Garlic"], time: 20, difficulty: "Easy", cal: 320, p: 10, c: 14, f: 26, yt: "TVBjcYuIu28" },
  { name: "French Onion Soup", category: "Soups", desc: "Deeply caramelised onions, rich beef broth, molten gruyère.", ingredients: ["6 large onions","4 tbsp butter","1 cup dry white wine","8 cups beef stock","Baguette slices","2 cups gruyère"], time: 120, difficulty: "Medium", cal: 380, p: 18, c: 32, f: 22, yt: "0O8bVQI3ELo" },
  { name: "Avocado Toast with Chili Crisp", category: "Breakfast", desc: "Creamy avocado on toasted sourdough with crunchy chili oil.", ingredients: ["2 slices sourdough","1 avocado","1 tbsp chili crisp","Flaky salt","Lemon","Radish"], time: 10, difficulty: "Easy", cal: 320, p: 8, c: 28, f: 20, yt: "sSfPvavWLDs" },
  { name: "Butter Chicken", category: "Main Course", desc: "Tender chicken in a luscious tomato-butter cream sauce.", ingredients: ["2 lb chicken thighs","1 cup yogurt","2 tbsp garam masala","1 can tomato purée","1/2 cup cream","4 tbsp butter","Ginger","Garlic"], time: 60, difficulty: "Medium", cal: 520, p: 38, c: 12, f: 34, yt: "a03U45jFxOI" },
  { name: "Vegan Chocolate Avocado Mousse", category: "Vegan", desc: "Silky, rich, and secretly plant-based.", ingredients: ["2 ripe avocados","1/2 cup cocoa powder","1/2 cup maple syrup","1 tsp vanilla","Pinch of salt","Almond milk"], time: 15, difficulty: "Easy", cal: 240, p: 4, c: 32, f: 14, yt: "Xg7BEed3uKk" },
  { name: "Homemade Focaccia", category: "Baking", desc: "Dimpled, olive-oil rich bread with rosemary and flaky salt.", ingredients: ["500g flour","400g water","10g salt","5g yeast","Olive oil","Fresh rosemary","Flaky salt"], time: 150, temp: 450, difficulty: "Medium", cal: 220, p: 5, c: 34, f: 8, yt: "s5PWzu64L1U" },
  { name: "Strawberry Shortcake", category: "Desserts", desc: "Tender biscuits layered with macerated berries and cream.", ingredients: ["2 cups flour","1/4 cup sugar","1 tbsp baking powder","1/2 cup butter","2/3 cup cream","1 lb strawberries","Whipped cream"], time: 45, temp: 400, difficulty: "Easy", cal: 380, p: 5, c: 42, f: 22, yt: "3vBRcmPS7dU" },
  { name: "Miso Ramen", category: "Soups", desc: "Umami-packed miso broth with springy noodles and soft egg.", ingredients: ["4 cups chicken stock","3 tbsp miso","2 tsp ginger","2 cloves garlic","4 servings ramen noodles","Soft-boiled eggs","Corn","Scallions"], time: 45, difficulty: "Medium", cal: 480, p: 22, c: 62, f: 16, yt: "GnnEbmY9YB0" },
  { name: "Classic Vanilla Bean Cheesecake", category: "Desserts", desc: "New York style cheesecake with a graham crust and pure vanilla.", ingredients: ["2 cups graham crumbs","1/2 cup butter","32 oz cream cheese","1 1/4 cup sugar","4 eggs","1 vanilla bean","1 cup sour cream"], time: 180, temp: 325, difficulty: "Medium", cal: 460, p: 8, c: 38, f: 30, yt: "9x-Tio50wpo" },
  { name: "Shakshuka", category: "Breakfast", desc: "Eggs poached in a spiced tomato and pepper sauce.", ingredients: ["2 tbsp olive oil","1 onion","2 peppers","4 garlic cloves","1 tsp cumin","1 tsp paprika","28 oz crushed tomatoes","6 eggs","Feta","Parsley"], time: 30, difficulty: "Easy", cal: 280, p: 14, c: 18, f: 16, yt: "6ycmyUCiIWk" },
  { name: "Chicken Tikka Masala", category: "Main Course", desc: "Charred marinated chicken in a creamy spiced tomato sauce.", ingredients: ["2 lb chicken","1 cup yogurt","3 tbsp tikka masala","1 onion","4 garlic cloves","1 can tomato","1/2 cup cream"], time: 75, difficulty: "Medium", cal: 480, p: 36, c: 14, f: 30, yt: "hSKUxu5iJTs" },
  { name: "Roasted Butternut Squash Soup", category: "Soups", desc: "Silky, sweet, and warming with a hint of sage.", ingredients: ["1 butternut squash","1 onion","4 cloves garlic","4 cups stock","1/2 cup cream","Sage","Olive oil"], time: 60, temp: 400, difficulty: "Easy", cal: 220, p: 4, c: 32, f: 10, yt: "6-vzs6dGnII" },
  { name: "Homemade Ravioli with Brown Butter Sage", category: "Pasta", desc: "Fresh pasta pillows in a nutty brown butter sauce.", ingredients: ["300g flour","3 eggs","Ricotta","Parmesan","Nutmeg","1/2 cup butter","Fresh sage"], time: 120, difficulty: "Hard", cal: 520, p: 18, c: 58, f: 24, yt: "OecyfjhKRnw" },
  { name: "Banana Bread", category: "Baking", desc: "Moist, deeply banana-flavoured, easy one-bowl loaf.", ingredients: ["3 ripe bananas","1/3 cup melted butter","3/4 cup sugar","1 egg","1 tsp vanilla","1 tsp baking soda","1 1/2 cups flour","Pinch salt"], time: 75, temp: 350, difficulty: "Easy", cal: 240, p: 3, c: 38, f: 9, yt: "hAqELgY5ScY" },
  { name: "Greek Village Salad", category: "Salads", desc: "Tomatoes, cucumbers, olives, feta, oregano — no lettuce needed.", ingredients: ["4 tomatoes","1 cucumber","1/2 red onion","Kalamata olives","Feta block","Oregano","Olive oil"], time: 15, difficulty: "Easy", cal: 260, p: 8, c: 14, f: 20, yt: "PjZDoZ2z_gg" },
  { name: "Chicken Pho", category: "Soups", desc: "Aromatic Vietnamese broth with rice noodles and herbs.", ingredients: ["1 whole chicken","Ginger","Onion","Star anise","Cinnamon","Rice noodles","Bean sprouts","Basil","Lime"], time: 150, difficulty: "Medium", cal: 420, p: 32, c: 48, f: 8, yt: "sB6bpurYtx0" },
  { name: "Vegan Buddha Bowl", category: "Vegan", desc: "Roasted vegetables, quinoa, chickpeas, tahini drizzle.", ingredients: ["1 cup quinoa","1 sweet potato","1 can chickpeas","2 cups kale","Avocado","Tahini","Lemon","Cumin"], time: 40, temp: 425, difficulty: "Easy", cal: 480, p: 16, c: 62, f: 20, yt: "sxJfEmT2Y_Q" },
  { name: "Espresso Martini", category: "Drinks", desc: "Rich, boozy, foamy — the coffee lover's cocktail.", ingredients: ["2 oz vodka","1 oz coffee liqueur","1 oz fresh espresso","1/2 oz simple syrup","Coffee beans"], time: 5, difficulty: "Easy", cal: 220, p: 0, c: 18, f: 0, yt: "PWQOnHzUgWQ" },
  { name: "Homemade Bagels", category: "Baking", desc: "Chewy, glossy, boiled-then-baked NY-style bagels.", ingredients: ["4 cups bread flour","1 1/2 cups warm water","2 tsp yeast","2 tbsp sugar","2 tsp salt","1 tbsp barley malt","Everything seasoning"], time: 180, temp: 425, difficulty: "Hard", cal: 280, p: 10, c: 56, f: 2, yt: "L1SPT0YZOTA" },
  { name: "Spicy Thai Basil Beef", category: "Main Course", desc: "Wok-charred beef with chilies and fragrant Thai basil.", ingredients: ["1 lb ground beef","4 Thai chilies","6 garlic cloves","2 tbsp oyster sauce","1 tbsp fish sauce","1 tbsp soy sauce","Thai basil","Jasmine rice","Fried egg"], time: 20, difficulty: "Easy", cal: 520, p: 32, c: 42, f: 24, yt: "bpe5G8dW5FE" },
  { name: "Classic Tiramisu", category: "Desserts", desc: "Espresso-soaked ladyfingers layered with mascarpone cream.", ingredients: ["6 egg yolks","3/4 cup sugar","1 lb mascarpone","1 1/2 cups cream","Espresso","Ladyfingers","Cocoa powder"], time: 240, difficulty: "Medium", cal: 420, p: 7, c: 34, f: 28, yt: "87ZlgIiPP4o" },
  { name: "Loaded Nachos Supreme", category: "Snacks", desc: "Crispy tortilla chips smothered with cheese and toppings.", ingredients: ["Tortilla chips","2 cups cheddar","Black beans","Jalapeños","Pico de gallo","Guacamole","Sour cream","Cilantro"], time: 20, temp: 400, difficulty: "Easy", cal: 480, p: 18, c: 46, f: 26, yt: "yPGaZKNMxxA" },
  { name: "Overnight Oats with Berries", category: "Breakfast", desc: "Creamy no-cook oats prepped the night before.", ingredients: ["1/2 cup rolled oats","1/2 cup milk","1/4 cup yogurt","1 tbsp chia","1 tbsp maple syrup","Berries","Almonds"], time: 5, difficulty: "Easy", cal: 340, p: 12, c: 52, f: 10, yt: "d94b6yz3Xac" },
  { name: "Beef Tacos al Pastor", category: "Main Course", desc: "Marinated pork with pineapple, onion, cilantro on warm tortillas.", ingredients: ["2 lb pork shoulder","Achiote paste","Pineapple","Corn tortillas","White onion","Cilantro","Lime"], time: 90, difficulty: "Medium", cal: 460, p: 32, c: 38, f: 20, yt: "Qbuc-M-6-ok" },
  { name: "Matcha Latte", category: "Drinks", desc: "Silky, earthy green tea whisked with steamed milk.", ingredients: ["1 tsp matcha","2 oz hot water","1 cup milk","Honey"], time: 5, difficulty: "Easy", cal: 120, p: 6, c: 14, f: 4, yt: "6nq6tqBGdxE" },
  { name: "Mediterranean Chickpea Stew", category: "Vegan", desc: "Hearty chickpeas simmered with tomatoes, spinach, and lemon.", ingredients: ["2 cans chickpeas","1 onion","4 garlic cloves","1 can tomatoes","2 cups spinach","Cumin","Paprika","Lemon"], time: 40, difficulty: "Easy", cal: 380, p: 16, c: 52, f: 12, yt: "PBoRTZmpiZM" },
  { name: "Croissants", category: "Baking", desc: "Buttery, flaky, laminated pastry — a labour of love.", ingredients: ["500g flour","10g salt","55g sugar","10g yeast","300ml milk","280g European butter"], time: 720, temp: 400, difficulty: "Hard", cal: 260, p: 5, c: 24, f: 16, yt: "yaHfBQx-XPo" },
  { name: "Pesto Pasta with Cherry Tomatoes", category: "Pasta", desc: "Bright basil pesto tossed with pasta and roasted tomatoes.", ingredients: ["1 lb pasta","2 cups basil","1/2 cup pine nuts","1/2 cup parmesan","2 garlic cloves","1/2 cup olive oil","Cherry tomatoes"], time: 25, difficulty: "Easy", cal: 520, p: 14, c: 62, f: 24, yt: "5CRfBl0PxUI" },
  { name: "Fresh Fruit Smoothie Bowl", category: "Breakfast", desc: "Frozen fruit blended thick, topped with granola and seeds.", ingredients: ["1 frozen banana","1 cup frozen berries","1/2 cup yogurt","Splash of milk","Granola","Chia seeds","Coconut flakes"], time: 10, difficulty: "Easy", cal: 320, p: 10, c: 58, f: 6, yt: "n6UAgOAoY5g" },
  { name: "Miso Glazed Salmon", category: "Main Course", desc: "Salmon lacquered with sweet-savoury white miso glaze.", ingredients: ["4 salmon fillets","3 tbsp white miso","2 tbsp mirin","1 tbsp sake","1 tbsp sugar","Scallions","Sesame seeds"], time: 25, temp: 425, difficulty: "Easy", cal: 380, p: 34, c: 12, f: 20, yt: "3lUAM4-CvB0" },
  { name: "Chocolate Lava Cake", category: "Desserts", desc: "Molten chocolate centres in delicate individual cakes.", ingredients: ["6 oz dark chocolate","1/2 cup butter","1 cup powdered sugar","2 eggs","2 yolks","6 tbsp flour","Vanilla ice cream"], time: 25, temp: 425, difficulty: "Medium", cal: 480, p: 6, c: 42, f: 32, yt: "GbbmB8-BdbA" },
  { name: "Kale Caesar with Crispy Chickpeas", category: "Salads", desc: "Massaged kale, creamy dressing, crunchy roasted chickpeas.", ingredients: ["1 bunch kale","1 can chickpeas","Parmesan","Anchovy paste","Lemon","Garlic","Olive oil"], time: 25, temp: 400, difficulty: "Easy", cal: 340, p: 14, c: 32, f: 18, yt: "CLc6WvvGeCQ" },
  { name: "Homemade Hummus", category: "Snacks", desc: "Ultra-smooth chickpea dip with lemon, garlic, and tahini.", ingredients: ["1 can chickpeas","1/3 cup tahini","2 lemons","2 garlic cloves","Olive oil","Cumin","Paprika"], time: 15, difficulty: "Easy", cal: 180, p: 6, c: 16, f: 10, yt: "PBoRTZmpiZM" },
  { name: "Orange Ginger Iced Tea", category: "Drinks", desc: "Refreshing black tea steeped with orange peel and fresh ginger.", ingredients: ["4 black tea bags","4 cups hot water","2 orange peels","2 in ginger","Honey","Ice"], time: 10, difficulty: "Easy", cal: 40, p: 0, c: 10, f: 0, yt: "M-eq5DPQZKI" },
  { name: "Vegetable Lasagna", category: "Pasta", desc: "Layers of pasta, roasted vegetables, béchamel, and mozzarella.", ingredients: ["Lasagna sheets","2 zucchini","1 eggplant","2 cups mozzarella","Ricotta","Béchamel","Tomato sauce","Basil"], time: 90, temp: 375, difficulty: "Medium", cal: 480, p: 22, c: 48, f: 22, yt: "F1yl9pgc-9k" },
  { name: "Peanut Butter Cookies", category: "Baking", desc: "Chewy, salty-sweet cookies with the classic fork criss-cross.", ingredients: ["1 cup peanut butter","1 cup sugar","1 egg","1 tsp vanilla","1 tsp baking soda","Pinch salt"], time: 20, temp: 350, difficulty: "Easy", cal: 160, p: 4, c: 16, f: 9, yt: "wS8QvowbJcM" },
  { name: "Fresh Spring Rolls", category: "Snacks", desc: "Rice paper wraps filled with herbs, shrimp, and rice noodles.", ingredients: ["Rice paper","Rice noodles","Shrimp","Lettuce","Mint","Cilantro","Carrot","Peanut dipping sauce"], time: 30, difficulty: "Medium", cal: 220, p: 12, c: 32, f: 6, yt: "8UZuFbfmxrs" },
];

const DEFAULT_EQUIPMENT = [
  "Mixing bowls", "Measuring cups & spoons", "Chef's knife", "Cutting board", "Whisk",
];
const BAKE_EQUIPMENT = ["Stand mixer or bowl", "Digital scale", "Sheet pan", "Parchment paper", "Cooling rack"];
const STOVETOP_EQUIPMENT = ["Heavy-bottom pan", "Wooden spoon", "Fine strainer"];

const DEFAULT_STEPS = [
  "Gather and measure all ingredients before you begin — mise en place makes cooking calm.",
  "Prepare your workstation: clean, dry surface, sharp knife, and preheat any equipment.",
  "Combine ingredients in the order specified, treating each stage as its own small win.",
  "Cook or bake until the visual cues match: golden colour, gentle bubbling, or a clean tester.",
  "Rest the finished dish briefly so flavours settle, then plate with intention and serve.",
];

const DEFAULT_TIPS = [
  "Read the entire recipe once before starting — you'll never be caught off guard.",
  "Taste as you go and adjust seasoning gradually rather than all at once.",
  "Use room-temperature dairy and eggs for the most consistent results.",
];

const BAKING_TIPS = [
  "Weigh your flour with a digital scale for accuracy — cups vary by 30%.",
  "Rotate your pan halfway through baking to correct for uneven ovens.",
  "Cool baked goods completely before slicing, or the crumb will compress.",
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function ratingFor(i: number) {
  return Math.round((4.2 + ((i * 37) % 8) / 10) * 10) / 10;
}

export const recipes: Recipe[] = SEEDS.map((s, i) => {
  const isBaked = s.category === "Baking" || s.category === "Desserts" || !!s.temp;
  return {
    slug: slugify(s.name),
    name: s.name,
    category: s.category,
    image: FOOD_IMAGES[i % FOOD_IMAGES.length],
    description: s.desc,
    cookingTime: s.time,
    bakingTemp: s.temp,
    difficulty: s.difficulty,
    rating: ratingFor(i),
    reviews: 40 + ((i * 53) % 260),
    ingredients: s.ingredients,
    equipment: isBaked ? [...DEFAULT_EQUIPMENT, ...BAKE_EQUIPMENT] : [...DEFAULT_EQUIPMENT, ...STOVETOP_EQUIPMENT],
    steps: DEFAULT_STEPS,
    tips: DEFAULT_TIPS,
    bakingTips: isBaked ? BAKING_TIPS : undefined,
    storage: "Store leftovers in an airtight container in the fridge for up to 3 days. Reheat gently to preserve texture.",
    serving: "Serves 4 comfortably. Plate warm and garnish with fresh herbs or a squeeze of citrus for brightness.",
    nutrition: { calories: s.cal, protein: s.p, carbs: s.c, fat: s.f },
    youtubeId: s.yt,
    featured: i < 6,
    trending: i % 5 === 0,
  };
});

export function getRecipe(slug: string) {
  return recipes.find((r) => r.slug === slug);
}

export function getRelated(slug: string, limit = 4) {
  const current = getRecipe(slug);
  if (!current) return [];
  return recipes
    .filter((r) => r.slug !== slug && r.category === current.category)
    .slice(0, limit);
}
