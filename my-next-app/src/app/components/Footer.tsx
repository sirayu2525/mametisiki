// src/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="w-full border-t py-6 px-8 mt-8 bg-white">
        <div className="flex justify-between text-sm text-gray-500">
          <div>
            <p>© 2024 大阪公立大学新聞 Hijicho</p>
          </div>
          <ul className="flex space-x-4">
            <li>Use Cases</li>
            <li>Explore</li>
            <li>Resources</li>
          </ul>
        </div>
      </footer>
    );
  }
  