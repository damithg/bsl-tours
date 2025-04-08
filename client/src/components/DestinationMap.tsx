import React from "react";
import { ArrowRight } from "lucide-react";

/**
 * A decorative map component showing Sri Lanka destinations with illustrations
 */
const DestinationMap: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side content */}
          <div className="lg:w-5/12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-6">
              DESTINATION HIGHLIGHTS
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Bundled with awe-inspiring set of destination layouts. They provide 
              you with a <span className="text-[#F26B6B] font-medium">ready-to-go & fully flexible</span> way to present
              detailed write-ups about places you visited.
            </p>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Showcase destinations in categories or custom list layouts, & let
              visitors access destination single pages with 1 click.
            </p>
            <a 
              href="/destinations" 
              className="inline-flex items-center border-2 border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6] hover:text-white font-medium py-3 px-8 uppercase tracking-wider transition duration-300"
            >
              EXPLORE
            </a>
          </div>

          {/* Right side map illustration */}
          <div className="lg:w-7/12 relative">
            <div className="w-full h-full relative">
              {/* Sri Lanka map outline with all illustrations */}
              <div className="relative bg-[#f8f9fa] rounded-xl p-4 border border-gray-200 shadow-md">
                {/* Map background - using SVG directly for better control */}
                <svg 
                  viewBox="0 0 300 500" 
                  className="w-full h-auto"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M115,50 C117,48 119,45 119,42 C120,39 118,35 118,32 C117,29 116,26 116,23 C116,20 117,17 117,15 C117,12 116,9 116,6 C116,3 117,1 119,1 C122,1 124,3 126,5 C130,8 134,12 138,13 C142,14 147,13 151,14 C155,15 158,17 162,19 C166,21 169,24 173,26 C177,28 181,30 184,33 C188,36 190,40 193,44 C196,48 199,52 201,57 C204,62 205,67 207,72 C209,77 210,82 212,87 C214,92 215,97 217,102 C219,107 222,111 224,116 C226,121 228,126 229,131 C230,136 231,142 232,148 C233,153 235,158 235,164 C235,169 234,175 234,180 C234,186 234,192 235,197 C236,203 237,208 237,214 C237,219 237,225 237,230 C237,236 238,241 238,247 C238,252 237,258 237,263 C237,269 239,274 240,279 C241,285 242,290 242,296 C242,301 242,307 243,312 C244,318 246,323 246,329 C246,334 245,340 245,345 C245,351 245,357 245,362 C245,368 246,373 246,379 C246,384 247,389 247,395 C247,400 246,406 246,411 C246,417 247,422 247,428 C247,433 247,439 247,444 C247,450 246,455 246,461 C246,466 247,472 247,477 C247,483 247,488 247,494 C247,499 248,505 248,510 C248,516 250,521 250,526 C250,532 249,537 249,543 C249,548 250,554 250,559 C250,565 247,570 244,574 C241,579 236,583 232,588 C228,592 225,598 221,603 C218,608 214,613 211,619 C208,624 207,630 204,635 C201,641 198,646 195,651 C192,656 189,662 186,667 C183,672 180,677 176,682 C172,687 168,691 163,695 C159,699 154,702 149,705 C144,708 139,710 134,712 C129,714 123,714 118,715 C113,716 107,718 102,717 C97,716 93,714 88,712 C83,710 78,708 73,705 C69,702 64,698 61,694 C57,690 55,684 52,679 C49,674 46,669 44,663 C42,658 41,652 40,646 C39,640 40,635 40,629 C40,623 40,618 41,612 C42,606 45,601 47,596 C49,590 51,585 54,580 C57,575 61,571 64,566 C67,561 70,556 73,551 C76,546 78,540 81,535 C84,530 87,524 90,519 C93,514 97,509 100,505 C103,500 107,496 110,491 C113,486 115,480 117,475 C119,470 121,464 123,459 C125,454 127,449 128,443 C129,438 128,432 128,427 C128,421 127,416 126,410 C125,405 123,399 122,394 C121,388 119,383 118,377 C117,372 115,366 115,361 C115,355 115,350 115,344 C115,339 115,333 114,328 C113,322 113,317 111,312 C110,306 107,301 105,296 C103,291 100,286 97,282 C94,278 91,274 87,271 C83,268 78,266 74,264 C70,262 65,261 61,260 C57,259 53,260 49,261 C45,262 41,265 37,267 C33,269 30,272 27,276 C24,280 21,284 19,288 C17,293 15,297 14,302 C13,307 14,313 14,318 C14,324 15,329 16,335 C17,340 19,345 20,350 C21,356 22,361 22,367 C22,372 22,378 20,383 C19,388 15,393 12,398 C10,402 8,407 7,412 C6,417 6,423 5,428 C4,433 3,439 3,444 C3,450 3,455 3,461 C3,466 3,472 4,477 C5,482 8,487 10,492 C12,497 15,502 18,506 C21,511 25,515 29,519 C33,523 38,526 42,529 C46,532 52,535 57,537 C62,539 68,540 74,541 C79,542 85,542 91,542 C96,542 102,540 107,539 C113,538 118,535 123,533 C129,531 134,528 139,525 C144,522 149,518 154,515 C158,512 162,508 166,505 C170,502 173,498 176,494 C179,490 180,485 182,481 C184,476 185,471 186,466 C187,461 187,456 187,451 C187,446 187,440 186,435 C185,430 184,425 182,420 C181,415 179,410 176,406 C174,402 170,398 167,395 C163,392 159,390 154,389 C150,388 145,388 140,388 C136,388 131,390 126,392 C122,394 117,397 113,400 C109,403 105,407 101,411 C97,415 93,419 89,424 C85,428 82,433 78,438 C74,443 71,449 67,454 C64,459 60,464 57,470 C54,475 52,481 49,487 C46,493 43,499 41,505 C39,511 39,517 38,524 C37,530 37,537 38,543 C39,550 42,556 45,562 C48,568 54,573 59,578 C64,583 70,587 77,590 C83,593 90,595 97,597 C103,599 111,600 118,600 C125,600 133,598 140,597 C147,596 154,594 161,591 C168,588 175,584 181,580 C187,576 193,571 199,566 C204,561 210,556 214,550 C218,544 222,538 224,532 C227,526 229,519 230,513 C231,506 232,499 231,492 C230,485 228,477 225,470 C222,463 219,457 216,450 C213,443 209,437 205,430 C201,423 197,417 193,410 C189,403 186,396 182,389 C178,382 175,375 171,368 C167,361 163,354 159,347 C156,340 153,333 149,325 C146,318 143,311 139,304 C136,297 133,289 130,282 C127,275 125,267 122,260 C119,253 117,245 115,238 C113,230 112,223 112,215 C112,207 112,199 113,191 C114,183 115,176 117,168 C118,160 119,153 121,145 C123,138 126,130 129,123 C132,116 136,109 140,102 C144,95 149,88 154,82 C159,76 164,70 170,65 C176,60 183,55 190,51 C197,47 204,45 212,43 C219,41 227,41 234,40 C242,39 250,39 257,40 C265,41 272,44 279,46 C286,48 293,52 299,55"
                    stroke="#004E64" 
                    strokeWidth="3" 
                    fill="none" 
                  />
                </svg>
                
                {/* Destination marker - Colombo */}
                <div className="absolute" style={{ top: '75%', left: '25%' }}>
                  <div className="relative">
                    <div className="w-8 h-8 bg-[#F26B6B] rounded-full flex items-center justify-center shadow-md">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26B6B] opacity-75"></span>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute whitespace-nowrap -left-16 -bottom-12">
                      <span className="font-script text-xl text-[#0077B6]">Beautiful city of Colombo</span>
                    </div>
                  </div>
                </div>
                
                {/* Destination marker - Cultural Triangle */}
                <div className="absolute" style={{ top: '35%', left: '55%' }}>
                  <div className="relative">
                    <div className="w-8 h-8 bg-[#F26B6B] rounded-full flex items-center justify-center shadow-md">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26B6B] opacity-75"></span>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Ancient Temple Illustration */}
                <div className="absolute" style={{ top: '15%', left: '45%' }}>
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/illustrations/sri-lanka-temple_fw3rpn.png" 
                    alt="Ancient Temple" 
                    className="w-40 h-auto"
                  />
                </div>
                
                {/* Beach Destination */}
                <div className="absolute" style={{ bottom: '20%', right: '5%' }}>
                  <div className="relative group">
                    <img 
                      src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/beaches/mirissa_hq5tcf.jpg" 
                      alt="Beach Destination" 
                      className="w-28 h-28 object-cover rounded-lg shadow-lg border-2 border-white"
                    />
                    <div className="absolute -bottom-8 right-0">
                      <span className="text-[#0077B6] font-medium text-sm bg-white/80 px-2 py-1 rounded shadow-sm">
                        DISCOVER DESTINATIONS 🏝
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* London Bridge Image */}
                <div className="absolute" style={{ top: '0%', right: '0%' }}>
                  <div className="relative">
                    <img 
                      src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/international/london-bridge_pnxrbe.jpg" 
                      alt="London Bridge" 
                      className="w-48 h-32 object-cover rounded-lg shadow-lg border-2 border-white"
                    />
                  </div>
                </div>
                
                {/* Double-Decker Bus Illustration */}
                <div className="absolute" style={{ bottom: '30%', left: '30%' }}>
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/illustrations/london-bus_tme6ft.png" 
                    alt="London Bus" 
                    className="w-20 h-auto"
                  />
                </div>
                
                {/* "United Kingdom" Text */}
                <div className="absolute" style={{ bottom: '5%', right: '20%' }}>
                  <span className="font-script text-3xl text-gray-800">United Kingdom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationMap;