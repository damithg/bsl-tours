import { Link } from "wouter";

export type BreadcrumbItem = {
  label: string;
  path?: string;  // Optional for the current/last item
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  return (
    <nav className={`flex text-white/90 ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {/* Home is always the first item */}
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-white">
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </Link>
        </li>
        
        {/* Map remaining items */}
        {items.map((item, index) => (
          <li key={index} aria-current={index === items.length - 1 ? "page" : undefined}>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-white/60 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              {item.path ? (
                <Link href={item.path} className="text-sm font-medium hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm font-medium text-white/80">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;