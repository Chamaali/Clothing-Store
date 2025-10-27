import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navigationBar/NavBar';
import Footer from '../components/footer/Footer';

function BlogPage() {
  const navigate = useNavigate();

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Latest Fashion Trends for 2025',
      excerpt: 'Discover the hottest fashion trends that are taking the world by storm this year.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
      date: 'March 15, 2025',
      author: 'Fashion Team',
      category: 'Trends'
    },
    {
      id: 2,
      title: 'How to Style Your Summer Wardrobe',
      excerpt: 'Get ready for summer with these essential styling tips and wardrobe must-haves.',
      image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=600&h=400&fit=crop',
      date: 'March 12, 2025',
      author: 'Style Guide',
      category: 'Style Tips'
    },
    {
      id: 3,
      title: 'Sustainable Fashion: Our Commitment',
      excerpt: 'Learn about our journey towards sustainable and eco-friendly fashion choices.',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
      date: 'March 10, 2025',
      author: 'Sustainability Team',
      category: 'Sustainability'
    },
    {
      id: 4,
      title: 'Winter Collection Highlights',
      excerpt: 'Explore our cozy and stylish winter collection perfect for the cold season.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop',
      date: 'March 8, 2025',
      author: 'Fashion Team',
      category: 'Collections'
    },
    {
      id: 5,
      title: 'Accessorizing 101: Complete Your Look',
      excerpt: 'Master the art of accessorizing with our comprehensive guide to completing any outfit.',
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&h=400&fit=crop',
      date: 'March 5, 2025',
      author: 'Style Guide',
      category: 'Accessories'
    },
    {
      id: 6,
      title: 'Behind the Scenes: Our Design Process',
      excerpt: 'Take a peek into how we create and design our exclusive clothing collections.',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea94f75e?w=600&h=400&fit=crop',
      date: 'March 1, 2025',
      author: 'Design Team',
      category: 'Behind the Scenes'
    }
  ];

  return (
    <div>
      <NavBar />
      <div className='flex flex-col gap-12 px-6 py-16 max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Our Blog</h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Stay updated with the latest fashion trends, styling tips, and behind-the-scenes insights from our team.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col'
            >
              {/* Blog Image */}
              <div className='h-48 overflow-hidden'>
                <img
                  src={post.image}
                  alt={post.title}
                  className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
                />
              </div>

              {/* Blog Content */}
              <div className='p-6 flex flex-col flex-grow'>
                {/* Category Badge */}
                <span className='inline-block px-3 py-1 text-xs font-semibold text-white bg-black rounded-full mb-3 w-fit'>
                  {post.category}
                </span>

                {/* Title */}
                <h2 className='text-xl font-bold text-gray-900 mb-2 hover:text-red-400 transition-colors'>
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className='text-gray-600 mb-4 line-clamp-3'>
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>

                {/* Read More Button - Pushed to bottom */}
                <button
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className='mt-auto px-4 py-2 text-sm text-white bg-black rounded-lg hover:scale-95 duration-300 w-full'
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination or Load More (Optional) */}
        <div className='text-center mt-8'>
          <button className='px-8 py-3 text-white bg-black rounded-lg hover:scale-95 duration-300'>
            Load More Posts
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default BlogPage;
