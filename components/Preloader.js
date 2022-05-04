import preloader_image from '../public/images/Ellipsis-1s-200px.gif';
import Image from 'next/image';


export default function Preloader()
{
  return(<>

            <div className="hero min-h-screen bg-gray-300">
              <div className="hero-content text-center">
                <div className="max-w-3xl">
                  <Image src={preloader_image} className="max-h-20 rounded-lg shadow-2xl " alt="preloader " />
                </div>
              </div>
            </div>

        </>);
}
