
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full px-4 py-4 bg-white ${
        isScrolled ? "shadow-md" : ""
      } sticky top-0 z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-[#170F49] mr-4">
              FieldProMax
            </h1>
          </NavLink>
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-[#4A3AFF]" : "text-[#6F6C90]"
                  } hover:text-[#4A3AFF]`
                }
              >
                Features
              </NavLink>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-[#4A3AFF]" : "text-[#6F6C90]"
                  } hover:text-[#4A3AFF]`
                }
              >
                Pricing
              </NavLink>
              <NavLink
                to="/industries"
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-[#4A3AFF]" : "text-[#6F6C90]"
                  } hover:text-[#4A3AFF]`
                }
              >
                Industries
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-[#4A3AFF]" : "text-[#6F6C90]"
                  } hover:text-[#4A3AFF]`
                }
              >
                Blog
              </NavLink>
              <NavLink
                to="/product-updates"
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-[#4A3AFF]" : "text-[#6F6C90]"
                  } hover:text-[#4A3AFF]`
                }
              >
                Updates
              </NavLink>
              <NavLink
                to="/tools"
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-[#4A3AFF]" : "text-[#6F6C90]"
                  } hover:text-[#4A3AFF]`
                }
              >
                Tools
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-[#4A3AFF]" : "text-[#6F6C90]"
                  } hover:text-[#4A3AFF]`
                }
              >
                Admin
              </NavLink>
            </nav>
          )}
        </div>
        {!isMobile && (
          <div className="hidden md:flex space-x-4">
            <Link to="/contact">
              <Button variant="outline">Contact</Button>
            </Link>
            <Link to="/booking">
              <Button>Book Demo</Button>
            </Link>
          </div>
        )}
        {/* Mobile Menu Button */}
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden mt-4 py-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <NavLink
              to="/features"
              className={({ isActive }) =>
                `text-base font-medium px-4 py-2 ${
                  isActive ? "text-[#4A3AFF] bg-gray-100" : "text-[#6F6C90]"
                } hover:text-[#4A3AFF] hover:bg-gray-50`
              }
            >
              Features
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `text-base font-medium px-4 py-2 ${
                  isActive ? "text-[#4A3AFF] bg-gray-100" : "text-[#6F6C90]"
                } hover:text-[#4A3AFF] hover:bg-gray-50`
              }
            >
              Pricing
            </NavLink>
            <NavLink
              to="/industries"
              className={({ isActive }) =>
                `text-base font-medium px-4 py-2 ${
                  isActive ? "text-[#4A3AFF] bg-gray-100" : "text-[#6F6C90]"
                } hover:text-[#4A3AFF] hover:bg-gray-50`
              }
            >
              Industries
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `text-base font-medium px-4 py-2 ${
                  isActive ? "text-[#4A3AFF] bg-gray-100" : "text-[#6F6C90]"
                } hover:text-[#4A3AFF] hover:bg-gray-50`
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/product-updates"
              className={({ isActive }) =>
                `text-base font-medium px-4 py-2 ${
                  isActive ? "text-[#4A3AFF] bg-gray-100" : "text-[#6F6C90]"
                } hover:text-[#4A3AFF] hover:bg-gray-50`
              }
            >
              Updates
            </NavLink>
            <NavLink
              to="/tools"
              className={({ isActive }) =>
                `text-base font-medium px-4 py-2 ${
                  isActive ? "text-[#4A3AFF] bg-gray-100" : "text-[#6F6C90]"
                } hover:text-[#4A3AFF] hover:bg-gray-50`
              }
            >
              Tools
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-base font-medium px-4 py-2 ${
                  isActive ? "text-[#4A3AFF] bg-gray-100" : "text-[#6F6C90]"
                } hover:text-[#4A3AFF] hover:bg-gray-50`
              }
            >
              Admin
            </NavLink>
            <div className="flex flex-col space-y-2 px-4 pt-2 border-t">
              <Link to="/contact" className="w-full">
                <Button variant="outline" className="w-full">
                  Contact
                </Button>
              </Link>
              <Link to="/booking" className="w-full">
                <Button className="w-full">Book Demo</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
