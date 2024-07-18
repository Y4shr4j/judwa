// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../common'
// import { Link } from 'react-router-dom'

// const CategoryList = () => {
//     const [categoryProduct,setCategoryProduct] = useState([])
//     const [loading,setLoading] = useState(false)

//     const categoryLoading = new Array(13).fill(null)

//     const fetchCategoryProduct = async() =>{
//         setLoading(true)
//         const response = await fetch(SummaryApi.categoryProduct.url)
//         const dataResponse = await response.json()
//         setLoading(false)
//         setCategoryProduct(dataResponse.data)
//     }

//     useEffect(()=>{
//         fetchCategoryProduct()
//     },[])

//   return (
//     <div className='container mx-auto p-4'>
//            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
//             {

//                 loading ? (
//                     categoryLoading.map((el,index)=>{
//                             return(
//                                 <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
//                                 </div>
//                             )
//                     })  
//                 ) :
//                 (
//                     categoryProduct.map((product,index)=>{
//                         return(
//                             <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}>
//                                 <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
//                                     <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
//                                 </div>
//                                 <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
//                             </Link>
//                         )
//                     })
//                 )
//             }
//            </div>
//     </div>
//   )
// }

// export default CategoryList



import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(12).fill(null); // Adjusted for 12 items

    const fetchCategoryProduct = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.categoryProduct.url);
        const dataResponse = await response.json();
        setLoading(false);
        setCategoryProduct(dataResponse.data);
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className='container mx-auto p-10 m-10 popular-brands'>
            <div className='flex flex-col mb-4'>
                <div className='popular-brands-title text-xl font-bold'>Popular Brands</div>
                <div className='popular-brands-description'>
                    Order food from our curated list of handpicked brands.
                </div>
            </div>

            <div className='brands-img-wrapper grid grid-cols-4 gap-8 mt-4'>
                {loading ? (
                    categoryLoading.map((_, index) => (
                        <div className='brands-img h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}>
                        </div>
                    ))
                ) : (
                    categoryProduct.map((product) => (
                        <Link to={`/product-category?category=${product?.category}`} className='brands-img cursor-pointer' key={product?.category}>
                            <img
                                src={product?.productImage[0]}
                                alt={product?.category}
                                className='w-full h-full'
                                style={{ width: '100%', height: '100%' }}
                            />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
