import React from 'react';
import StandardPageTemplate from '@/components/StandardPageTemplate';
import { 
  Passport, 
  Calendar, 
  CreditCard, 
  Pill, 
  Umbrella, 
  Suitcase, 
  Plug, 
  Phone, 
  AlertCircle, 
  Info
} from 'lucide-react';

const PreDepartureInfo: React.FC = () => {
  return (
    <StandardPageTemplate
      title="Pre-Departure Information"
      description="Essential information to prepare for your Sri Lankan adventure."
      breadcrumbs={[{ label: 'Travel Resources', path: '/travel-resources' }]}
    >
      {/* Entry Requirements */}
      <div className="mb-16">
        <div className="flex items-center mb-6">
          <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
            <Passport className="w-6 h-6 text-[#0077B6]" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
            Entry Requirements
          </h2>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Visa Information</h3>
          <p className="text-gray-700 mb-4">
            Most visitors to Sri Lanka require an Electronic Travel Authorization (ETA) before arrival. The ETA is valid for 30 days from the date of arrival and can be extended for up to 6 months.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  You can apply for an ETA online through the <a href="https://eta.gov.lk/slvisa/" target="_blank" rel="noopener noreferrer" className="font-medium underline">official Sri Lankan government website</a>. The cost is approximately $35 USD for a tourist visa.
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-700">
            Requirements for obtaining an ETA:
          </p>
          <ul className="list-disc pl-8 mt-2 text-gray-700 space-y-1">
            <li>Valid passport with at least 6 months validity from your planned date of departure from Sri Lanka</li>
            <li>Return or onward ticket confirmation</li>
            <li>Proof of sufficient funds to cover your stay</li>
            <li>Completed online application form</li>
          </ul>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Passport Requirements</h3>
          <p className="text-gray-700 mb-4">
            Your passport must:
          </p>
          <ul className="list-disc pl-8 text-gray-700 space-y-1 mb-4">
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
                <p className="text-sm text-amber-700">
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Vaccinations</h3>
          <p className="text-gray-700 mb-4">
            While there are no mandatory vaccinations required for entry to Sri Lanka (unless you're arriving from a Yellow Fever endemic country), the following vaccinations are recommended by health professionals:
          </p>
          <ul className="list-disc pl-8 text-gray-700 space-y-2">
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
                <p className="text-sm text-blue-700">
                  Consult with your healthcare provider or visit a travel medicine clinic at least 4-6 weeks before your trip to discuss your specific health needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Precautions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Malaria and Dengue Prevention</h4>
              <p className="text-gray-700">
                While malaria risk is low in Sri Lanka, dengue fever is present. Take precautions to avoid mosquito bites:
              </p>
              <ul className="list-disc pl-8 mt-2 text-gray-700 space-y-1">
                <li>Use insect repellent containing at least 20% DEET</li>
                <li>Wear long-sleeved shirts and long pants, especially during dawn and dusk</li>
                <li>Use air-conditioned accommodations when possible</li>
                <li>Use bed nets if sleeping in rooms that are not well-screened</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Food and Water Safety</h4>
              <p className="text-gray-700">
                To avoid foodborne illnesses:
              </p>
              <ul className="list-disc pl-8 mt-2 text-gray-700 space-y-1">
                <li>Drink only bottled or purified water</li>
                <li>Avoid ice in drinks unless made from purified water</li>
                <li>Eat thoroughly cooked food served hot</li>
                <li>Avoid raw vegetables, unpeeled fruits, and unpasteurized dairy products</li>
                <li>Wash hands frequently with soap and water or use hand sanitizer</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Medical Kit</h4>
              <p className="text-gray-700">
                Consider packing a basic medical kit with:
              </p>
              <ul className="list-disc pl-8 mt-2 text-gray-700 space-y-1">
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Coverage</h3>
          <p className="text-gray-700 mb-4">
            We strongly recommend purchasing comprehensive travel insurance for your trip to Sri Lanka. Your policy should include:
          </p>
          <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-6">
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
                <p className="text-sm text-amber-700">
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
            <Suitcase className="w-6 h-6 text-[#0077B6]" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
            Packing Essentials
          </h2>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">What to Pack</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Clothing</h4>
              <ul className="list-disc pl-8 text-gray-700 space-y-1">
                <li>Lightweight, breathable clothing (cotton or moisture-wicking fabrics)</li>
                <li>Long-sleeved shirts and pants for evenings and temple visits</li>
                <li>Modest clothing for visiting religious sites (shoulders and knees covered)</li>
                <li>Light rain jacket or poncho (especially during monsoon season)</li>
                <li>Comfortable walking shoes and/or hiking boots</li>
                <li>Sandals or flip-flops</li>
                <li>Swimwear and beach cover-up</li>
                <li>Hat or cap for sun protection</li>
                <li>Light sweater or jacket for hill country areas</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Essentials</h4>
              <ul className="list-disc pl-8 text-gray-700 space-y-1">
                <li>Passport and visa documentation</li>
                <li>Travel insurance documents</li>
                <li>Credit cards and some cash (local currency can be obtained on arrival)</li>
                <li>Medical kit with prescription medications</li>
                <li>Sunscreen (SPF 30+ recommended)</li>
                <li>Insect repellent with DEET</li>
                <li>Hand sanitizer and wet wipes</li>
                <li>Travel adapter (Sri Lanka uses Type D, M, and G sockets)</li>
                <li>Refillable water bottle</li>
                <li>Daypack for excursions</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Technology</h4>
              <ul className="list-disc pl-8 text-gray-700 space-y-1">
                <li>Camera and memory cards</li>
                <li>Mobile phone and charger</li>
                <li>Power bank for charging devices on the go</li>
                <li>Universal travel adapter</li>
                <li>Headphones</li>
                <li>E-reader or books for leisure time</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Optional Items</h4>
              <ul className="list-disc pl-8 text-gray-700 space-y-1">
                <li>Binoculars for wildlife viewing</li>
                <li>Sarong (useful for beach, temples, and as a light blanket)</li>
                <li>Travel pillow for long journeys</li>
                <li>Reusable shopping bag</li>
                <li>Waterproof bag for electronics during beach visits</li>
                <li>Small gifts for local encounters (pens, small toys)</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Laundry services are available at most hotels, so you don't need to pack for your entire trip. Consider the activities on your itinerary when packing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Electrical Information */}
      <div className="mb-16">
        <div className="flex items-center mb-6">
          <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
            <Plug className="w-6 h-6 text-[#0077B6]" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
            Electrical Information
          </h2>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Power Supply and Plugs</h3>
              <p className="text-gray-700 mb-4">
                In Sri Lanka, the standard voltage is 230V and the frequency is 50Hz. Power sockets are Type D, M, and G:
              </p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="text-center">
                  <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1680123456/misc/type-d-socket.png" alt="Type D Socket" className="w-20 h-20 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Type D</p>
                </div>
                <div className="text-center">
                  <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1680123456/misc/type-m-socket.png" alt="Type M Socket" className="w-20 h-20 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Type M</p>
                </div>
                <div className="text-center">
                  <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1680123456/misc/type-g-socket.png" alt="Type G Socket" className="w-20 h-20 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Type G</p>
                </div>
              </div>
              <p className="text-gray-700">
                We recommend bringing a universal travel adapter that can accommodate different plug types.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Device Compatibility</h3>
              <p className="text-gray-700 mb-4">
                Most modern electronic devices (phones, laptops, cameras) are dual voltage and will work with 110-240V. Check your device's power adapter for "Input: 100-240V, 50/60Hz" to confirm compatibility.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700">
                      Devices that are not dual voltage (like some hair dryers or straighteners) will require a voltage converter. Many hotels provide hair dryers, so consider leaving yours at home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Money and Payments */}
      <div className="mb-16">
        <div className="flex items-center mb-6">
          <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
            <CreditCard className="w-6 h-6 text-[#0077B6]" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
            Money and Payments
          </h2>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Currency</h3>
              <p className="text-gray-700 mb-2">
                The currency in Sri Lanka is the Sri Lankan Rupee (LKR). Banknotes come in denominations of 20, 50, 100, 500, 1000, 2000, and 5000 rupees.
              </p>
              <p className="text-gray-700 mb-4">
                Currency exchange is available at the airport, banks, authorized money changers, and most hotels. For the best rates, we recommend exchanging currency at banks or authorized exchange counters.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      It's a good idea to arrive with some US dollars, British pounds, or Euros which can be easily exchanged. Keep your exchange receipts as they may be required when converting rupees back to foreign currency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Methods</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Credit/Debit Cards:</span> Major cards (Visa, Mastercard) are accepted at hotels, upscale restaurants, and larger stores in urban areas. Inform your bank of your travel plans to prevent your card from being blocked for suspicious activity.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">ATMs:</span> Available in cities and major towns. Most dispense rupees and accept international cards. There may be daily withdrawal limits and fees for international transactions.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                      <line x1="7" y1="2" x2="7" y2="22"></line>
                      <line x1="17" y1="2" x2="17" y2="22"></line>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <line x1="2" y1="7" x2="7" y2="7"></line>
                      <line x1="2" y1="17" x2="7" y2="17"></line>
                      <line x1="17" y1="17" x2="22" y2="17"></line>
                      <line x1="17" y1="7" x2="22" y2="7"></line>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Cash:</span> Essential for small purchases, local markets, street food vendors, and in rural areas. Keep some small denominations handy for tipping and minor purchases.
                  </div>
                </li>
              </ul>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700">
                      We recommend carrying a mix of payment methods. Keep your valuables secure and avoid displaying large sums of cash in public.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Communication */}
      <div>
        <div className="flex items-center mb-6">
          <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
            <Phone className="w-6 h-6 text-[#0077B6]" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
            Staying Connected
          </h2>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Mobile Phones & Internet</h3>
              <p className="text-gray-700 mb-4">
                Sri Lanka has good mobile coverage in most tourist areas. There are several options for staying connected:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                      <line x1="12" y1="18" x2="12" y2="18"></line>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Local SIM Card:</span> The most economical option. SIM cards from providers like Dialog, Mobitel, or Airtel are available at the airport and offer prepaid packages with data. Bring your passport when purchasing.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M11 17a1 1 0 0 1 1 1v4h-2v-4a1 1 0 0 1 1-1Z"></path>
                      <line x1="17" y1="14" x2="17" y2="10"></line>
                      <line x1="5" y1="14" x2="5" y2="10"></line>
                      <line x1="11" y1="13.6" x2="11" y2="8"></line>
                      <path d="M17 10a2 2 0 0 0 0-4h-1.3"></path>
                      <path d="M5 10a2 2 0 0 1 0-4h1.3"></path>
                      <path d="M8 6h.01"></path>
                      <path d="M14 6h.01"></path>
                      <path d="M11 5V3"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">International Roaming:</span> Convenient but often expensive. Check with your home provider about roaming packages for Sri Lanka before departure.
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
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Important Contact Information</h3>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <h4 className="font-semibold text-gray-800">Emergency Services</h4>
                  <ul className="list-disc pl-8 space-y-1 mt-1">
                    <li>National Emergency: 119</li>
                    <li>Police: 118 or 119</li>
                    <li>Ambulance: 110</li>
                    <li>Fire: 110</li>
                    <li>Tourist Police: +94 11 242 1052</li>
                  </ul>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-800">Best Sri Lanka Tours Emergency Contact</h4>
                  <ul className="list-disc pl-8 space-y-1 mt-1">
                    <li>24/7 Emergency Line: +94 77 123 4567</li>
                    <li>Office: +94 11 234 5678</li>
                    <li>Email: emergency@bestsrilankatours.com</li>
                  </ul>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-800">Your Country's Embassy/Consulate</h4>
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
                    <p className="text-sm text-amber-700">
                      We recommend saving important contact numbers in your phone and keeping a printed copy in your luggage as a backup.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StandardPageTemplate>
  );
};

export default PreDepartureInfo;