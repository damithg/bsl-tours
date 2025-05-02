import React, { ReactNode } from 'react';
import { Link } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';

interface StandardPageTemplateProps {
  title: string;
  description?: string;
  breadcrumbs?: {
    label: string;
    path: string;
  }[];
  children: ReactNode;
  showContactCTA?: boolean;
}

const StandardPageTemplate: React.FC<StandardPageTemplateProps> = ({
  title,
  description,
  breadcrumbs = [],
  children,
  showContactCTA = true,
}) => {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0077B6] to-[#004E64] py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex text-white/90 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              
              {breadcrumbs.map((crumb, index) => (
                <li key={`breadcrumb-${index}`}>
                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-white/60" />
                    <Link 
                      href={crumb.path} 
                      className="ml-1 text-sm font-medium text-white/90 hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  </div>
                </li>
              ))}
              
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <span className="ml-1 text-sm font-medium text-white/80">
                    {title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Playfair_Display']">
              {title}
            </h1>
            
            {description && (
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      
      {/* Contact CTA */}
      {showContactCTA && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#0077B6] mb-4 font-['Playfair_Display']">
              Need More Information?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Our dedicated team is ready to assist you with any questions or inquiries you may have about our services.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3.5 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Contact Us
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default StandardPageTemplate;