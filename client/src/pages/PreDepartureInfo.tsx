import React from 'react';
import HeroSection from '@/components/HeroSection';
import { BreadcrumbItem } from '@/components/Breadcrumb';
import { 
  FileText, 
  Calendar, 
  CreditCard, 
  Pill, 
  Umbrella, 
  Package, 
  Plug, 
  Phone, 
  AlertCircle, 
  Info
} from 'lucide-react';

const PreDepartureInfo: React.FC = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Travel Resources" }
  ];

  return (
    <main>
      {/* Hero Section using our standardized HeroSection component */}
      <HeroSection
        title="Pre-Departure Information"
        description="Essential information to prepare for your Sri Lankan adventure."
        backgroundImage="https://res.cloudinary.com/drsjp6bqz/image/upload/v1746207237/shutterstock_1070510330_ro5cyz.jpg"
        breadcrumbItems={breadcrumbItems}
        overlayColor="bg-[#0077B6]"
        overlayOpacity={20}
        imageTransform="scale-105"
      />
      
      {/* Main Content */}
      <section className="py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Entry Requirements */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                  <FileText className="w-6 h-6 text-[#0077B6]" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                  Entry Requirements
                </h2>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">Visa Information</h3>
                <p className="text-gray-700 mb-4 font-['Raleway']">
                  Most visitors to Sri Lanka require an Electronic Travel Authorization (ETA) before arrival. The ETA is valid for 30 days from the date of arrival and can be extended for up to 6 months.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700 font-['Raleway']">
                        You can apply for an ETA online through the <a href="https://eta.gov.lk/slvisa/" target="_blank" rel="noopener noreferrer" className="font-medium underline">official Sri Lankan government website</a>. The cost is approximately $35 USD for a tourist visa.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 font-['Raleway']">
                  Requirements for obtaining an ETA:
                </p>
                <ul className="list-disc pl-8 mt-2 text-gray-700 space-y-1 font-['Raleway']">
                  <li>Valid passport with at least 6 months validity from your planned date of departure from Sri Lanka</li>
                  <li>Return or onward ticket confirmation</li>
                  <li>Proof of sufficient funds to cover your stay</li>
                  <li>Completed online application form</li>
                </ul>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">Passport Requirements</h3>
                <p className="text-gray-700 mb-4 font-['Raleway']">
                  Your passport must:
                </p>
                <ul className="list-disc pl-8 text-gray-700 space-y-1 mb-4 font-['Raleway']">
                  <li>Be valid for at least 6 months beyond your planned departure date from Sri Lanka</li>
                  <li>Have at least two blank visa pages</li>
                  <li>Be in good condition without significant damage</li>
                </ul>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-700 font-['Raleway']">
                        We recommend making a photocopy of your passport's identification page and keeping it separate from your passport. Also, store a digital copy in your email or secure cloud storage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Health & Vaccination */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                  <Pill className="w-6 h-6 text-[#0077B6]" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                  Health & Vaccination
                </h2>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">Recommended Vaccinations</h3>
                <p className="text-gray-700 mb-4 font-['Raleway']">
                  While there are no mandatory vaccinations required for entry to Sri Lanka (unless you're arriving from a Yellow Fever endemic country), the following vaccinations are recommended by health professionals:
                </p>
                <ul className="list-disc pl-8 text-gray-700 space-y-2 font-['Raleway']">
                  <li><span className="font-semibold">Hepatitis A and B:</span> Recommended for most travelers</li>
                  <li><span className="font-semibold">Typhoid:</span> Especially if you're staying in rural areas or planning to eat outside of major hotels and restaurants</li>
                  <li><span className="font-semibold">Tetanus-diphtheria:</span> Ensure your routine vaccinations are up to date</li>
                  <li><span className="font-semibold">Japanese Encephalitis:</span> Consider if staying for an extended period or spending significant time in rural areas</li>
                  <li><span className="font-semibold">Rabies:</span> Consider for long-term travelers or those planning activities with potential animal exposure</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700 font-['Raleway']">
                        Consult with your healthcare provider or visit a travel medicine clinic at least 4-6 weeks before your trip to discuss your specific health needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">Health Precautions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 font-['Playfair_Display']">Malaria and Dengue Prevention</h4>
                    <p className="text-gray-700 font-['Raleway']">
                      While malaria risk is low in Sri Lanka, dengue fever is present. Take precautions to avoid mosquito bites:
                    </p>
                    <ul className="list-disc pl-8 mt-2 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Use insect repellent containing at least 20% DEET</li>
                      <li>Wear long-sleeved shirts and long pants, especially during dawn and dusk</li>
                      <li>Use air-conditioned accommodations when possible</li>
                      <li>Use bed nets if sleeping in rooms that are not well-screened</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 font-['Playfair_Display']">Food and Water Safety</h4>
                    <p className="text-gray-700 font-['Raleway']">
                      To avoid foodborne illnesses:
                    </p>
                    <ul className="list-disc pl-8 mt-2 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Drink only bottled or purified water</li>
                      <li>Avoid ice in drinks unless made from purified water</li>
                      <li>Eat thoroughly cooked food served hot</li>
                      <li>Avoid raw vegetables, unpeeled fruits, and unpasteurized dairy products</li>
                      <li>Wash hands frequently with soap and water or use hand sanitizer</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 font-['Playfair_Display']">Medical Kit</h4>
                    <p className="text-gray-700 font-['Raleway']">
                      Consider packing a basic medical kit with:
                    </p>
                    <ul className="list-disc pl-8 mt-2 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Prescription medications in original containers</li>
                      <li>Over-the-counter pain relievers</li>
                      <li>Anti-diarrheal medication</li>
                      <li>Antihistamines for allergic reactions</li>
                      <li>Motion sickness medication</li>
                      <li>Insect repellent and sunscreen</li>
                      <li>Basic first aid supplies (bandages, antiseptic wipes, etc.)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Travel Insurance */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                  <Umbrella className="w-6 h-6 text-[#0077B6]" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                  Travel Insurance
                </h2>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">Recommended Coverage</h3>
                <p className="text-gray-700 mb-4 font-['Raleway']">
                  We strongly recommend purchasing comprehensive travel insurance for your trip to Sri Lanka. Your policy should include:
                </p>
                <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-6 font-['Raleway']">
                  <li><span className="font-semibold">Medical coverage:</span> Including emergency medical treatment, hospitalization, and medical evacuation</li>
                  <li><span className="font-semibold">Trip cancellation/interruption:</span> Coverage for non-refundable trip costs if you need to cancel or cut your trip short</li>
                  <li><span className="font-semibold">Baggage protection:</span> Coverage for lost, stolen, or damaged luggage</li>
                  <li><span className="font-semibold">24-hour emergency assistance:</span> Access to help wherever and whenever you need it</li>
                  <li><span className="font-semibold">Coverage for adventure activities:</span> If you plan to participate in activities like hiking, surfing, or wildlife safaris</li>
                </ul>
                
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-700 font-['Raleway']">
                        Before purchasing insurance, check if your existing health insurance, credit card benefits, or memberships provide any travel coverage. Make sure to review policy details and exclusions carefully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Packing List */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                  <Package className="w-6 h-6 text-[#0077B6]" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                  Packing Essentials
                </h2>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">What to Pack</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 font-['Playfair_Display']">Clothing</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Lightweight, breathable clothing (cotton or moisture-wicking fabrics)</li>
                      <li>Long-sleeved shirts and pants for evenings and temple visits</li>
                      <li>Modest clothing for visiting religious sites (knees and shoulders covered)</li>
                      <li>Swimwear for beach destinations</li>
                      <li>Light rain jacket or poncho (especially during monsoon season)</li>
                      <li>Comfortable walking shoes or sandals</li>
                      <li>Hat or cap for sun protection</li>
                      <li>Light sweater or jacket for higher elevations</li>
                    </ul>
                    
                    <h4 className="font-semibold text-gray-800 mb-3 mt-6 font-['Playfair_Display']">Health & Hygiene</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Personal medications with prescription information</li>
                      <li>First aid kit as mentioned above</li>
                      <li>Hand sanitizer and wet wipes</li>
                      <li>Insect repellent (at least 20% DEET)</li>
                      <li>Sunscreen (SPF 30+)</li>
                      <li>Toiletries and personal care items</li>
                      <li>Travel-sized laundry detergent for longer stays</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 font-['Playfair_Display']">Electronics & Documents</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Universal power adapter (Sri Lanka uses Type D, M, and G sockets)</li>
                      <li>Power bank for charging devices on the go</li>
                      <li>Camera and memory cards</li>
                      <li>Mobile phone and charger</li>
                      <li>Printed and digital copies of important documents:</li>
                      <ul className="list-circle pl-6 mt-1 space-y-1">
                        <li>Passport and visa</li>
                        <li>Travel insurance details</li>
                        <li>Flight and accommodation confirmations</li>
                        <li>Driver's license (if planning to drive)</li>
                        <li>Credit cards and emergency contact information</li>
                      </ul>
                    </ul>
                    
                    <h4 className="font-semibold text-gray-800 mb-3 mt-6 font-['Playfair_Display']">Miscellaneous</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Daypack for excursions</li>
                      <li>Reusable water bottle with filter</li>
                      <li>Travel pillow and eye mask for long journeys</li>
                      <li>Sunglasses</li>
                      <li>Small umbrella</li>
                      <li>Binoculars (for wildlife viewing)</li>
                      <li>Travel guidebook or offline maps</li>
                      <li>Small gifts for locals or hosts (optional)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700 font-['Raleway']">
                        Consider the specific nature of your trip when packing. For example, if you're trekking in hill country, you'll need sturdier footwear and warmer clothing, while beach destinations require more sun protection items.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Currency & Payments */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                  <CreditCard className="w-6 h-6 text-[#0077B6]" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                  Currency & Payments
                </h2>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">Money Matters</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 font-['Playfair_Display']">Local Currency</h4>
                    <p className="text-gray-700 font-['Raleway']">
                      The currency in Sri Lanka is the Sri Lankan Rupee (LKR). Notes come in denominations of 20, 50, 100, 500, 1000, 2000, and 5000 rupees. Coins are available in 1, 2, 5, and 10 rupees.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 font-['Playfair_Display']">Currency Exchange</h4>
                    <p className="text-gray-700 mb-3 font-['Raleway']">
                      You can exchange currency at:
                    </p>
                    <ul className="list-disc pl-8 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Airports (convenience, but rates might not be the best)</li>
                      <li>Banks (typically offer good rates)</li>
                      <li>Official exchange bureaus in tourist areas</li>
                      <li>Some hotels (usually less favorable rates)</li>
                    </ul>
                    <p className="text-gray-700 mt-3 font-['Raleway']">
                      Keep your exchange receipts, as you may need them to convert rupees back to your currency when leaving the country.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 font-['Playfair_Display']">ATMs and Credit Cards</h4>
                    <p className="text-gray-700 mb-3 font-['Raleway']">
                      ATMs are widely available in cities and tourist areas. Most accept international cards (Visa, Mastercard, Maestro), but may have daily withdrawal limits and charge fees.
                    </p>
                    <p className="text-gray-700 mb-3 font-['Raleway']">
                      Credit cards are accepted at higher-end hotels, restaurants, and shops in tourist areas, but many smaller establishments and rural areas operate on cash only.
                    </p>
                    <ul className="list-disc pl-8 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Inform your bank of your travel plans to prevent card blocks</li>
                      <li>Check what foreign transaction fees your card charges</li>
                      <li>Have a backup payment method available</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 font-['Playfair_Display']">Tipping</h4>
                    <p className="text-gray-700 mb-3 font-['Raleway']">
                      Tipping is not mandatory in Sri Lanka but is appreciated for good service:
                    </p>
                    <ul className="list-disc pl-8 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Hotels: 100-200 LKR for porters per bag</li>
                      <li>Restaurants: 10% of the bill if service charge is not included</li>
                      <li>Drivers/guides: 500-1000 LKR per day depending on service quality</li>
                      <li>Spa/massage services: 10% of the service cost</li>
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-amber-700 font-['Raleway']">
                          Always carry some cash, especially when traveling to rural areas. It's recommended to have a mix of larger bills for hotels and smaller denominations for daily expenses and tipping.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Weather & Climate */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                  <Umbrella className="w-6 h-6 text-[#0077B6]" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                  Weather & Climate
                </h2>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">Seasonal Weather Patterns</h3>
                
                <p className="text-gray-700 mb-6 font-['Raleway']">
                  Sri Lanka has a tropical climate with distinct wet and dry seasons that vary by region due to the dual monsoon system:
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 font-['Playfair_Display']">Southwest Monsoon (May to September)</h4>
                    <p className="text-gray-700 mb-2 font-['Raleway']">
                      Affects the southwest coast and hill country:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Areas affected: Colombo, Galle, Bentota, Kandy</li>
                      <li>Heavy rainfall, especially June and July</li>
                      <li>Temperatures: 26-30°C (79-86°F) in coastal areas</li>
                      <li>Hill country remains cooler: 15-20°C (59-68°F)</li>
                    </ul>
                    
                    <h4 className="font-semibold text-gray-800 mb-3 mt-6 font-['Playfair_Display']">Northeast Monsoon (October to January)</h4>
                    <p className="text-gray-700 mb-2 font-['Raleway']">
                      Affects the north and eastern coastal regions:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Areas affected: Trincomalee, Batticaloa, Jaffna</li>
                      <li>Heavy rainfall, especially November and December</li>
                      <li>Temperatures: 27-30°C (81-86°F)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 font-['Playfair_Display']">Inter-Monsoon Periods</h4>
                    <p className="text-gray-700 mb-2 font-['Raleway']">
                      The periods between monsoons (February-April and September-October) generally offer good weather across the island:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Less predictable weather patterns</li>
                      <li>Afternoon thunderstorms possible</li>
                      <li>Generally lower rainfall island-wide</li>
                      <li>Temperatures: 28-32°C (82-90°F) in coastal areas</li>
                    </ul>
                    
                    <h4 className="font-semibold text-gray-800 mb-3 mt-6 font-['Playfair_Display']">Hill Country Climate</h4>
                    <p className="text-gray-700 mb-2 font-['Raleway']">
                      The central highlands (Nuwara Eliya, Ella, etc.) have their own microclimate:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 font-['Raleway']">
                      <li>Cooler temperatures: 10-20°C (50-68°F) year-round</li>
                      <li>Misty mornings and evenings</li>
                      <li>January and February can be quite cold at night</li>
                      <li>Rainfall more evenly distributed throughout the year</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700 font-['Raleway']">
                        While monsoons bring heavier rainfall, it typically occurs in bursts rather than all day. This means you can still enjoy many activities, especially if you plan your days with flexibility. Our expert guides will help adjust your itinerary based on current weather conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connectivity & Communication */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                  <Phone className="w-6 h-6 text-[#0077B6]" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                  Connectivity & Communication
                </h2>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">Mobile Phones & Internet</h3>
                    <ul className="space-y-4 text-gray-700 font-['Raleway']">
                      <li className="flex items-start">
                        <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                            <line x1="12" y1="18" x2="12" y2="18" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold">SIM Cards:</span> Available at the airport and in mobile shops throughout the country. Major providers include Dialog, Mobitel, and Airtel. You'll need your passport to purchase.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold">Coverage:</span> Mobile coverage is generally good in cities and tourist areas but can be limited in remote regions and some national parks.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                            <line x1="12" y1="20" x2="12" y2="20"></line>
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold">Wi-Fi:</span> Available in most hotels, restaurants, and cafes in tourist areas. Quality and speed vary.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M4.9 16.1C1 12.2 1 5.9 4.9 2"></path>
                            <path d="M7.8 13.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
                            <path d="M14 9h.01"></path>
                            <path d="M16.2 4.8c2.3 2.3 2.3 6.1 0 8.5"></path>
                            <path d="M19.1 2c3.9 3.9 3.9 10.2 0 14.1"></path>
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold">Portable Wi-Fi Device:</span> Can be rented at the airport for seamless connectivity throughout your trip.
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">Important Contact Information</h3>
                    <ul className="space-y-4 text-gray-700 font-['Raleway']">
                      <li>
                        <h4 className="font-semibold text-gray-800 font-['Playfair_Display']">Emergency Services</h4>
                        <ul className="list-disc pl-8 space-y-1 mt-1">
                          <li>National Emergency: 119</li>
                          <li>Police: 118 or 119</li>
                          <li>Ambulance: 110</li>
                          <li>Fire: 110</li>
                          <li>Tourist Police: +94 11 242 1052</li>
                        </ul>
                      </li>
                      <li>
                        <h4 className="font-semibold text-gray-800 font-['Playfair_Display']">Best Sri Lanka Tours Emergency Contact</h4>
                        <ul className="list-disc pl-8 space-y-1 mt-1">
                          <li>24/7 Emergency Line: +94 77 123 4567</li>
                          <li>Office: +94 11 234 5678</li>
                          <li>Email: emergency@bestsrilankatours.com</li>
                        </ul>
                      </li>
                      <li>
                        <h4 className="font-semibold text-gray-800 font-['Playfair_Display']">Your Country's Embassy/Consulate</h4>
                        <p className="mt-1">
                          Before traveling, note the contact information for your country's embassy or consulate in Sri Lanka. This information will be provided in your pre-departure package.
                        </p>
                      </li>
                    </ul>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-amber-700 font-['Raleway']">
                            We recommend saving important contact numbers in your phone and keeping a printed copy in your luggage as a backup.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PreDepartureInfo;