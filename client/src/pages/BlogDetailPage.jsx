import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/navigationBar/NavBar';
import Footer from '../components/footer/Footer';

function BlogDetailPage() {
  const { id } = useParams();

  // Sample blog posts data (same as BlogPage - in real app, fetch from API)
  const blogPosts = [
    {
      id: 1,
      title: 'Latest Fashion Trends for 2025',
      excerpt: 'Discover the hottest fashion trends that are taking the world by storm this year.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=600&fit=crop',
      date: 'March 15, 2025',
      author: 'Fashion Team',
      category: 'Trends',
      content: `
        <p>The fashion world is constantly evolving, and 2025 is no exception. This year brings a fresh wave of trends that blend nostalgia with innovation, creating looks that are both timeless and modern.</p>

        <h2>Sustainable Fashion Takes Center Stage</h2>
        <p>More than ever, consumers are prioritizing sustainability in their fashion choices. Eco-friendly materials, ethical production processes, and circular fashion concepts are becoming the norm rather than the exception.</p>

        <h2>Bold Colors and Patterns</h2>
        <p>Say goodbye to minimalism - 2025 is all about making a statement. Vibrant colors, bold patterns, and eye-catching prints are dominating runways and street style alike.</p>

        <h2>Comfort Meets Style</h2>
        <p>The pandemic forever changed how we think about clothing. Comfortable, versatile pieces that transition seamlessly from home to office to social events are more popular than ever.</p>

        <h2>Tech-Integrated Fashion</h2>
        <p>Smart fabrics and wearable technology are no longer science fiction. From temperature-regulating materials to garments with integrated charging capabilities, fashion is getting a high-tech upgrade.</p>
      `
    },
    {
      id: 2,
      title: 'How to Style Your Summer Wardrobe',
      excerpt: 'Get ready for summer with these essential styling tips and wardrobe must-haves.',
      image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=1200&h=600&fit=crop',
      date: 'March 12, 2025',
      author: 'Style Guide',
      category: 'Style Tips',
      content: `
        <p>Summer is the perfect time to refresh your wardrobe and experiment with new styles. Here's our comprehensive guide to creating the perfect summer look.</p>

        <h2>Essential Summer Pieces</h2>
        <p>Every summer wardrobe needs these key items: lightweight cotton shirts, breathable linen pants, versatile sundresses, comfortable sandals, and a classic pair of sunglasses.</p>

        <h2>Color Palettes for Summer</h2>
        <p>Think light, bright, and breezy. Pastels, whites, and vibrant tropical colors work beautifully for the summer season. Don't be afraid to mix and match!</p>

        <h2>Layering for Variable Weather</h2>
        <p>Summer weather can be unpredictable. Having light layers like cardigans, denim jackets, or stylish scarves ensures you're prepared for any temperature change.</p>
      `
    },
    {
      id: 3,
      title: 'Sustainable Fashion: Our Commitment',
      excerpt: 'Learn about our journey towards sustainable and eco-friendly fashion choices.',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop',
      date: 'March 10, 2025',
      author: 'Sustainability Team',
      category: 'Sustainability',
      content: `
        <p>At our core, we believe that fashion should not come at the expense of our planet. Here's how we're making a difference.</p>

        <h2>Eco-Friendly Materials</h2>
        <p>We source organic cotton, recycled polyester, and innovative sustainable fabrics to minimize our environmental impact.</p>

        <h2>Ethical Production</h2>
        <p>Every piece is made in facilities that prioritize fair wages, safe working conditions, and worker rights.</p>

        <h2>Circular Fashion Model</h2>
        <p>Our take-back program ensures that old garments are recycled or repurposed, reducing waste and promoting a circular economy.</p>
      `
    },
    {
      id: 4,
      title: 'Winter Collection Highlights',
      excerpt: 'Explore our cozy and stylish winter collection perfect for the cold season.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop',
      date: 'March 8, 2025',
      author: 'Fashion Team',
      category: 'Collections',
      content: `
        <p>Our winter collection combines warmth, comfort, and style to keep you looking great all season long.</p>

        <h2>Cozy Knitwear</h2>
        <p>From chunky sweaters to elegant cardigans, our knitwear collection offers something for every occasion.</p>

        <h2>Outerwear Excellence</h2>
        <p>Stay warm with our range of coats, jackets, and parkas designed to withstand the coldest temperatures.</p>

        <h2>Winter Accessories</h2>
        <p>Complete your look with scarves, gloves, and beanies that add both warmth and style.</p>
      `
    },
    {
      id: 5,
      title: 'Accessorizing 101: Complete Your Look',
      excerpt: 'Master the art of accessorizing with our comprehensive guide to completing any outfit.',
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1200&h=600&fit=crop',
      date: 'March 5, 2025',
      author: 'Style Guide',
      category: 'Accessories',
      content: `
        <p>Accessories can make or break an outfit. Learn how to choose the right pieces to elevate your style.</p>

        <h2>The Power of Statement Jewelry</h2>
        <p>A bold necklace or eye-catching earrings can transform a simple outfit into something spectacular.</p>

        <h2>Bags and Shoes</h2>
        <p>These practical accessories should never be an afterthought. The right bag and shoes tie your whole look together.</p>

        <h2>The Rule of Three</h2>
        <p>A good rule of thumb: don't wear more than three statement accessories at once to avoid overwhelming your outfit.</p>
      `
    },
    {
      id: 6,
      title: 'Behind the Scenes: Our Design Process',
      excerpt: 'Take a peek into how we create and design our exclusive clothing collections.',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea94f75e?w=1200&h=600&fit=crop',
      date: 'March 1, 2025',
      author: 'Design Team',
      category: 'Behind the Scenes',
      content: `
        <p>Ever wondered how a piece of clothing goes from concept to your closet? Here's an inside look at our design process.</p>

        <h2>Inspiration and Research</h2>
        <p>Our design team draws inspiration from art, nature, culture, and global trends to create unique pieces.</p>

        <h2>Sketching and Prototyping</h2>
        <p>Ideas come to life through detailed sketches and physical prototypes, refined through multiple iterations.</p>

        <h2>Quality Control</h2>
        <p>Every piece undergoes rigorous testing to ensure it meets our high standards for quality, fit, and durability.</p>
      `
    }
  ];

  // Find the blog post by ID
  const post = blogPosts.find(p => p.id === parseInt(id));

  // If post not found, show error
  if (!post) {
    return (
      <div>
        <NavBar />
        <div className='flex flex-col items-center justify-center min-h-screen px-6'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Blog Post Not Found</h1>
          <Link to='/blog' className='px-6 py-3 text-white bg-black rounded-lg hover:scale-95 duration-300'>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className='px-6 py-16 max-w-4xl mx-auto'>
        {/* Back to Blog Button */}
        <Link
          to='/blog'
          className='inline-flex items-center text-gray-600 hover:text-black mb-12 transition-colors'
        >
          <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
          Back to Blog
        </Link>

        {/* Category Badge */}
        <span className='inline-block px-4 py-2 text-sm font-semibold text-white bg-black rounded-full mb-4 ml-10'>
          {post.category}
        </span>

        {/* Title */}
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className='flex items-center gap-4 text-gray-600 mb-8'>
          <span>By {post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        {/* Featured Image */}
        <div className='w-full h-96 rounded-lg overflow-hidden mb-8 shadow-lg'>
          <img
            src={post.image}
            alt={post.title}
            className='w-full h-full object-cover'
          />
        </div>

        {/* Blog Content */}
        <div
          className='prose prose-lg max-w-none'
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            lineHeight: '1.8',
          }}
        />

        {/* Styles for the content */}
        <style jsx>{`
          .prose h2 {
            font-size: 1.875rem;
            font-weight: bold;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #111827;
          }
          .prose p {
            margin-bottom: 1.5rem;
            color: #4b5563;
            font-size: 1.125rem;
          }
        `}</style>

        {/* Share Section */}
        <div className='mt-12 pt-8 border-t border-gray-200'>
          <h3 className='text-xl font-bold text-gray-900 mb-4'>Share this article</h3>
          <div className='flex gap-4'>
            <button className='px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 duration-300'>
              Facebook
            </button>
            <button className='px-6 py-2 text-white bg-sky-500 rounded-lg hover:bg-sky-600 duration-300'>
              Twitter
            </button>
            <button className='px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 duration-300'>
              Pinterest
            </button>
          </div>
        </div>

        {/* Back to Blog Button at Bottom */}
        <div className='mt-12 text-center'>
          <Link
            to='/blog'
            className='inline-block px-8 py-3 text-white bg-black rounded-lg hover:scale-95 duration-300'
          >
            Back to All Posts
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default BlogDetailPage;
