using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BSLTours.API.Models;

namespace BSLTours.API.Services
{
    public class InMemoryDataService : IDataService
    {
        private readonly List<TourPackage> tourPackages;
        private readonly List<Destination> destinations;
        private readonly List<Testimonial> testimonials;
        private readonly List<Inquiry> inquiries;
        private readonly List<Subscriber> subscribers;

        private int tourPackageIdCounter = 1;
        private int destinationIdCounter = 1;
        private int testimonialIdCounter = 1;
        private int inquiryIdCounter = 1;
        private int subscriberIdCounter = 1;

        public InMemoryDataService()
        {
            tourPackages = new List<TourPackage>();
            destinations = new List<Destination>();
            testimonials = new List<Testimonial>();
            inquiries = new List<Inquiry>();
            subscribers = new List<Subscriber>();

            InitializeData();
        }

        private void InitializeData()
        {
            InitializeDestinations();
            InitializeTourPackages();
            InitializeTestimonials();
        }
        
        private void InitializeTestimonials()
        {
            // Add testimonials
            testimonials.Add(new Testimonial
            {
                Id = testimonialIdCounter++,
                CustomerName = "Sarah Johnson",
                CustomerAvatar = "/images/testimonials/sarah-johnson.jpg",
                Content = "Our Sri Lanka tour was absolutely incredible! The attention to detail provided by Best Sri Lanka Tours made this trip unforgettable. From the ancient temples to the stunning beaches, everything was perfect.",
                Rating = 5,
                TourPackage = "Cultural Triangle Luxury Tour",
                CreatedAt = DateTime.Now.AddDays(-30)
            });
            
            testimonials.Add(new Testimonial
            {
                Id = testimonialIdCounter++,
                CustomerName = "James Wilson",
                CustomerAvatar = "/images/testimonials/james-wilson.jpg",
                Content = "The wildlife safari experience was beyond our expectations. Our guide was knowledgeable and made sure we saw everything - elephants, leopards, and so many birds! Highly recommend BSL Tours for anyone looking to explore Sri Lanka.",
                Rating = 5,
                TourPackage = "Sri Lanka Wildlife Safari",
                CreatedAt = DateTime.Now.AddDays(-45)
            });
            
            testimonials.Add(new Testimonial
            {
                Id = testimonialIdCounter++,
                CustomerName = "Emma Thompson",
                CustomerAvatar = "/images/testimonials/emma-thompson.jpg",
                Content = "From gorgeous tea plantations to breathtaking ocean views, our customized tour with BSL was simply perfect. The hotels were luxurious and the private transportation made everything so convenient.",
                Rating = 5,
                TourPackage = "Southern Coast Escape",
                CreatedAt = DateTime.Now.AddDays(-60)
            });
            
            testimonials.Add(new Testimonial
            {
                Id = testimonialIdCounter++,
                CustomerName = "Michael Chen",
                CustomerAvatar = "/images/testimonials/michael-chen.jpg",
                Content = "Traveling with BSL Tours allowed us to discover the real Sri Lanka. The cultural insights and authentic experiences made this trip special. The accommodations exceeded our expectations!",
                Rating = 4,
                TourPackage = "Authentic Sri Lanka Experience",
                CreatedAt = DateTime.Now.AddDays(-90)
            });
        }
        
        private void InitializeDestinations()
        {
            // Sigiriya Rock Fortress
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Sigiriya Rock Fortress",
                Slug = "sigiriya-rock-fortress",
                Description = "Ancient rock fortress with panoramic views and stunning frescoes",
                Images = new DestinationImageSet
                {
                   BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743213326/sigiriya-rock-fortress_f2zjap.jpg"
                },
                Featured = true,
                
                // Location information
                Region = "Cultural Triangle",
                Latitude = "7.9572",
                Longitude = "80.7603",
                Address = "Sigiriya, Sri Lanka",
                
                // Extended information
                ShortDescription = "An ancient rock fortress and palace with spectacular views",
                FullDescription = "Rising dramatically from the central plains, the iconic rocky outcrop of Sigiriya is perhaps Sri Lanka's most dramatic sight. Near-vertical walls soar to a flat-topped summit that contains the ruins of an ancient civilization, thought to be once the epicenter of the short-lived kingdom of Kassapa.",
                Highlights = new List<string> { "Lion's Paw Entrance", "Ancient Frescoes", "Mirror Wall", "Water Gardens", "Panoramic Summit Views" },
                
                // Planning information
                BestTimeToVisit = "January to April",
                RecommendedDuration = "1-2 Days",
                WeatherInfo = "The dry season from January to April offers the most pleasant weather for climbing",
                TravelTips = new List<string>
                {
                    "Visit early morning to avoid crowds and heat",
                    "Bring plenty of water for the climb",
                    "Wear comfortable shoes for steep staircases",
                    "Allow 3-4 hours for the complete experience"
                },
                
                // Gallery Images
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "/images/activities/photo-1583087253076-5d1315860eb8.jpg", Alt = "Sigiriya Rock Fortress - Main View" },
                    new GalleryImage { Url = "/images/activities/photo-1627894966831-0c839fa78bfd.jpg", Alt = "Sigiriya Rock Fortress - Ancient Frescoes" },
                    new GalleryImage { Url = "/images/activities/photo-1531259922615-206732e4349f.jpg", Alt = "Sigiriya Rock Fortress - Water Gardens" },
                    new GalleryImage { Url = "/images/activities/photo-1531259922615-206732e4349r.jpg", Alt = "Sigiriya Rock Fortress - Water Gardens" },
                    new GalleryImage { Url = "/images/activities/photo-1531259922615-206732e4349t.jpg", Alt = "Sigiriya Rock Fortress - Water Gardens" },
                    new GalleryImage { Url = "/images/activities/photo-1531259922615-206732e4349d.jpg", Alt = "Sigiriya Rock Fortress - Water Gardens" },
                    new GalleryImage { Url = "/images/activities/photo-1531259922615-206732e4349s.jpg", Alt = "Sigiriya Rock Fortress - Water Gardens" },
                    new GalleryImage { Url = "/images/activities/photo-1618846042125-0a64dc7c360u.jpg", Alt = "Sigiriya Rock Fortress - Summit View" }
                },
                
