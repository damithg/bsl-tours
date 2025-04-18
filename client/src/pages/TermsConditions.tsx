import React, { useEffect } from 'react';

const TermsConditions = () => {
  useEffect(() => {
    document.title = "Terms and Conditions | Best Sri Lanka Tours";
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#004E64] font-['Playfair_Display']">Terms and Conditions</h1>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead mb-8">
          Please read these Terms and Conditions carefully before using the Best Sri Lanka Tours website 
          or booking our services. By accessing or using our website, you agree to be bound by these Terms and Conditions.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our website, making inquiries, or booking tours through Best Sri Lanka Tours, 
            you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. 
            If you do not agree to these Terms and Conditions, please do not use our services.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">2. Booking and Payment</h2>
          <ul className="list-disc pl-6 mt-4 space-y-3">
            <li>
              <strong>Booking Process:</strong> All bookings are subject to availability and confirmation. A booking is confirmed only when you receive a written confirmation from us.
            </li>
            <li>
              <strong>Deposit and Payment:</strong> A non-refundable deposit of 25% of the total tour cost is required to secure your booking. The remaining balance must be paid 30 days before the start of your tour.
            </li>
            <li>
              <strong>Payment Methods:</strong> We accept payment by credit card, bank transfer, and other methods as specified at the time of booking.
            </li>
            <li>
              <strong>Pricing:</strong> All prices are quoted in US Dollars unless otherwise specified. Prices are subject to change until your booking is confirmed.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">3. Cancellation and Refund Policy</h2>
          <ul className="list-disc pl-6 mt-4 space-y-3">
            <li>
              <strong>Cancellation by You:</strong> Cancellations must be made in writing. The following cancellation fees apply:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>60 days or more before tour start: 25% of total tour cost (deposit)</li>
                <li>30-59 days before tour start: 50% of total tour cost</li>
                <li>15-29 days before tour start: 75% of total tour cost</li>
                <li>14 days or less before tour start: 100% of total tour cost</li>
              </ul>
            </li>
            <li>
              <strong>Cancellation by Us:</strong> We reserve the right to cancel a tour due to unforeseen circumstances, safety concerns, or insufficient participants. In such cases, you will receive a full refund of the amount paid to us, or you may choose to apply the payment toward an alternative tour.
            </li>
            <li>
              <strong>Refunds:</strong> Refunds will be processed within 30 days of cancellation. Refunds do not include any fees charged by banks or credit card companies.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">4. Travel Documents and Requirements</h2>
          <p>
            You are responsible for obtaining all necessary travel documents, including valid passports, visas, and travel insurance. 
            We are not liable for any issues arising from inadequate travel documentation or failure to comply with entry requirements.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">5. Tour Modifications</h2>
          <p>
            We reserve the right to modify tour itineraries due to weather conditions, safety concerns, or other unforeseen circumstances. 
            We will make reasonable efforts to provide services as closely as possible to the original itinerary. No refunds will be provided 
            for reasonable modifications to the itinerary.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">6. Traveler Conduct</h2>
          <p>
            You agree to comply with all local laws and regulations during your tour. We reserve the right to remove you from a tour if your 
            behavior is deemed disruptive, offensive, or illegal, without any refund.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">7. Liability and Insurance</h2>
          <ul className="list-disc pl-6 mt-4 space-y-3">
            <li>
              <strong>Limitation of Liability:</strong> We are not liable for any injury, loss, damage, accident, delay, or irregularity that may occur during your tour, unless directly caused by our negligence.
            </li>
            <li>
              <strong>Travel Insurance:</strong> We strongly recommend that all travelers purchase comprehensive travel insurance that includes coverage for trip cancellation, medical emergencies, and baggage loss or damage.
            </li>
            <li>
              <strong>Force Majeure:</strong> We are not liable for any failure to perform our obligations due to unforeseen circumstances beyond our control, including but not limited to natural disasters, war, terrorism, civil unrest, strikes, or disease outbreaks.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">8. Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, images, and software, is the property of Best Sri Lanka Tours 
            and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative 
            works from our content without our express written consent.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">9. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by the laws of Sri Lanka. Any disputes arising from these Terms and Conditions will be 
            subject to the exclusive jurisdiction of the courts of Sri Lanka.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">10. Changes to Terms and Conditions</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website. 
            Your continued use of our services after any such changes constitutes your acceptance of the new Terms and Conditions.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">11. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> <a href="mailto:damithg@gmail.com" className="text-[#0077B6] hover:underline">damithg@gmail.com</a><br />
            <strong>Phone:</strong> +94 77 123 4567
          </p>
        </div>

        <div className="text-sm text-gray-500 mt-12 pt-4 border-t border-gray-200">
          Last Updated: April 12, 2025
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;