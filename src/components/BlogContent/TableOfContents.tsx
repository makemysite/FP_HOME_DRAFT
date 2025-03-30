
import React from 'react';

interface BlogSection {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: BlogSection[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
      <nav>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a 
                href={`#${section.id}`}
                className="text-primary hover:underline"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;