                // Activities
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Guided Historical Tour",
                        Description = "Explore the ancient fortress with expert archaeologists who bring the history to life",
                        ImageUrl = "/images/activities/sigiriya-guided-tour.jpg"
                    },
                    new Activity
                    {
                        Title = "Sunrise Photography",
                        Description = "Capture the amazing sunrise views with special early access before regular opening hours",
                        ImageUrl = "/images/activities/sigiriya-sunrise.jpg"
                    }
                },
                
                // FAQs
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "How difficult is the climb to the top of Sigiriya?",
                        Answer = "The climb involves approximately 1,200 steps and takes about 1.5 hours for the average person. While steep in places, there are plenty of rest points along the way."
                    },
                    new FAQ
                    {
                        Question = "Can I visit Sigiriya and Dambulla in one day?",
                        Answer = "Yes, many visitors combine these two UNESCO sites in a single day trip, although having more time allows for a more relaxed experience."
                    }
                },
                
                CreatedAt = DateTime.Now
            });

            // Galle Fort
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Galle Fort",
                Slug = "galle-fort",
                Description = "Colonial charm with boutique hotels, cafes and ocean views",
                Images = new DestinationImageSet
                {
                    BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg"
                },

                Featured = true,

                // Location
                Region = "Southern Coast",
                Latitude = "6.0269",
                Longitude = "80.2167",
                Address = "Galle, Sri Lanka",

                // Extended Info
                ShortDescription = "A preserved colonial-era fortress with charming streets and sweeping ocean views",
                FullDescription = "The historic Galle Fort, built by the Portuguese and later fortified by the Dutch in the 17th century, stands as one of Sri Lanka's most atmospheric colonial treasures. This UNESCO World Heritage site encompasses an entire peninsula, featuring charming cobblestone streets lined with Dutch colonial buildings, trendy cafes, luxury boutiques, and stylish hotels.",

                Highlights = new List<string>
    {
        "Rampart Walls",
        "Dutch Reformed Church",
        "Lighthouse",
        "Maritime Museum",
        "Boutique Shopping"
    },

                GalleryImages = new List<GalleryImage>
    {
        new() { Url = "/images/activities/photo-1592454869436-cfee29fafa29.jpg", Alt = "Galle Fort - Ramparts View" },
        new() { Url = "/images/activities/photo-1583087253076-5d1315860eb8.jpg", Alt = "Galle Fort - Lighthouse" },
        new() { Url = "/images/activities/photo-1591331686811-80ebb77d0813.jpg", Alt = "Galle Fort - Colonial Architecture" },
        new() { Url = "/images/activities/photo-1591331686811-80ebb77d0814.jpg", Alt = "Galle Fort - Colonial Architecture" },
        new() { Url = "/images/activities/photo-1591331686811-80ebb77d0815.jpg", Alt = "Galle Fort - Colonial Architecture" },
        new() { Url = "/images/activities/photo-1591331686811-80ebb77d0816.jpg", Alt = "Galle Fort - Colonial Architecture" },
        new() { Url = "/images/activities/photo-1591331686811-80ebb77d0817.jpg", Alt = "Galle Fort - Colonial Architecture" },
        new() { Url = "/images/activities/photo-1591331686811-80ebb77d0819.jpg", Alt = "Galle Fort - Colonial Architecture" }
    },

                FAQs = new List<FAQ>
    {
        new() {
            Question = "How long does it take to walk around the Galle Fort ramparts?",
            Answer = "A leisurely walk along the entire circumference of the fort walls takes approximately 1-1.5 hours, though many visitors spend longer to enjoy the views and take photographs."
        },
        new() {
            Question = "Are there entrance fees to visit Galle Fort?",
            Answer = "The fort itself is free to enter and explore. Some individual attractions within the fort, such as museums, may charge modest entrance fees."
        }
    },

                Features = new List<Feature>
    {
        new() {
            Title = "Colonial Heritage Walk",
            Description = "Uncover stories of Portuguese and Dutch rule with a private expert guide through the cobblestone alleys.",
            Icon = "heritage-walk",
            ImageUrl = "/images/icons/heritage-walk.svg"
        },
        new() {
            Title = "Boutique Stays Inside the Fort",
            Description = "Stay in restored colonial mansions turned luxury hotels for a truly immersive experience.",
            Icon = "boutique-hotel",
            ImageUrl = "/images/icons/boutique-hotel.svg"
        },
        new() {
            Title = "Sunset Rampart Views",
            Description = "Enjoy sunset walks along the fort's walls with sweeping ocean views and salty breezes.",
            Icon = "sunset",
            ImageUrl = "/images/icons/sunset.svg"
        },
        new() {
            Title = "Café & Art Scene",
            Description = "Sip espresso, explore galleries, and shop at artisan boutiques in this vibrant cultural enclave.",
            Icon = "coffee-art",
            ImageUrl = "/images/icons/coffee.svg"
        }
    },

                Sections = new List<Section>
    {
        new() {
            Type = "text",
            Title = "Why Visit Galle Fort?",
            Content = "Galle Fort offers an irresistible mix of colonial charm, coastal breezes, and cultural depth. Walk its cobbled lanes, sip iced coffee with a sea view, and uncover centuries of layered history."
        },
        new() {
            Type = "quote",
            Author = "Lonely Planet",
            Content = "\"One of the best-preserved sea forts in Asia, and easily the most atmospheric place in Sri Lanka.\""
        },
        new() {
            Type = "video",
            Title = "Aerial Tour of Galle Fort",
            Content = "https://www.youtube.com/embed/your-video-id"
        }
    },

                LocalExperiences = new List<LocalExperience>
    {
        new() {
            Title = "Galle Fort Heritage Walk",
            Description = "A curated tour led by a local historian exploring key landmarks inside the fort.",
            ImageUrl = "/images/experiences/heritage-walk.jpg"
        },
        new() {
            Title = "Sunset at the Lighthouse",
            Description = "Stroll to the iconic Galle lighthouse and enjoy panoramic views at dusk.",
            ImageUrl = "/images/experiences/sunset-lighthouse.jpg"
        },
        new() {
            Title = "Artisan Shopping Trail",
            Description = "Browse handmade jewelry, batik fabrics, and crafts from local artists.",
            ImageUrl = "/images/experiences/shopping-trail.jpg"
        }
    },

                // Practical info
                BestTimeToVisit = "November to April",
                NearestAirport = "Mattala Rajapaksa International Airport (HRI)",
                TransportOptions = new List<string> { "Private driver", "Scenic train ride to Galle", "Tuk-tuk from nearby areas" },
                TravelTips = new List<string>
    {
        "Wear comfortable shoes for walking the ramparts and cobblestone streets.",
        "Bring a hat and sunscreen, especially for midday sun.",
        "Most shops close early — plan visits before 7 PM."
    },

                // SEO
                MetaTitle = "Explore Galle Fort | Southern Coast Sri Lanka",
                MetaDescription = "Discover Galle Fort, a UNESCO World Heritage site full of colonial charm, ocean views, boutique hotels, and artful streets in southern Sri Lanka.",
                MetaKeywords = new List<string> { "Galle Fort", "Sri Lanka", "UNESCO", "Colonial", "Luxury Travel", "Southern Coast" },

                // Tags and category
                Tags = new List<string> { "UNESCO", "Colonial", "Coastal", "Luxury", "Cultural" },
                Category = "Historic Site",

                CreatedAt = DateTime.Now
            });

            // Mirissa
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Mirissa",
                Slug = "mirissa",
                Description = "Idyllic beach destination famous for whale watching and surfing",
                Images = new DestinationImageSet
                {
                    BaseUrl = ""
                },
                Featured = true,
                
                // Location information
                Region = "Southern Coast",
                Latitude = "5.9483",
                Longitude = "80.4716",
                Address = "Mirissa, Sri Lanka",
                
                // Extended information
                ShortDescription = "A paradise beach destination with whale watching and vibrant coastal atmosphere",
                FullDescription = "Mirissa offers the perfect blend of relaxation and adventure along Sri Lanka's southern coastline. With its crescent-shaped beach lined with palm trees, it's the ideal spot for swimming and surfing. The town is world-renowned for blue whale watching, offering some of the most reliable sightings globally from December to April.",
                Highlights = new List<string> { "Whale Watching", "Surfing", "Coconut Tree Hill", "Secret Beach", "Parrot Rock Bridge" },
                
                // Planning information
                BestTimeToVisit = "December to April",
                RecommendedDuration = "2-3 Days",
                WeatherInfo = "Peak season is from December to April with calm seas and sunny weather, perfect for whale watching",
                TravelTips = new List<string>
                {
                    "Book whale watching tours in advance during peak season",
                    "Visit Coconut Tree Hill for sunset",
                    "Try the fresh seafood restaurants along the beach",
                    "Consider staying in beachfront accommodations for the best experience"
                },
                
                // Gallery Images
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "/images/destinations/mirissa-beach.jpg", Alt = "Mirissa Beach Sunset" },
                    new GalleryImage { Url = "/images/destinations/mirissa-whale-watching.jpg", Alt = "Blue Whale Sighting" },
                    new GalleryImage { Url = "/images/destinations/mirissa-coconut-hill.jpg", Alt = "Coconut Tree Hill" },
                    new GalleryImage { Url = "/images/destinations/mirissa-surfing.jpg", Alt = "Surfing in Mirissa" },
                    new GalleryImage { Url = "/images/destinations/mirissa-parrot-rock.jpg", Alt = "Parrot Rock" }
                },
                
                // Activities
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Blue Whale Watching",
                        Description = "Set sail early morning for spectacular sightings of blue whales, sperm whales, and dolphins",
                        ImageUrl = "/images/activities/mirissa-whale-watching-tour.jpg"
                    },
                    new Activity
                    {
                        Title = "Surfing Lessons",
                        Description = "Learn to surf with experienced instructors on Mirissa's gentle waves, perfect for beginners",
                        ImageUrl = "/images/activities/mirissa-surfing.jpg"
                    },
                    new Activity
                    {
                        Title = "Sunset Sailing",
                        Description = "Cruise along the coastline at sunset with refreshments and swimming stops",
                        ImageUrl = "/images/activities/mirissa-sunset-cruise.jpg"
                    }
                },
                
                // FAQs
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "What is the best time for whale watching in Mirissa?",
                        Answer = "The peak whale watching season runs from December to April when blue whales migrate through the waters off Mirissa. Tours typically start early morning when seas are calmest."
                    },
                    new FAQ
                    {
                        Question = "Is Mirissa suitable for families?",
                        Answer = "Yes, Mirissa offers family-friendly beaches, accommodations, and activities. The main beach has sections with gentle waves perfect for children, though parental supervision is always recommended."
                    }
                },
                
                CreatedAt = DateTime.Now
            });
            
            // Ella
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Ella",
                Slug = "ella",
                Description = "Scenic hill country town with spectacular hiking, tea plantations and the famous Nine Arch Bridge",
                Images = new DestinationImageSet
                {
                    BaseUrl = ""
                },
                Featured = true,
                
                // Location information
                Region = "Hill Country",
                Latitude = "6.8667",
                Longitude = "81.0466",
                Address = "Ella, Sri Lanka",
                
                // Extended information
                ShortDescription = "A charming mountain village surrounded by tea plantations and hiking trails",
                FullDescription = "Nestled in the misty highlands of Sri Lanka, Ella captivates visitors with its breathtaking mountain views, verdant tea plantations, and relaxed atmosphere. Famous for the iconic Nine Arch Bridge, Little Adam's Peak, and Ella Rock, this hill station offers a perfect blend of adventure and tranquility. The spectacular train journey from Kandy to Ella is considered one of the world's most beautiful rail trips.",
                Highlights = new List<string> { "Nine Arch Bridge", "Little Adam's Peak", "Ella Rock", "Tea Plantations", "Ravana Falls" },
                
                // Planning information
                BestTimeToVisit = "January to May",
                RecommendedDuration = "2-3 Days",
                WeatherInfo = "Generally cooler than coastal areas with occasional mist and rain. Mornings are typically clearest for views.",
                TravelTips = new List<string>
                {
                    "Take the scenic train journey from Kandy or Nuwara Eliya",
                    "Visit Nine Arch Bridge early morning to avoid crowds",
                    "Book accommodation in advance during peak season",
                    "Bring layers as temperatures can drop in the evenings"
                },
                
                // Gallery Images
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "/images/destinations/ella-nine-arch-bridge.jpg", Alt = "Nine Arch Bridge with Train" },
                    new GalleryImage { Url = "/images/destinations/ella-little-adams-peak.jpg", Alt = "Little Adam's Peak View" },
                    new GalleryImage { Url = "/images/destinations/ella-tea-plantations.jpg", Alt = "Tea Plantations" },
                    new GalleryImage { Url = "/images/destinations/ella-rock.jpg", Alt = "Ella Rock Hike" },
                    new GalleryImage { Url = "/images/destinations/ravana-falls.jpg", Alt = "Ravana Falls" }
                },
                
                // Activities
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Nine Arch Bridge Visit",
                        Description = "Witness trains crossing the iconic colonial-era bridge surrounded by lush tea plantations",
                        ImageUrl = "/images/activities/nine-arch-bridge-visit.jpg"
                    },
                    new Activity
                    {
                        Title = "Little Adam's Peak Hike",
                        Description = "An easy 2-hour round trip hike offering spectacular panoramic views of the Ella Gap",
                        ImageUrl = "/images/activities/little-adams-peak-hike.jpg"
                    },
                    new Activity
                    {
                        Title = "Tea Factory Tour",
                        Description = "Learn about the tea-making process from plucking to processing with tasting session",
                        ImageUrl = "/images/activities/tea-factory-tour.jpg"
                    }
                },
                
                // FAQs
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "How do I get to Nine Arch Bridge?",
                        Answer = "The bridge is about 2km from Ella town. You can take a tuk-tuk, or walk following the railway tracks from Ella station for about 30 minutes. There are also several cafes overlooking the bridge where you can relax and wait for trains to pass."
                    },
                    new FAQ
                    {
                        Question = "Is the train from Kandy to Ella worth it?",
                        Answer = "Absolutely! This 7-hour journey is considered one of the world's most scenic train rides. The stretch between Nanu Oya (Nuwara Eliya) and Ella is particularly spectacular. Book 2nd or 3rd class seats in advance for the best views."
                    }
                },
                
                CreatedAt = DateTime.Now
            });
            
            // Nuwara Eliya
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Nuwara Eliya",
                Slug = "nuwara-eliya",
                Description = "Sri Lanka's 'Little England' with colonial architecture and rolling tea plantations",
                Images = new DestinationImageSet { BaseUrl = "" },
                Featured = true,
                
                // Location information
                Region = "Hill Country",
                Latitude = "6.9497",
                Longitude = "80.7891",
                Address = "Nuwara Eliya, Sri Lanka",
                
                // Extended information
                ShortDescription = "A charming colonial hill station surrounded by tea estates and cool climate",
                FullDescription = "Nestled among the verdant hills of central Sri Lanka, Nuwara Eliya is known as 'Little England' for its colonial architecture and cool, misty climate. Founded as a British hill resort in the 19th century, the town retains much of its colonial charm with Tudor-style country cottages, a golf course, and manicured gardens. Surrounded by picturesque tea plantations, it's the heart of Sri Lanka's tea country.",
                Highlights = new List<string> { "Tea Plantations", "Gregory Lake", "Victoria Park", "Horton Plains National Park", "Colonial Architecture" },
                
                // Planning information
                BestTimeToVisit = "February to May",
                RecommendedDuration = "2-3 Days",
                WeatherInfo = "Cool climate year-round with temperatures between 10-20°C. April is the driest month, while the southwest monsoon brings rain from May to July.",
                TravelTips = new List<string>
                {
                    "Pack warm clothing as evenings can be quite chilly",
                    "Visit during the Nuwara Eliya Season (April) for special events and races",
                    "Try high tea at the Grand Hotel for a colonial experience",
                    "Start early for day trips to Horton Plains to catch clear views"
                },
                
                // Gallery Images
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "/images/destinations/nuwara-eliya-tea-plantations.jpg", Alt = "Tea Plantations" },
                    new GalleryImage { Url = "/images/destinations/nuwara-eliya-gregory-lake.jpg", Alt = "Gregory Lake" },
                    new GalleryImage { Url = "/images/destinations/nuwara-eliya-colonial-architecture.jpg", Alt = "Colonial Buildings" },
                    new GalleryImage { Url = "/images/destinations/nuwara-eliya-victoria-park.jpg", Alt = "Victoria Park" },
                    new GalleryImage { Url = "/images/destinations/horton-plains.jpg", Alt = "Horton Plains National Park" }
                },
                
                // Activities
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Tea Plantation Tour",
                        Description = "Visit historic tea factories to learn about production and sample the world-famous Ceylon tea",
                        ImageUrl = "/images/activities/tea-plantation-tour.jpg"
                    },
                    new Activity
                    {
                        Title = "Horton Plains & World's End Excursion",
                        Description = "Early morning trek to World's End, a spectacular 880m cliff drop with panoramic views",
                        ImageUrl = "/images/activities/horton-plains-excursion.jpg"
                    },
                    new Activity
                    {
                        Title = "Golf at Nuwara Eliya Golf Club",
                        Description = "Play at one of Asia's oldest golf courses surrounded by breathtaking mountain scenery",
                        ImageUrl = "/images/activities/nuwara-eliya-golf.jpg"
                    }
                },
                
                // FAQs
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "What is the best tea plantation to visit near Nuwara Eliya?",
                        Answer = "Pedro Tea Estate offers excellent guided tours just 3km from town. Mackwoods and Bluefield tea factories are also popular choices with beautiful viewpoints and detailed production tours."
                    },
                    new FAQ
                    {
                        Question = "How do I get to Horton Plains from Nuwara Eliya?",
                        Answer = "Horton Plains is about 32km from Nuwara Eliya. Most visitors hire a vehicle with driver (about 1 hour journey) or join an organized tour. Start by 6am to reach before the mist forms at World's End."
                    }
                },
                
                CreatedAt = DateTime.Now
            });
            
            // Kandy
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Kandy",
                Slug = "kandy",
                Description = "Cultural capital of Sri Lanka and home to the sacred Temple of the Tooth Relic",
                Images = new DestinationImageSet {BaseUrl = "" },
                Featured = true,
                
                // Location information
                Region = "Central Province",
                Latitude = "7.2906",
                Longitude = "80.6337",
                Address = "Kandy, Sri Lanka",
                
                // Extended information
                ShortDescription = "The last royal capital of Sri Lanka with rich cultural heritage and natural beauty",
                FullDescription = "Set around a picturesque lake in the central highlands, Kandy is Sri Lanka's cultural heart and a UNESCO World Heritage site. The city served as the last capital of the Sri Lankan kings before falling to the British in 1815. Home to the sacred Temple of the Tooth Relic, Kandy maintains its status as a center of Buddhism and Sinhalese culture, with the spectacular Esala Perahera festival held annually.",
                Highlights = new List<string> { "Temple of the Sacred Tooth Relic", "Kandy Lake", "Royal Botanical Gardens", "Cultural Performances", "Bahiravokanda Vihara Buddha Statue" },
                
                // Planning information
                BestTimeToVisit = "January to April, August for Esala Perahera Festival",
                RecommendedDuration = "2-3 Days",
                WeatherInfo = "Moderate climate year-round with temperatures between 20-25°C. The driest period is from January to April.",
                TravelTips = new List<string>
                {
                    "Dress modestly when visiting temples (shoulders and knees covered)",
                    "Visit the Temple of the Tooth during a puja (offering) ceremony",
                    "Book accommodation well in advance if visiting during Esala Perahera (July/August)",
                    "Consider the scenic train journey to or from Ella/Nuwara Eliya"
                },
                
                // Gallery Images
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "/images/destinations/kandy-temple-of-tooth.jpg", Alt = "Temple of the Sacred Tooth Relic" },
                    new GalleryImage { Url = "/images/destinations/kandy-lake.jpg", Alt = "Kandy Lake" },
                    new GalleryImage { Url = "/images/destinations/kandy-peradeniya-gardens.jpg", Alt = "Royal Botanical Gardens" },
                    new GalleryImage { Url = "/images/destinations/kandy-cultural-dance.jpg", Alt = "Kandyan Cultural Dance" },
                    new GalleryImage { Url = "/images/destinations/kandy-buddha-statue.jpg", Alt = "Bahiravokanda Vihara Buddha" }
                },
                
                // Activities
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Temple of the Tooth Relic Visit",
                        Description = "Experience the revered Buddhist temple housing a tooth of the Buddha, with evening ritual ceremonies",
                        ImageUrl = "/images/activities/temple-tooth-visit.jpg"
                    },
                    new Activity
                    {
                        Title = "Kandyan Cultural Dance Show",
                        Description = "Witness traditional Sri Lankan dance, music, and fire-walking performances in colorful costumes",
                        ImageUrl = "/images/activities/kandyan-dance-show.jpg"
                    },
                    new Activity
                    {
                        Title = "Royal Botanical Gardens Tour",
                        Description = "Explore one of Asia's finest botanical gardens with over 4,000 plant species including the famous orchid house",
                        ImageUrl = "/images/activities/botanical-gardens-tour.jpg"
                    }
                },
                
                // FAQs
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "What is the best time to visit the Temple of the Tooth?",
                        Answer = "Visit during one of the daily puja ceremonies (5:30am, 9:30am, 6:30pm) when the room housing the tooth relic is open to devotees. Arrive 30 minutes early to secure a good viewing position."
                    },
                    new FAQ
                    {
                        Question = "When is the Esala Perahera festival held?",
                        Answer = "This spectacular 10-day festival typically occurs in July or August (dates vary by lunar calendar). The grand procession features elaborately decorated elephants, traditional dancers, drummers, and fire performers."
                    }
                },
                
                CreatedAt = DateTime.Now
            });
            
            // Yala National Park
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Yala National Park",
                Slug = "yala-national-park",
                Description = "Premier wildlife sanctuary with the world's highest leopard density",
                Images = new DestinationImageSet {BaseUrl = "" },
                Featured = true,
                
                // Location information
                Region = "Southern Province",
                Latitude = "6.3620",
                Longitude = "81.5159",
                Address = "Yala, Sri Lanka",
                
                // Extended information
                ShortDescription = "Sri Lanka's most famous wildlife reserve, known for leopard sightings and diverse ecosystems",
                FullDescription = "Spanning over 979 square kilometers, Yala National Park is Sri Lanka's most visited wildlife sanctuary and one of the best places in the world to spot leopards. The park comprises five blocks, of which two are open to the public, featuring diverse landscapes from semi-arid plains to lagoons and rocky outcrops. Besides its famous leopards, Yala hosts elephants, sloth bears, crocodiles, and nearly 215 bird species.",
                Highlights = new List<string> { "Leopard Spotting", "Elephant Herds", "Coastal Ecosystems", "Bird Watching", "Ancient Ruins" },
                
                // Planning information
                BestTimeToVisit = "February to July",
                RecommendedDuration = "2-3 Days",
                WeatherInfo = "Dry season from May to August offers the best wildlife viewing as animals gather around water sources. The park may close sections during September/October for maintenance.",
                TravelTips = new List<string>
                {
                    "Book safari jeeps and accommodations well in advance",
                    "Morning safaris (6am) offer the best wildlife viewing opportunities",
                    "Bring binoculars, camera with zoom lens, and neutral-colored clothing",
                    "Stay hydrated and wear sun protection during safaris"
                },
                
                // Gallery Images
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "/images/destinations/yala-leopard.jpg", Alt = "Yala Leopard" },
                    new GalleryImage { Url = "/images/destinations/yala-elephant.jpg", Alt = "Wild Elephants" },
                    new GalleryImage { Url = "/images/destinations/yala-landscape.jpg", Alt = "Park Landscape" },
                    new GalleryImage { Url = "/images/destinations/yala-sloth-bear.jpg", Alt = "Sloth Bear" },
                    new GalleryImage { Url = "/images/destinations/yala-birds.jpg", Alt = "Bird Life" }
                },
                
                // Activities
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Full-Day Safari",
                        Description = "Comprehensive safari experience with expert naturalist guides focusing on leopard and other wildlife viewing",
                        ImageUrl = "/images/activities/yala-full-day-safari.jpg"
                    },
                    new Activity
                    {
                        Title = "Bird Watching Tour",
                        Description = "Specialized safari focusing on Yala's rich avian diversity including migrants and endemic species",
                        ImageUrl = "/images/activities/yala-bird-watching.jpg"
                    },
                    new Activity
                    {
                        Title = "Leopard Tracking Experience",
                        Description = "Safari dedicated to tracking the elusive Sri Lankan leopard with specialist guides",
                        ImageUrl = "/images/activities/leopard-tracking.jpg"
                    }
                },
                
                // FAQs
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "What are the chances of seeing a leopard at Yala?",
                        Answer = "Yala has the highest leopard density in the world, so chances are good, especially in Block 1. However, sightings are never guaranteed. Morning and late afternoon provide the best opportunities as leopards are most active during cooler hours."
                    },
                    new FAQ
                    {
                        Question = "Should I book a private safari or join a shared one?",
                        Answer = "Private safaris offer flexibility, better wildlife viewing positions, and can be customized to your interests. Shared safaris are more economical but may involve compromises on timing and viewing preferences. For serious wildlife enthusiasts, a private safari is recommended."
                    }
                },
                
                CreatedAt = DateTime.Now
            });
            
            // Polonnaruwa
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Polonnaruwa",
                Slug = "polonnaruwa",
                Description = "Medieval capital with well-preserved ancient ruins and monuments",
                Images = new DestinationImageSet {BaseUrl = "" },
                Featured = false,
                
                // Location information
                Region = "Cultural Triangle",
                Latitude = "7.9403",
                Longitude = "81.0188",
                Address = "Polonnaruwa, Sri Lanka",
                
                // Extended information
                ShortDescription = "Sri Lanka's second ancient capital with impressive archaeological treasures",
                FullDescription = "Polonnaruwa served as Sri Lanka's second capital from the 11th to 13th centuries and is now a UNESCO World Heritage site. The remarkably well-preserved archaeological park contains stunning stone temples, enormous Buddha statues, ancient palaces, and an impressive irrigation system that highlights the advanced engineering of the era. The compact nature of the site makes it perfect for exploring by bicycle.",
                Highlights = new List<string> { "Gal Vihara", "Quadrangle", "Rankot Vihara", "Royal Palace", "Ancient Irrigation System" },
                
                // Planning information
                BestTimeToVisit = "December to March",
                RecommendedDuration = "1-2 Days",
                WeatherInfo = "Hot and relatively dry year-round. The cooler months from December to March offer the most comfortable visiting conditions.",
                TravelTips = new List<string>
                {
                    "Visit the Archaeological Museum first for context",
                    "Rent bicycles to explore the expansive site easily",
                    "Start early morning or late afternoon to avoid midday heat",
                    "Wear comfortable footwear as there's considerable walking between sites"
                },
                
                // Gallery Images
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "/images/destinations/polonnaruwa-gal-vihara.jpg", Alt = "Gal Vihara Buddha Statues" },
                    new GalleryImage { Url = "/images/destinations/polonnaruwa-vatadage.jpg", Alt = "Vatadage" },
                    new GalleryImage { Url = "/images/destinations/polonnaruwa-rankot-vihara.jpg", Alt = "Rankot Vihara Stupa" },
                    new GalleryImage { Url = "/images/destinations/polonnaruwa-royal-palace.jpg", Alt = "Royal Palace Ruins" },
                    new GalleryImage { Url = "/images/destinations/polonnaruwa-parakrama-samudra.jpg", Alt = "Parakrama Samudra Reservoir" }
                },
                
                // Activities
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Archaeological Tour with Historian",
                        Description = "In-depth guided exploration of the ancient city with expert historical context",
                        ImageUrl = "/images/activities/polonnaruwa-tour.jpg"
                    },
                    new Activity
                    {
                        Title = "Bicycle Tour of Ancient City",
                        Description = "Cycling exploration of the expansive archaeological park with key monument stops",
                        ImageUrl = "/images/activities/polonnaruwa-bicycle.jpg"
                    },
                    new Activity
                    {
                        Title = "Sunrise Photography at Ancient Ruins",
                        Description = "Special early access for photographers to capture the monuments in the golden light",
                        ImageUrl = "/images/activities/polonnaruwa-sunrise.jpg"
                    }
                },
                
                // FAQs
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "Is it better to hire a guide at Polonnaruwa?",
                        Answer = "A knowledgeable guide significantly enhances the experience by providing historical context and explaining the significance of structures that might otherwise look like simple ruins. Guides can be hired at the museum or arranged through your hotel."
                    },
                    new FAQ
                    {
                        Question = "How does Polonnaruwa compare to Anuradhapura?",
                        Answer = "Polonnaruwa is more compact and has better-preserved monuments than Anuradhapura. If you're short on time, Polonnaruwa offers a more accessible archaeological experience. However, Anuradhapura has greater religious significance and older structures."
                    }
                },
                
                CreatedAt = DateTime.Now
            });
            
            // Anuradhapura
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Anuradhapura",
                Slug = "anuradhapura",
                Description = "Sri Lanka's ancient first capital and sacred Buddhist pilgrimage site",
                Images = new DestinationImageSet {BaseUrl = "" },
                Featured = false,
                
                // Location information
                Region = "Cultural Triangle",
                Latitude = "8.3114",
                Longitude = "80.4037",
                Address = "Anuradhapura, Sri Lanka",
                
                // Extended information
                ShortDescription = "A sprawling UNESCO World Heritage site with sacred Buddhist monuments",
                FullDescription = "Founded in the 4th century BC, Anuradhapura served as Sri Lanka's first capital for nearly 1,400 years. This UNESCO World Heritage site spreads across a vast area with dagobas (stupas), temples, ancient pools, and palaces. The city remains a living sacred site with the Sri Maha Bodhi, a tree grown from a cutting of the Buddha's original Bodhi tree, attracting pilgrims from around the world.",
                Highlights = new List<string> { "Sri Maha Bodhi", "Ruwanwelisaya Stupa", "Jetavanaramaya", "Isurumuniya Temple", "Abhayagiri Monastery" },
                
                // Planning information
                BestTimeToVisit = "June to September",
                RecommendedDuration = "2 Days",
                WeatherInfo = "Hot year-round with June to September being relatively drier. Early mornings and late afternoons offer the most comfortable temperatures for exploration.",
                TravelTips = new List<string>
                {
                    "Rent bicycles or book a tuk-tuk for the day to cover the extensive site",
                    "Bring plenty of water and sun protection",
                    "Wear white or light clothing when visiting Sri Maha Bodhi as a sign of respect",
                    "Consider visiting during a full moon (Poya) day to experience Buddhist ceremonies"
                },
                
                // Gallery Images
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "/images/destinations/anuradhapura-ruwanwelisaya.jpg", Alt = "Ruwanwelisaya Stupa" },
                    new GalleryImage { Url = "/images/destinations/anuradhapura-sri-maha-bodhi.jpg", Alt = "Sri Maha Bodhi Tree" },
                    new GalleryImage { Url = "/images/destinations/anuradhapura-jetavanaramaya.jpg", Alt = "Jetavanaramaya Stupa" },
                    new GalleryImage { Url = "/images/destinations/anuradhapura-abhayagiri.jpg", Alt = "Abhayagiri Monastery" },
                    new GalleryImage { Url = "/images/destinations/anuradhapura-moonstone.jpg", Alt = "Ancient Moonstone" }
                },
                
                // Activities
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Sacred City Tour",
                        Description = "Comprehensive guided tour of the ancient sacred city with focus on Buddhist monuments",
                        ImageUrl = "/images/activities/anuradhapura-tour.jpg"
                    },
                    new Activity
                    {
                        Title = "Mihintale Excursion",
                        Description = "Visit the nearby mountain sanctuary where Buddhism was first introduced to Sri Lanka",
                        ImageUrl = "/images/activities/mihintale-excursion.jpg"
                    },
                    new Activity
                    {
                        Title = "Evening Worship at Sri Maha Bodhi",
                        Description = "Experience the atmospheric evening ceremonies around the sacred Bodhi tree",
                        ImageUrl = "/images/activities/sri-maha-bodhi-evening.jpg"
                    }
                },
                
                // FAQs
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "Do I need to purchase separate tickets for each site in Anuradhapura?",
                        Answer = "No, a single Cultural Triangle ticket or Anuradhapura Archaeological Park ticket covers most major sites. The Sri Maha Bodhi has a separate entrance fee. Some monasteries may request additional small donations."
                    },
                    new FAQ
                    {
                        Question = "What's the significance of the Sri Maha Bodhi tree?",
                        Answer = "The Sri Maha Bodhi is believed to be grown from a cutting of the original Bodhi tree in India under which the Buddha attained enlightenment. Planted in 288 BC, it's the oldest documented tree in the world and one of Buddhism's most sacred sites."
                    }
                },
                
                CreatedAt = DateTime.Now
            });
            
            // Arugam Bay
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Arugam Bay",
                Slug = "arugam-bay",
                Description = "World-class surfing destination on Sri Lanka's east coast",
                Images = new DestinationImageSet {BaseUrl = "" },
                Featured = false,
                
                // Location information
                Region = "Eastern Province",
                Latitude = "6.8428",
                Longitude = "81.8341",
                Address = "Arugam Bay, Sri Lanka",
                
                // Extended information
                ShortDescription = "A laid-back surfer's paradise with perfect point breaks and pristine beaches",
                FullDescription = "Arugam Bay has transformed from a remote fishing village to an internationally renowned surfing destination while maintaining its relaxed charm. The crescent-shaped bay offers several world-class surf points with consistent waves during the season. Beyond surfing, the area features stunning lagoons, mangrove forests, and nearby national parks, making it a perfect destination for nature lovers and beach enthusiasts alike.",
                Highlights = new List<string> { "Main Point Surf Break", "Pottuvil Lagoon", "Elephant Rock", "Kumana National Park", "Whisky Point" },
                
                // Planning information
                BestTimeToVisit = "April to October (Surf Season)",
                RecommendedDuration = "3-5 Days",
                WeatherInfo = "The surf season runs from April to October with the best waves typically from July to August. The offseason (November to March) brings more rain but fewer tourists.",
                TravelTips = new List<string>
                {
                    "Book accommodation in advance during peak surf season (July-August)",
                    "Rent motorbikes to explore the surrounding beaches and attractions",
                    "Bring your own surfboard or rent quality boards from local shops",
                    "Be aware of strong currents at some surf points - suitable for experienced surfers"
                },
                
                // Gallery Images
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "/images/destinations/arugam-bay-main-point.jpg", Alt = "Main Point Surfing" },
                    new GalleryImage { Url = "/images/destinations/arugam-bay-beach.jpg", Alt = "Arugam Bay Beach" },
                    new GalleryImage { Url = "/images/destinations/arugam-bay-elephant-rock.jpg", Alt = "Elephant Rock" },
                    new GalleryImage { Url = "/images/destinations/arugam-bay-lagoon.jpg", Alt = "Pottuvil Lagoon" },
                    new GalleryImage { Url = "/images/destinations/arugam-bay-sunset.jpg", Alt = "Beach Sunset" }
                },
                
                // Activities
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Surf Lessons",
                        Description = "Learn to surf or improve your skills with professional instructors at beginner-friendly breaks",
                        ImageUrl = "/images/activities/arugam-bay-surf-lessons.jpg"
                    },
                    new Activity
                    {
                        Title = "Lagoon Safari",
                        Description = "Early morning boat tour through mangroves to spot crocodiles, birds, and elephants",
                        ImageUrl = "/images/activities/pottuvil-lagoon-safari.jpg"
                    },
                    new Activity
                    {
                        Title = "Kumana National Park Jeep Safari",
                        Description = "Wildlife safari to spot leopards, elephants, and abundant birdlife in this coastal national park",
                        ImageUrl = "/images/activities/kumana-safari.jpg"
                    }
                },
                
                // FAQs
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "Is Arugam Bay suitable for beginner surfers?",
                        Answer = "While Main Point is best for intermediate to advanced surfers, there are several beginner-friendly breaks nearby like Baby Point and Whisky Point. Several surf schools offer lessons with experienced instructors."
                    },
                    new FAQ
                    {
                        Question = "What is there to do in Arugam Bay besides surfing?",
                        Answer = "The area offers lagoon safaris, nearby national parks for wildlife viewing, yoga classes, cooking courses, and a laid-back beach scene with restaurants and bars. The journey to Elephant Rock offers a short hike with rewarding views."
                    }
                },
                
                CreatedAt = DateTime.Now
            });
        }

        private void InitializeTourPackages()
        {
            // cultural-triangle-luxury-tour
            var culturalTour = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Excerpt = "Explore ancient cities, sacred temples, and the cultural heart of Sri Lanka with luxury accommodations.",
                Title = "Cultural Triangle Luxury Tour",
                Slug = "cultural-triangle-luxury-tour",
                Description = "Explore ancient cities, sacred temples, and the cultural heart of Sri Lanka with luxury accommodations.",
                ImageUrl = "/images/packages/cultural-triangle-luxury-tour.jpg",
                Duration = 7,
                Price = 2199M,
                Featured = true,
                Itinerary = "Day 1: Arrival in Colombo\nDay 2-3: Sigiriya and Dambulla\nDay 4: Polonnaruwa\nDay 5: Anuradhapura\nDay 6: Kandy\nDay 7: Departure",
                IncludedDestinations = new List<string> { "Sigiriya", "Dambulla", "Polonnaruwa", "Anuradhapura", "Kandy" },
                CreatedAt = DateTime.Now,
                Rating = 66,
                ReviewCount = 33,
                ItineraryDays = new List<ItineraryDay>
                {
            new ItineraryDay
            {
                Day = 1,
                Title = "Arrival in Colombo",
                Description = "Welcome to Sri Lanka! Upon arrival at Bandaranaike International Airport, you'll be greeted by your private chauffeur and transferred to your luxury hotel in Colombo. Depending on your arrival time, enjoy a brief orientation tour of Colombo's colonial heritage.",
                Image = new ImageSet
                {
                    BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743255113/colombo-arrival_nfnyz0.jpg"
                },
                Accommodation = "Shangri-La Colombo",
                Meals = new Meals { Dinner = true }
            },
            new ItineraryDay
            {
                Day = 2,
                Title = "Sigiriya Rock Fortress",
                Description = "After breakfast, transfer to Sigiriya (approximately 4 hours). In the afternoon, visit the iconic Sigiriya Rock Fortress, a UNESCO World Heritage site. Climb to the summit for panoramic views and explore the ancient frescoes and water gardens.",
                Image = new ImageSet
                {
                    BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256371/sigiriya-rock-fortress_lvgxjv.jpg"
                },
                Accommodation = "Water Garden Sigiriya",
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Sigiriya Rock Climb",
                        Description = "Guided tour of this 5th-century rock fortress with an expert archaeologist",
                        Time = "2:00 PM - 5:00 PM"
                    }
                },
                Meals = new Meals { Breakfast = true, Dinner = true }
            },
            new ItineraryDay
            {
                Day = 3,
                Title = "Dambulla Cave Temples",
                Description = "Visit the magnificent Dambulla Cave Temples in the morning, exploring five caves adorned with Buddhist murals and statues. In the afternoon, enjoy a safari at Minneriya National Park, famous for its elephant gatherings.",
                Image = new ImageSet
                {
                    BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg"
                },
                Accommodation = "Water Garden Sigiriya",
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Dambulla Cave Temple Visit",
                        Description = "Explore the ancient Buddhist cave temples dating back to the 1st century BC",
                        Time = "9:00 AM - 12:00 PM"
                    },
                    new Activity
                    {
                        Title = "Minneriya Safari",
                        Description = "Wildlife safari to spot wild elephants, deer, and various bird species",
                        Time = "3:00 PM - 6:00 PM"
                    }
                },
                Meals = new Meals { Breakfast = true, Lunch = true, Dinner = true }
            },
            new ItineraryDay
            {
                Day = 4,
                Title = "Ancient City of Polonnaruwa",
                Description = "Discover the ancient city of Polonnaruwa, Sri Lanka's second capital. Explore well-preserved ruins, impressive stone sculptures, and the famous Gal Vihara Buddha statues. In the evening, enjoy a traditional cultural performance at your hotel.",
                Image = new ImageSet
                {
                    BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg"
                },
                Accommodation = "Water Garden Sigiriya",
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Polonnaruwa Archaeological Tour",
                        Description = "Visit the ancient capital with its well-preserved stupas, palaces, and Buddha statues",
                        Time = "9:00 AM - 3:00 PM"
                    }
                },
                Meals = new Meals { Breakfast = true, Lunch = true, Dinner = true }
            },
            new ItineraryDay
            {
                Day = 5,
                Title = "Sacred City of Anuradhapura",
                Description = "Visit Anuradhapura, Sri Lanka's first capital and a UNESCO World Heritage site. Explore ancient stupas, palaces, and the sacred Sri Maha Bodhi tree. Later, travel to Kandy, stopping at a spice garden en route.",
                Image = new ImageSet
                {
                    BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg"
                },
                Accommodation = "Kings Pavilion Kandy",
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Anuradhapura Sacred City Tour",
                        Description = "Visit the first ancient capital with its dagobas, monasteries, and royal gardens",
                        Time = "8:00 AM - 1:00 PM"
                    }
                },
                Meals = new Meals { Breakfast = true, Dinner = true }
            },
            new ItineraryDay
            {
                Day = 6,
                Title = "Temple of the Sacred Tooth Relic & Botanical Gardens",
                Description = "Morning visit to the Temple of the Sacred Tooth Relic, one of Buddhism's most revered sites. Afterward, explore the Royal Botanical Gardens in Peradeniya. Evening at leisure to explore Kandy town.",
                Image = new ImageSet { BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg" },
                Accommodation = "Kings Pavilion Kandy",
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Temple of the Sacred Tooth Relic",
                        Description = "Visit the revered Buddhist temple housing Buddha's tooth relic",
                        Time = "9:00 AM - 11:00 AM"
                    },
                    new Activity
                    {
                        Title = "Peradeniya Royal Botanical Gardens",
                        Description = "Stroll through one of the finest botanical gardens in Asia",
                        Time = "2:00 PM - 4:00 PM"
                    }
                },
                Meals = new Meals { Breakfast = true, Dinner = true }
            },
            new ItineraryDay
            {
                Day = 7,
                Title = "Departure",
                Description = "After breakfast, transfer to Colombo airport for your departure flight. End of services.",
                Image = new ImageSet { BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg" },
                Meals = new Meals { Breakfast = true }
            }

                }
            };

            tourPackages.Add(culturalTour);

            // sri-lankan-beach-escape
            var beachEscape = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Excerpt = "Relax and unwind at the finest beaches of Sri Lanka's southern coast with luxury accommodations.",
                Title = "Sri Lankan Beach Escape",
                Slug = "sri-lankan-beach-escape",
                Description = "Relax and unwind at the finest beaches of Sri Lanka's southern coast with luxury accommodations.",
                ImageUrl = "/images/packages/beach-escape-tour.jpg",
                Duration = 8,
                Price = 2599M,
                Featured = true,
                Itinerary = "Day 1: Arrival in Colombo\nDay 2-3: Galle\nDay 4-5: Mirissa\nDay 6-7: Tangalle\nDay 8: Departure",
                IncludedDestinations = new List<string> { "Colombo", "Galle", "Mirissa", "Tangalle" },
                CreatedAt = DateTime.Now,
                ItineraryDays = new List<ItineraryDay>
        {
            new ItineraryDay
            {
                Day = 1,
                Title = "Arrival & Transfer to Galle",
                Description = "Arrive at Bandaranaike International Airport and transfer directly to your luxury resort in Galle (approximately 2.5 hours). Rest of the day at leisure to recover from your flight and enjoy the facilities of your stunning beachfront resort.",
                Image = new ImageSet
                {
                    BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg"
                },
                Accommodation = "Amangalla",
                Meals = new Meals { Dinner = true }
            },
            new ItineraryDay
            {
                Day = 2,
                Title = "Galle Fort Exploration",
                Description = "After breakfast, enjoy a guided walking tour of the historic Galle Fort, a UNESCO World Heritage Site. Explore its charming streets, colonial architecture, boutique shops, and cafes. Afternoon at leisure to continue exploring or relax at your resort.",
                Image = new ImageSet { BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg" },
                Accommodation = "Amangalla",
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Galle Fort Walking Tour",
                        Description = "Expert-guided tour of the colonial-era fort with its unique architecture and history",
                        Time = "9:00 AM - 12:00 PM"
                    }
                },
                Meals = new Meals { Breakfast = true, Dinner = true }
            },
            new ItineraryDay
            {
                Day = 3,
                Title = "Beach Day & Cooking Class",
                Description = "Morning at leisure to relax on the beach. In the afternoon, participate in a traditional Sri Lankan cooking class to learn about local spices and techniques. Evening sunset cocktails at a rooftop bar overlooking the Indian Ocean.",
                Image = new ImageSet { BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg" },
                Accommodation = "Amangalla",
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Sri Lankan Cooking Class",
                        Description = "Learn to prepare authentic local dishes with a professional chef",
                        Time = "2:00 PM - 4:00 PM"
                    }
                },
                Meals = new Meals { Breakfast = true, Lunch = true, Dinner = true }
            },
            new ItineraryDay
            {
                Day = 4,
                Title = "Transfer to Mirissa",
                Description = "After breakfast, transfer to Mirissa (approximately 1 hour). Check into your luxury beach resort and spend the afternoon relaxing on one of Sri Lanka's most beautiful beaches.",
                Image = new ImageSet { BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg" },
                Accommodation = "Cape Weligama",
                Meals = new Meals { Breakfast = true, Dinner = true }
            },
            new ItineraryDay
            {
                Day = 5,
                Title = "Whale Watching & Beach Relaxation",
                Description = "Early morning whale watching excursion to spot blue whales and dolphins (seasonal, November to April). Afternoon at leisure to enjoy the beach or indulge in a spa treatment at your resort.",
                Image = new ImageSet { BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg" },
                Accommodation = "Cape Weligama",
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Whale Watching Excursion",
                        Description = "Private boat tour to spot blue whales, sperm whales, and dolphins",
                        Time = "6:00 AM - 10:00 AM"
                    }
                },
                Meals = new Meals { Breakfast = true, Dinner = true }
            },
            new ItineraryDay
            {
                Day = 6,
                Title = "Transfer to Tangalle",
                Description = "After a leisurely breakfast, transfer to Tangalle (approximately 1.5 hours). Check into your exclusive beach resort and spend the rest of the day relaxing by the pool or at the pristine beach.",
                Image = new ImageSet { BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg" },
                Accommodation = "Amanwella",
                Meals = new Meals { Breakfast = true, Dinner = true }
            },
            new ItineraryDay
            {
                Day = 7,
                Title = "Tangalle Beach Day & Sea Turtle Visit",
                Description = "Day at leisure to enjoy the facilities of your resort and the beautiful Tangalle beach. In the evening, optional visit to a sea turtle conservation project to observe turtles laying eggs (seasonal).",
                Image = new ImageSet { BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg" },
                Accommodation = "Amanwella",
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Sea Turtle Conservation Visit",
                        Description = "Evening visit to a local conservation project to learn about protection efforts",
                        Time = "7:00 PM - 9:00 PM"
                    }
                },
                Meals = new Meals { Breakfast = true, Lunch = true, Dinner = true }
            },
            new ItineraryDay
            {
                Day = 8,
                Title = "Departure",
                Description = "After breakfast, transfer to Colombo airport for your departure flight (approximately 4 hours). End of services.",
                Image = new ImageSet { BaseUrl = "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg" },
                Meals = new Meals { Breakfast = true }
            }
        }
            };

            tourPackages.Add(beachEscape);

            // 3. Sri Lanka Wildlife Safari
            var wildlifeSafari = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Excerpt = "Encounter Sri Lanka's magnificent wildlife in their natural habitats across multiple national parks.",
                Title = "Sri Lanka Wildlife Safari",
                Slug = "sri-lanka-wildlife-safari",
                Description = "Experience the diverse wildlife of Sri Lanka with expert naturalist guides. Visit Yala, Udawalawe, and other renowned national parks to spot elephants, leopards, sloth bears, and hundreds of bird species.",
                ImageUrl = "/images/packages/wildlife-safari-experience-sri-lanka.jpg",
                Duration = 8,
                Price = 2499M,
                Featured = true,
                IncludedDestinations = new List<string> { "Yala National Park", "Udawalawe", "Minneriya", "Sinharaja Forest" },
                CreatedAt = DateTime.Now
            };
            tourPackages.Add(wildlifeSafari);

            // 4. Romantic Honeymoon Escape
            var honeymoonEscape = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Excerpt = "Create lasting memories with your loved one in the most romantic settings Sri Lanka has to offer.",
                Title = "Romantic Honeymoon Escape",
                Slug = "romantic-honeymoon-escape",
                Description = "Begin your journey together with this exclusive honeymoon tour combining luxury accommodations, private experiences, and the most romantic settings across Sri Lanka.",
                ImageUrl = "/images/packages/honeymoon-escape.jpg",
                Duration = 10,
                Price = 3299M,
                Featured = true,
                IncludedDestinations = new List<string> { "Bentota", "Ella", "Kandy", "Mirissa" },
                CreatedAt = DateTime.Now
            };
            tourPackages.Add(honeymoonEscape);

            // 5. Sri Lanka Hill Country & Tea Trails
            var teaTrails = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Excerpt = "Journey through misty mountains and lush tea plantations in Sri Lanka's picturesque highlands.",
                Title = "Sri Lanka Hill Country & Tea Trails",
                Slug = "sri-lanka-hill-country-tea-trails",
                Description = "Explore the verdant landscapes of Sri Lanka's central highlands. Visit historic tea factories, stay in colonial-era bungalows, and enjoy the cool climate and breathtaking scenery of Nuwara Eliya, Ella, and Hatton.",
                ImageUrl = "/images/packages/hill-country-tea-trails-sri-lanka.jpg",
                Duration = 7,
                Price = 1899M,
                Featured = false,
                IncludedDestinations = new List<string> { "Nuwara Eliya", "Ella", "Hatton", "Haputale" },
                CreatedAt = DateTime.Now
            };
            tourPackages.Add(teaTrails);

            // 6. Sri Lanka Family Adventure
            var familyAdventure = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Excerpt = "Create memorable experiences for the whole family with the perfect blend of culture, wildlife, and beach activities.",
                Title = "Sri Lanka Family Adventure",
                Slug = "sri-lanka-family-adventure",
                Description = "This family-friendly tour combines educational experiences, wildlife encounters, and fun beach activities suitable for all ages. From elephant orphanages to gentle hiking trails and water sports, there's something for everyone.",
                ImageUrl = "/images/packages/family-adventure.jpg",
                Duration = 12,
                Price = 2899M,
                Featured = false,
                IncludedDestinations = new List<string> { "Colombo", "Pinnawala", "Kandy", "Bentota" },
                CreatedAt = DateTime.Now
            };
            tourPackages.Add(familyAdventure);

            // 7. Surf and Yoga Retreat
            var surfYogaRetreat = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Excerpt = "Find balance with daily yoga sessions and world-class surfing on Sri Lanka's southern coast.",
                Title = "Surf and Yoga Retreat",
                Slug = "surf-yoga-retreat",
                Description = "Combine the thrill of surfing with the tranquility of yoga in this wellness-focused retreat. Perfect for beginners and experienced practitioners alike, with expert instructors and stunning beachfront locations.",
                ImageUrl = "/images/packages/coastal-serenity-escape-sri-lanka.jpg",
                Duration = 9,
                Price = 1799M,
                Featured = false,
                IncludedDestinations = new List<string> { "Weligama", "Mirissa", "Ahangama", "Hikkaduwa" },
                CreatedAt = DateTime.Now
            };
            tourPackages.Add(surfYogaRetreat);

            // 8. Epic Sri Lanka Train Journey
            var trainJourney = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Excerpt = "Experience one of the world's most beautiful train journeys through Sri Lanka's scenic landscapes.",
                Title = "Epic Sri Lanka Train Journey",
                Slug = "epic-sri-lanka-train-journey",
                Description = "Travel on Sri Lanka's iconic railway routes, including the famous blue train through tea country. This tour combines scenic train journeys with cultural experiences and comfortable accommodations at each stop.",
                ImageUrl = "/images/packages/train-journey.jpg",
                Duration = 8,
                Price = 1699M,
                Featured = true,
                IncludedDestinations = new List<string> { "Kandy", "Nanu Oya", "Ella", "Haputale" },
                CreatedAt = DateTime.Now
            };
            tourPackages.Add(trainJourney);

            // 9. Ancient Kingdoms of Sri Lanka
            var ancientKingdoms = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Excerpt = "Journey through Sri Lanka's rich history and explore ancient cities, temples, and royal palaces.",
                Title = "Ancient Kingdoms of Sri Lanka",
                Slug = "ancient-kingdoms-of-sri-lanka",
                Description = "Delve into Sri Lanka's fascinating past with visits to UNESCO World Heritage Sites including ancient capitals, rock fortresses, and sacred temples dating back over 2,000 years.",
                ImageUrl = "/images/packages/ancient-kingdoms.jpg",
                Duration = 10,
                Price = 2199M,
                Featured = false,
                IncludedDestinations = new List<string> { "Anuradhapura", "Polonnaruwa", "Kandy", "Dambulla" },
                CreatedAt = DateTime.Now
            };
            tourPackages.Add(ancientKingdoms);

            // 10. A Week in the Tropics
            var weekInTropics = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Excerpt = "Enjoy the perfect introduction to Sri Lanka with this balanced one-week itinerary.",
                Title = "A Week in the Tropics",
                Slug = "a-week-in-the-tropics",
                Description = "This carefully curated 7-day tour provides an ideal introduction to Sri Lanka, featuring the must-see highlights and authentic experiences for travelers with limited time.",
                ImageUrl = "/images/packages/week-in-tropics.jpg",
                Duration = 7,
                Price = 1599M,
                Featured = false,
                IncludedDestinations = new List<string> { "Colombo", "Sigiriya", "Kandy", "Bentota" },
                CreatedAt = DateTime.Now
            };
            tourPackages.Add(weekInTropics);

            // 11. Luxury Sri Lanka Escape
            var luxuryEscape = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Excerpt = "Indulge in the finest accommodations and exclusive experiences across Sri Lanka.",
                Title = "Luxury Sri Lanka Escape",
                Slug = "luxury-sri-lanka-escape",
                Description = "Experience Sri Lanka at its most exclusive with stays at world-class hotels and resorts, private guided tours, gourmet dining experiences, and personalized service throughout your journey.",
                ImageUrl = "/images/packages/luxury-escape.jpg",
                Duration = 14,
                Price = 4999M,
                Featured = true,
                IncludedDestinations = new List<string> { "Colombo", "Yala", "Tangalle", "Galle", "Kandy" },
                CreatedAt = DateTime.Now
            };
            tourPackages.Add(luxuryEscape);
        }

        // Destinations
        public async Task<IEnumerable<Destination>> GetDestinationsAsync()
        {
            return await Task.FromResult(destinations);
        }

        public async Task<Destination> GetDestinationByIdAsync(int id)
        {
            return await Task.FromResult(destinations.FirstOrDefault(d => d.Id == id));
        }
        
        public async Task<Destination> GetDestinationBySlugAsync(string slug)
        {
            return await Task.FromResult(destinations.FirstOrDefault(d => d.Slug.ToLower() == slug.ToLower()));
        }

        public async Task<Destination> CreateDestinationAsync(CreateDestinationDto destinationDto)
        {
            var destination = new Destination
            {
                Id = destinationIdCounter++,
                Name = destinationDto.Name,
                Slug = destinationDto.Slug ?? destinationDto.Name.ToLower().Replace(" ", "-"),
                Description = destinationDto.Description,
                Images = destinationDto.Images,
                Featured = destinationDto.Featured,

                // Location Info
                Region = destinationDto.Region,
                Address = destinationDto.Address,
                Latitude = destinationDto.Latitude,
                Longitude = destinationDto.Longitude,

                // Extended Info
                ShortDescription = destinationDto.ShortDescription,
                FullDescription = destinationDto.FullDescription,
                Highlights = destinationDto.Highlights,
                BestTimeToVisit = destinationDto.BestTimeToVisit,
                NearestAirport = destinationDto.NearestAirport,
                TransportOptions = destinationDto.TransportOptions,
                TravelTips = destinationDto.TravelTips,
                RecommendedDuration = destinationDto.RecommendedDuration,

                // SEO Metadata
                MetaTitle = destinationDto.MetaTitle,
                MetaDescription = destinationDto.MetaDescription,
                MetaKeywords = destinationDto.MetaKeywords,
                Tags = destinationDto.Tags,
                Category = destinationDto.Category,

                // Content Sections
                Features = destinationDto.Features,
                GalleryImages = destinationDto.GalleryImages,
                FAQs = destinationDto.FAQs,
                Sections = destinationDto.Sections,
                LocalExperiences = destinationDto.LocalExperiences,

                CreatedAt = DateTime.Now
            };

            destinations.Add(destination);
            return await Task.FromResult(destination);
        }


        // Tour Packages
        public async Task<IEnumerable<TourPackage>> GetTourPackagesAsync()
        {
            return await Task.FromResult(tourPackages);
        }

        public async Task<IEnumerable<TourPackage>> GetFeaturedTourPackagesAsync()
        {
            return await Task.FromResult(tourPackages.Where(tp => tp.Featured).ToList());
        }

        public async Task<TourPackage> GetTourPackageByIdAsync(int id)
        {
            return await Task.FromResult(tourPackages.FirstOrDefault(tp => tp.Id == id));
        }

        public async Task<TourPackage> GetTourPackageBySlugAsync(string slug)
        {
            return await Task.FromResult(tourPackages.FirstOrDefault(tp => tp.Slug == slug));
        }

        public async Task<TourPackage> CreateTourPackageAsync(CreateTourPackageDto tourPackageDto)
        {
            var tourPackage = new TourPackage
            {
                Id = tourPackageIdCounter++,
                Title = tourPackageDto.Title,
                Slug = tourPackageDto.Title.ToLower().Replace(" ", "-"),
                Description = tourPackageDto.Description,
                ImageUrl = tourPackageDto.ImageUrl,
                Duration = tourPackageDto.Duration,
                Price = tourPackageDto.Price,
                Featured = tourPackageDto.Featured,
                Itinerary = tourPackageDto.Itinerary,
                IncludedDestinations = tourPackageDto.IncludedDestinations,
                ItineraryDays = tourPackageDto.ItineraryDays,
                CreatedAt = DateTime.Now
            };
            
            tourPackages.Add(tourPackage);
            return await Task.FromResult(tourPackage);
        }

        // Testimonials
        public async Task<IEnumerable<Testimonial>> GetTestimonialsAsync()
        {
            return await Task.FromResult(testimonials);
        }

        public async Task<Testimonial> CreateTestimonialAsync(CreateTestimonialDto testimonialDto)
        {
            var testimonial = new Testimonial 
            { 
                Id = testimonialIdCounter++,
                CustomerName = !string.IsNullOrEmpty(testimonialDto.CustomerName) ? testimonialDto.CustomerName : "Guest",
                CustomerAvatar = !string.IsNullOrEmpty(testimonialDto.CustomerAvatar) ? testimonialDto.CustomerAvatar : null,
                Content = !string.IsNullOrEmpty(testimonialDto.Content) ? testimonialDto.Content : "Wonderful experience with Best Sri Lanka Tours!",
                Rating = testimonialDto.Rating > 0 ? testimonialDto.Rating : 5,
                TourPackage = !string.IsNullOrEmpty(testimonialDto.TourPackage) ? testimonialDto.TourPackage : "Tour Package",
                CreatedAt = DateTime.Now
            };
            testimonials.Add(testimonial);
            return await Task.FromResult(testimonial);
        }

        // Inquiries
        public async Task<IEnumerable<Inquiry>> GetInquiriesAsync()
        {
            return await Task.FromResult(inquiries);
        }

        public async Task<Inquiry> CreateInquiryAsync(CreateInquiryDto inquiryDto)
        {
            // Simple placeholder implementation
            var inquiry = new Inquiry { Id = inquiryIdCounter++ };
            inquiries.Add(inquiry);
            return await Task.FromResult(inquiry);
        }

        // Subscribers
        public async Task<Subscriber> GetSubscriberByEmailAsync(string email)
        {
            return await Task.FromResult(subscribers.FirstOrDefault(s => s.Email == email));
        }

        public async Task<Subscriber> AddSubscriberAsync(CreateSubscriberDto subscriberDto)
        {
            // Simple placeholder implementation
            var subscriber = new Subscriber { Id = subscriberIdCounter++ };
            subscribers.Add(subscriber);
            return await Task.FromResult(subscriber);
        }
    }
}