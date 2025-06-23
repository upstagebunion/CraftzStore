import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Create Your Unique Style</h1>
          <p className="text-xl mb-8">Custom clothing made just for you - choose fabrics, styles, and designs.</p>
          <Link 
            href="/customize" 
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Start Designing
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Customization Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product cards would go here */}
          <div className="text-overWhite bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">Classic T-Shirt</h3>
              <p>100% Cotton</p>
              <button className="mt-4 w-full bg-button text-white py-2 rounded hover:bg-buttonHover transition">
                Customize
              </button>
            </div>
          </div>
          {/* Repeat for other products */}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-gray-100 text-overWhite py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why Choose Craftz?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-2">Premium Materials</h3>
                <p>Only the highest quality fabrics for lasting comfort.</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Unique Designs</h3>
                <p>Stand out with completely original clothing.</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Easy Process</h3>
                <p>Simple customization with our intuitive designer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}