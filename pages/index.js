import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
import Preloader from '../components/Preloader';


export default function Home()
{

  const [loading, setLoading] = useState(false);
  let [news, setNews] = useState([]);
  const { register, handleSubmit, watch } = useForm();
  let NEWS_DATA = process.env.NEXT_PUBLIC_NEWS_DATA;

  let getSelectedNews =
      async() =>{
                    try
                     { //console.log(`The value is `+Object.values(data));//The value is [object Object]

                      let category_value = watch("news_categories");



                       // await axios.get(`https://newsapi.org/v2/everything?q=${category_value}&apiKey=${INDEXKEY2}`)
                       await axios.get(`https://newsdata.io/api/1/news?apikey=${NEWS_DATA}&q=${category_value}&language=en`)
                       .then((response) =>{
                                             //console.log(`${category_value}`);
                                              setNews(response.data.results);
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


                                     // await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${INDEXKEY1}`)
                                     await axios.get(`https://newsdata.io/api/1/news?apikey=${NEWS_DATA}&category=top&language=en`)
                                     .then((response) =>{
                                                            //console.log(response);
                                                            setNews(response.data.results);
                                                            setLoading(true);
                                                        }
                                          )
                                      .catch((error)=> {
                                                          console.log(error);
                                                          if(error.response.status)
                                                            alert(`Per Day Usage Limit Exceeded, Try Other News Platform`);
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
     <div className="form-control mt-24 mr-28 w-80">
      <form onSubmit={handleSubmit(getSelectedNews)} className="flex flex-row space-x-3">
      <input type="text" placeholder="Search News Here" autoComplete="off" name="news_categories" {...register("news_categories")} className="input input-bordered input-primary w-full max-w-xs" />
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
                                                          <img src={currentElement.image_url} alt="News articles" className="rounded-xl mb-2" />
                                                          <figcaption className="tracking-widest text-xs title-font font-medium text-white badge badge-primary badge-md">Source: {currentElement.source_id}</figcaption>
                                                        </figure>
                                                        <div className="card-body ">
                                                          <h2 className="card-title text-lg font-bold text-gray-900" style={{fontFamily: "'Montserrat', sans-serif"}}>{currentElement.title}</h2>
                                                          <p>{currentElement.description}</p>
                                                          <div className="grid grid-cols-2">
                                                            <Link href={currentElement.link}>
                                                              <a className="link link-primary link-hover inline-flex items-center md:mb-2 lg:mb-0" target="_blank">Learn More ➜</a>
                                                            </Link>
                                                            <span>{currentElement.pubDate}</span>
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
