import error_image from '../public/images/404 Page Not Found.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function Custom404()
{
  return(<>

    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
         <Image src={error_image} className="max-w-sm rounded-lg shadow-2xl " alt="404 error " />
        <div style={{fontFamily: "'Montserrat', sans-serif"}}>
          <h1 className="text-5xl text-red-600 font-bold animate-pulse">Oops!! </h1>
          <h2 className="text-3xl text-red-500 font-bold animate-pulse">Sorry, we couldnot find this page.</h2>
          <p className="py-6 text-2xl text-gray-700">But dont worry, you can find plenty of other things on our homepage.</p>
          <Link href="/" passHref>
            <button className="btn btn-primary text-xl normal-case"><a>Back to homepage</a></button>
          </Link>
        </div>
      </div>
    </div>

        </>);
}
