import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
import Preloader from '../components/Preloader';

export default function inshorts_news()
{

  let [news, setNews] = useState([]);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);


  let getSelectedNews =
      async(data) =>{
                    try
                     { //console.log(`The value is `+data);//The value is [object Object]
                      let category_value = Object.values(data);

                       await axios.get(`https://inshortsapi.vercel.app/news?category=${category_value}`)
                       .then((response) =>{
                                              //console.log(response.data.category);
                                              setNews(response.data.data);
                                              setLoading(true);
                                          }
                            )
                        .catch((error)=> {
                                            console.log(error);
                                          }
                              )

                    } catch (e)
                      {
                          console.log(`The error while fetching api data`+e);

                      }
                }

                let getNews =
                    async() =>{ 
                                  try
                                   {
                                     await axios.get(`https://inshortsapi.vercel.app/news?category=all`)
                                     .then((response) =>{
                                                            setNews(response.data.data);
                                                            setLoading(true);
                                                        }
                                          )
                                      .catch((error)=> {
                                                          console.log(error);
                                                        }
                                            )

                                  } catch (e)
                                    {
                                        console.log(`The error while fetching api data`+e);

                                    }
                              }


  useEffect( ()=>{
                     getNews();

                 },[]);


  return (<>

  <section className="text-gray-600 body-font bg-gray-300">
    <div className="flex flex-row-reverse">
     <div className="form-control mt-24 mr-32 w-56">
      <form onSubmit={handleSubmit(getSelectedNews)} className="flex flex-row space-x-3">
      <select name="news_categories" defaultValue={'DEFAULT'} {...register("news_categories")} className="select select-primary w-full max-w-xs selectCategory">
        <option value="DEFAULT" disabled >Select the News Category</option>
        <option value="all">All</option>
        <option value="national">India News</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="world">World</option>
        <option value="politics">Politics</option>
        <option value="technology">Technology</option>
        <option value="startup">Startup</option>
        <option value="entertainment">Entertainment</option>
        <option value="miscellaneous">Miscellaneous</option>
        <option value="hatke">Hatke</option>
        <option value="science">Science</option>
        <option value="automobile">Automobile</option>
      </select>
      <button className="btn btn-outline btn-primary" type="submit">Read It</button>
    </form>
    </div>
  </div>


      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
        {
          loading ?
        (  news.map((currentElement,index) =>{
                                              return(
                                                      <div className="p-4 md:w-1/3" key = {index}>
                                                       <div className="card w-96 h-full bg-indigo-100 shadow-lg shadow-indigo-300">
                                                        <figure className="px-10 pt-10 flex flex-col">
                                                          <img src={currentElement.imageUrl} alt="News articles" className="rounded-xl mb-2" />
                                                          <figcaption className="tracking-widest text-xs title-font font-medium text-white badge badge-primary badge-md">Source: {currentElement.author}</figcaption>
                                                        </figure>
                                                        <div className="card-body ">
                                                          <h2 className="card-title text-lg font-bold text-gray-900" style={{fontFamily: "'Montserrat', sans-serif"}}>{currentElement.title}</h2>
                                                          <p>{currentElement.content}</p>
                                                          <div className="grid grid-cols-2">
                                                            <Link href={currentElement.url}>
                                                              <a className="link link-primary link-hover inline-flex items-center md:mb-2 lg:mb-0" target="_blank">Learn More ➜</a>
                                                            </Link>
                                                            <span>{currentElement.date}</span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    );
                                            }
                  )
          ):(<Preloader />)
        }

        </div>
      </div>
    </section>

          </>)
}
