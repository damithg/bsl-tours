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
                ImageUrl = "/images/destinations/sigiriya-rock-fortress-sri-lanka.jpg",
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
                ImageUrl = "/images/destinations/galle-fort-sri-lanka.jpg",
                Featured = true,
                
                // Location information
                Region = "Southern Coast",
                Latitude = "6.0269",
                Longitude = "80.2167",
                Address = "Galle, Sri Lanka",
                
                // Extended information
                ShortDescription = "A preserved colonial-era fortress with charming streets and sweeping ocean views",
                FullDescription = "The historic Galle Fort, built by the Portuguese and later fortified by the Dutch in the 17th century, stands as one of Sri Lanka's most atmospheric colonial treasures. This UNESCO World Heritage site encompasses an entire peninsula, featuring charming cobblestone streets lined with Dutch colonial buildings, trendy cafes, luxury boutiques, and stylish hotels.",
                Highlights = new List<string> { "Rampart Walls", "Dutch Reformed Church", "Lighthouse", "Maritime Museum", "Boutique Shopping" },
                
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "/images/activities/photo-1592454869436-cfee29fafa29.jpg", Alt = "Galle Fort - Ramparts View" },
                    new GalleryImage { Url = "/images/activities/photo-1583087253076-5d1315860eb8.jpg", Alt = "Galle Fort - Lighthouse" },
                    new GalleryImage { Url = "/images/activities/photo-1591331686811-80ebb77d0813.jpg", Alt = "Galle Fort - Colonial Architecture" },
                    new GalleryImage { Url = "/images/activities/photo-1591331686811-80ebb77d0814.jpg", Alt = "Galle Fort - Colonial Architecture" },
                    new GalleryImage { Url = "/images/activities/photo-1591331686811-80ebb77d0815.jpg", Alt = "Galle Fort - Colonial Architecture" },
                    new GalleryImage { Url = "/images/activities/photo-1591331686811-80ebb77d0816.jpg", Alt = "Galle Fort - Colonial Architecture" },
                    new GalleryImage { Url = "/images/activities/photo-1591331686811-80ebb77d0817.jpg", Alt = "Galle Fort - Colonial Architecture" },
                    new GalleryImage { Url = "/images/activities/photo-1591331686811-80ebb77d0819.jpg", Alt = "Galle Fort - Colonial Architecture" }
                },
                
                // FAQs for Galle
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "How long does it take to walk around the Galle Fort ramparts?",
                        Answer = "A leisurely walk along the entire circumference of the fort walls takes approximately 1-1.5 hours, though many visitors spend longer to enjoy the views and take photographs."
                    },
                    new FAQ
                    {
                        Question = "Are there entrance fees to visit Galle Fort?",
                        Answer = "The fort itself is free to enter and explore. Some individual attractions within the fort, such as museums, may charge modest entrance fees."
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
                ImageUrl = "/images/packages/cultural-triangle-tour.jpg",
                Duration = 7,
                Price = 2199M,
                Featured = true,
                Itinerary = "Day 1: Arrival in Colombo\nDay 2-3: Sigiriya and Dambulla\nDay 4: Polonnaruwa\nDay 5: Anuradhapura\nDay 6: Kandy\nDay 7: Departure",
                IncludedDestinations = new List<string> { "Sigiriya", "Dambulla", "Polonnaruwa", "Anuradhapura", "Kandy" },
                CreatedAt = DateTime.Now,
                ItineraryDays = new List<ItineraryDay>
                {
                    new ItineraryDay
                    {
                        Day = 1,
                        Title = "Arrival in Colombo",
                        Description = "Welcome to Sri Lanka! Upon arrival at Bandaranaike International Airport, you'll be greeted by your private chauffeur and transferred to your luxury hotel in Colombo. Depending on your arrival time, enjoy a brief orientation tour of Colombo's colonial heritage.",
                        ImageUrl = "/images/packages/colombo-arrival.jpg",
                        Accommodation = "Shangri-La Colombo",
                        Meals = new Meals { Dinner = true }
                    },
                    new ItineraryDay
                    {
                        Day = 2,
                        Title = "Sigiriya Rock Fortress",
                        Description = "After breakfast, transfer to Sigiriya (approximately 4 hours). In the afternoon, visit the iconic Sigiriya Rock Fortress, a UNESCO World Heritage site. Climb to the summit for panoramic views and explore the ancient frescoes and water gardens.",
                        ImageUrl = "/images/packages/sigiriya-rock.jpg",
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
                        ImageUrl = "/images/packages/dambulla-caves.jpg",
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
                        ImageUrl = "/images/packages/polonnaruwa.jpg",
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
                        ImageUrl = "/images/packages/anuradhapura.jpg",
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
                        ImageUrl = "/images/packages/kandy-tooth-temple.jpg",
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
                        ImageUrl = "/images/packages/departure.jpg",
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
                        ImageUrl = "/images/packages/galle-arrival.jpg",
                        Accommodation = "Amangalla",
                        Meals = new Meals { Dinner = true }
                    },
                    new ItineraryDay
                    {
                        Day = 2,
                        Title = "Galle Fort Exploration",
                        Description = "After breakfast, enjoy a guided walking tour of the historic Galle Fort, a UNESCO World Heritage Site. Explore its charming streets, colonial architecture, boutique shops, and cafes. Afternoon at leisure to continue exploring or relax at your resort.",
                        ImageUrl = "/images/packages/galle-fort.jpg",
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
                        ImageUrl = "/images/packages/cooking-class.jpg",
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
                        ImageUrl = "/images/packages/mirissa-beach.jpg",
                        Accommodation = "Cape Weligama",
                        Meals = new Meals { Breakfast = true, Dinner = true }
                    },
                    new ItineraryDay
                    {
                        Day = 5,
                        Title = "Whale Watching & Beach Relaxation",
                        Description = "Early morning whale watching excursion to spot blue whales and dolphins (seasonal, November to April). Afternoon at leisure to enjoy the beach or indulge in a spa treatment at your resort.",
                        ImageUrl = "/images/packages/whale-watching.jpg",
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
                        ImageUrl = "/images/packages/tangalle-beach.jpg",
                        Accommodation = "Amanwella",
                        Meals = new Meals { Breakfast = true, Dinner = true }
                    },
                    new ItineraryDay
                    {
                        Day = 7,
                        Title = "Tangalle Beach Day & Sea Turtle Visit",
                        Description = "Day at leisure to enjoy the facilities of your resort and the beautiful Tangalle beach. In the evening, optional visit to a sea turtle conservation project to observe turtles laying eggs (seasonal).",
                        ImageUrl = "/images/packages/sea-turtles.jpg",
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
                        ImageUrl = "/images/packages/departure.jpg",
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
                ImageUrl = "/images/packages/wildlife-safari.jpg",
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
                ImageUrl = "/images/packages/tea-plantation-tour.jpg",
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
                ImageUrl = "/images/packages/surf-yoga-retreat.jpg",
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
                Slug = destinationDto.Name.ToLower().Replace(" ", "-"),
                Description = destinationDto.Description,
                ImageUrl = destinationDto.ImageUrl,
                Featured = destinationDto.Featured,
                
                // Enhanced properties
                Region = destinationDto.Region,
                ShortDescription = destinationDto.ShortDescription,
                FullDescription = destinationDto.FullDescription,
                Highlights = destinationDto.Highlights,
                BestTimeToVisit = destinationDto.BestTimeToVisit,
                RecommendedDuration = destinationDto.RecommendedDuration,
                GalleryImages = destinationDto.GalleryImages,
                Activities = destinationDto.Activities,
                FAQs = destinationDto.FAQs,
                
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
            // Simple placeholder implementation
            var testimonial = new Testimonial { Id = testimonialIdCounter++ };
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