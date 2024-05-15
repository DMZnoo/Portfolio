import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl flex space-x-4 items-center">
              <Image src="/profile.jpg" className="rounded-full" width={120} height={50} alt="profile.jpg"/>
              <a href="/">Jinwoo Lee</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight sm:text-xl text-slate-200">Full Stack Engineer</h2>
              <p className="mt-4 max-w-xs leading-normal text-slate-400">I am an all-around generalist with a passion for creating exceptional digital experience. </p>
            </div>
            <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
              <li className="mr-5 text-xs shrink-0">
                <a className="block hover:text-slate-200" href="https://github.com/DMZnoo" target="_blank" rel="noreferrer noopener" aria-label="GitHub (opens in a new tab)" title="GitHub">
                  <span className="sr-only">GitHub</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6 fill-slate-400" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg></a>
              </li>
              <li className="mr-5 text-xs shrink-0">
                <a className="block hover:text-slate-200" href="https://www.linkedin.com/in/jinwoo-lee-00991085/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn">
                  <span className="sr-only">LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 fill-slate-400" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </a>
              </li>
              <li className="mr-5 text-xs shrink-0">
                <a className="block hover:text-slate-200" href="https://instagram.com/dmznoo" target="_blank" rel="noreferrer noopener" aria-label="Instagram (opens in a new tab)" title="Instagram">
                  <span className="sr-only">Instagram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="currentColor" className="h-6 w-6 fill-slate-400" aria-hidden="true"><path d="M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34">
                    </path>
                  </svg>
                </a>
              </li>
            </ul>
        </header>
      <main className="pt-24 lg:w-1/2 lg:py-24">
        <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="About me">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">About</h2>
          </div>
          <div className="text-slate-400">
            <p className="mb-4">During the early days of my military service in South Korea, I came across a news article about {" "}
            <Link href="https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol" target="_blank" rel="noreferrer noopener" className="text-slate-200">AlphaGo vs Lee Sedol</Link> {" "} and I became fascinated with the AI and programming.
            </p>
            <p className="mb-4">
            After the service, I came to New Zealand to study computer science and after a year of study, I was able to find an internship and started my early career as a software engineer. Ever since then, I had a privilege to work in an early stage <Link href="https://www.myclearhead.com" target="_blank" rel="noreferrer noopener" className="text-primary-200">start up</Link>, a <Link href="https://datacom.com/" target="_blank" rel="noreferrer noopener" className="text-primary-200">large corporation</Link>, and lately a <Link href="https://ionprotocol.io/" target="_blank" rel="noreferrer noopener" className="text-primary-200">crypto start up</Link> based in Philadelphia.
            </p>
          </div>
        </section>
        <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Work experience">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Experience
              </h2>
          </div>
          <div>
              {/* <div className="mb-4 relative inline-block neon-button dark:hover:delay-700 dark:duration-300 transition ease-in-out duration-300 dark:bg-dark-primary-600 hover:bg-blue dark:hover:bg-darkBlue dark:hover:shadow-darkBlue dark:hover:shadow-[0_0_25px_0_rgba(1,176,209,0.4)] border-black hover:border-none hover:text-white dark:hover:border-none border dark:border-none">
              <>
                      <span className="absolute block top-0 left-[-100%] w-full h-[2px]" />
                      <span className="absolute block top-[-100%] right-0 w-[2px] h-full" />
                      <span className="absolute block bottom-0 right-[-100%] w-full h-[2px]" />
                      <span className="absolute block bottom-[-100%] left-0 w-[2px] h-full" />
                    </>
              hello
              </div> */}
              <ol className="group/list">
                <li className="mb-12 relative neon-box p-4 rounded">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[radial-gradient(farthest-corner_at_170px_40px,#26c8eb42,transparent_450px),radial-gradient(farthest-corner_at_80%_80%,#26c8eb42,transparent_450px)] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <div className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                      <header className="mb-2" aria-label="latest employment">03. 2023 — 03. 2024</header>
                      <Image className="rounded-sm border-2 border-slate-200/10" src="/ion.png" width={300} height={300} alt="ion.png"/>
                      </div>
                      <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <div>
                                <a className="w-full inline-flex items-baseline font-medium leading-tight text-slate-400 hover:text-primary-400 focus-visible:text-primary-400 group/link text-base" href="https://ionprotocol.io/" target="_blank" rel="noreferrer noopener" aria-label="Full Stack Engineer">
                                  <span className="absolute -inset-x-4 -inset-y-1 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                  <div className="flex justify-between w-full">
                                      <span>Full Stack Engineer</span>
                                      <span className="inline-block">
                                        Ion Protocol
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd"></path>
                                        </svg>
                                      </span>
                                  </div>
                                </a>
                            </div>
                          </h3>
                          <p className="mt-2 text-sm leading-normal text-slate-400 hover:text-slate-200">
                            Built Ion&apos;s first launch of LST Lending platform and implemented various LST assets. Worked closely with a solidity engineer, designer, CTO to create best-practice solution under tight dead-line and budget restriction.
                          </p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">NextJS</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">TypeScript</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">NodeJS</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">PostgreSQL</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">Golang</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">AWS</div>
                            </li>
                          </ul>
                      </div>
                    </div>
                    <>
                      <span className="absolute block top-0 left-[-100%] w-full h-[2px] neon-line-1" />
                      <span className="absolute block top-[-100%] right-0 w-[2px] h-full neon-line-2" />
                      <span className="absolute block bottom-0 right-[-100%] w-full h-[2px] neon-line-3" />
                      <span className="absolute block bottom-[-100%] left-0 w-[2px] h-full neon-line-4" />
                    </>
                </li>
                <li className="mb-12 relative neon-box p-4 rounded">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[radial-gradient(farthest-corner_at_170px_40px,#26c8eb42,transparent_450px),radial-gradient(farthest-corner_at_80%_80%,#26c8eb42,transparent_450px)] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="2024 to Present">01. 2023 — 07. 2023</header>
                      <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <div>
                                <a className="w-full inline-flex items-baseline font-medium leading-tight text-slate-400 hover:text-primary-400 focus-visible:text-primary-400 group/link text-base" href="https://www.serko.com/" target="_blank" rel="noreferrer noopener" aria-label="Full Stack Engineer">
                                  <span className="absolute -inset-x-4 -inset-y-1 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                  <div className="flex justify-between w-full">
                                      <span>Front End Engineer</span>
                                      <span className="inline-block">
                                        Serko
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd"></path>
                                        </svg>
                                      </span>
                                  </div>
                                </a>
                            </div>
                          </h3>
                          <p className="mt-2 text-sm leading-normal text-slate-400 hover:text-slate-200">
                          Collaborated with senior engineers to develop the v1 design token system, enhancing the integration between Figma and Storybook to streamline design and development workflows using Storybook and React.
                          </p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">ReactJS</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">TypeScript</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">Figma</div>
                            </li>
                          </ul>
                      </div>
                    </div>
                    <>
                      <span className="absolute block top-0 left-[-100%] w-full h-[2px] neon-line-1" />
                      <span className="absolute block top-[-100%] right-0 w-[2px] h-full neon-line-2" />
                      <span className="absolute block bottom-0 right-[-100%] w-full h-[2px] neon-line-3" />
                      <span className="absolute block bottom-[-100%] left-0 w-[2px] h-full neon-line-4" />
                    </>
                </li>
                <li className="mb-12 relative neon-box p-4 rounded">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[radial-gradient(farthest-corner_at_170px_40px,#26c8eb42,transparent_450px),radial-gradient(farthest-corner_at_80%_80%,#26c8eb42,transparent_450px)] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="2024 to Present">11. 2021 — 12. 2022</header>
                      <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <div>
                                <a className="w-full inline-flex items-baseline font-medium leading-tight text-slate-400 hover:text-primary-400 focus-visible:text-primary-400 group/link text-base" href="https://datacom.com/" target="_blank" rel="noreferrer noopener" aria-label="Full Stack Engineer">
                                  <span className="absolute -inset-x-4 -inset-y-1 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                  <div className="flex justify-between w-full">
                                      <span>Full Stack Engineer</span>
                                      <span className="inline-block">
                                        Datacom
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd"></path>
                                        </svg>
                                      </span>
                                  </div>
                                </a>
                            </div>
                          </h3>
                          <p className="mt-2 text-sm leading-normal text-slate-400 hover:text-slate-200">
                            Led the POC development of an in-house data visualisation application for Heliase, focusing on creating interactive visual tools for better data insight. Collaborated with IAG to develop APIs for automating insurance pricing in New Zealand, enhancing functionality and efficiency using SpringBoot.
                          </p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">ReactJS</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">ThreeJS</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">D3JS</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">TypeScript</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">SpringBoot</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">AWS</div>
                            </li>
                          </ul>
                      </div>
                    </div>
                    <>
                      <span className="absolute block top-0 left-[-100%] w-full h-[2px] neon-line-1" />
                      <span className="absolute block top-[-100%] right-0 w-[2px] h-full neon-line-2" />
                      <span className="absolute block bottom-0 right-[-100%] w-full h-[2px] neon-line-3" />
                      <span className="absolute block bottom-[-100%] left-0 w-[2px] h-full neon-line-4" />
                    </>
                </li>
                <li className="mb-12 relative neon-box p-4 rounded">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                    
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[radial-gradient(farthest-corner_at_170px_40px,#26c8eb42,transparent_450px),radial-gradient(farthest-corner_at_80%_80%,#26c8eb42,transparent_450px)] lg:group-hover:drop-shadow-lg"
                      ></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="2024 to Present">11. 2020 — 11. 2021</header>
                      <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <div>
                                <a className="w-full inline-flex items-baseline font-medium leading-tight text-slate-400 hover:text-primary-400 focus-visible:text-primary-400 group/link text-base" href="https://www.myclearhead.com/" target="_blank" rel="noreferrer noopener" aria-label="Full Stack Engineer">
                                  <span className="absolute -inset-x-4 -inset-y-1 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                  <div className="flex justify-between w-full">
                                      <span>Front End Engineer</span>
                                      <span className="inline-block">
                                        Clearhead
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd"></path>
                                        </svg>
                                      </span>
                                  </div>
                                </a>
                            </div>
                          </h3>
                          <p className="mt-2 text-sm leading-normal text-slate-400 hover:text-slate-200">
                          Implemented the initial suite of front-end unit tests to enhance code reliability and a blue-green deployment script in Terraform for the DevOps pipeline, improving system stability.
                          Created a comprehensive component library for the Chatbot, utilising NextJS and TailwindCSS to ensure consistency and reusability across the platform.
                          </p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">NextJS</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">TypeScript</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">Terraform</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">StoryBook</div>
                            </li>
                          </ul>
                      </div>
                    </div>
                    <>
                      <span className="absolute block top-0 left-[-100%] w-full h-[2px] neon-line-1" />
                      <span className="absolute block top-[-100%] right-0 w-[2px] h-full neon-line-2" />
                      <span className="absolute block bottom-0 right-[-100%] w-full h-[2px] neon-line-3" />
                      <span className="absolute block bottom-[-100%] left-0 w-[2px] h-full neon-line-4" />
                    </>
                </li>
                <li className="mb-12 relative neon-box p-4 rounded">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[radial-gradient(farthest-corner_at_170px_40px,#26c8eb42,transparent_450px),radial-gradient(farthest-corner_at_80%_80%,#26c8eb42,transparent_450px)] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="2024 to Present">10. 2019 — 03. 2020</header>
                      <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <div>
                                <a className="w-full inline-flex items-baseline font-medium leading-tight text-slate-400 hover:text-primary-400 focus-visible:text-primary-400 group/link text-base" href="https://orionhealth.com/nz/" target="_blank" rel="noreferrer noopener" aria-label="Full Stack Engineer">
                                  <span className="absolute -inset-x-4 -inset-y-1 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                  <div className="flex justify-between w-full">
                                      <span>Software Engineer Intern</span>
                                      <span className="inline-block">
                                        Orion Health
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd"></path>
                                        </svg>
                                      </span>
                                  </div>
                                </a>
                            </div>
                          </h3>
                          <p className="mt-2 text-sm leading-normal text-slate-400 hover:text-slate-200">
                          Contributed to the release of the version 2 developer portal using VanillaJS and CSS, enhancing the platform&apos;s usability and design for improved developer engagement and resource accessibility.
                          </p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">TypeScript</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">Gulp</div>
                            </li>
                            <li className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">NodeJS</div>
                            </li>
                          </ul>
                      </div>
                    </div>
                    <>
                      <span className="absolute block top-0 left-[-100%] w-full h-[2px] neon-line-1" />
                      <span className="absolute block top-[-100%] right-0 w-[2px] h-full neon-line-2" />
                      <span className="absolute block bottom-0 right-[-100%] w-full h-[2px] neon-line-3" />
                      <span className="absolute block bottom-[-100%] left-0 w-[2px] h-full neon-line-4" />
                    </>
                </li>
              </ol>
              <div className="mt-12">
                <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 font-semibold text-slate-200 group/link text-base" href="/resume.pdf" target="_blank" rel="noreferrer noopener" aria-label="View Full Résumé">
                    <span>
                      <span className="inline-block">
                          My CV
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd"></path>
                          </svg>
                      </span>
                    </span>
                </a>
              </div>
          </div>
        </section>
      </main>
      </div>
    </div>
  );
}
