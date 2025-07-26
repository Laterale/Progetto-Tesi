import { CSSProperties } from "react"

export type Record = {
  code: string
  imageUrl: string
  relatedDrawings: string[]
  triggerClass: string
  imageWrapperClass: string
  imageClass: string
  imageStyle: CSSProperties
}

const data: Record[] = [
  {
    code: "fish",
    imageUrl: "/assets/drawings/fish05c.png",
    relatedDrawings: [
      "/assets/scans/IMG00001.jpg",
      "/assets/scans/IMG00002.jpg",
      "/assets/scans/IMG00003.jpg",
      "/assets/scans/IMG00004.jpg",
      "/assets/scans/IMG00005.jpg",
      "/assets/scans/IMG00006.jpg",
      "/assets/scans/IMG00008.jpg",
      "/assets/scans/IMG00009.jpg",
      "/assets/scans/IMG00010.jpg",
      "/assets/scans/IMG00011.jpg",
      "/assets/scans/IMG00013.jpg",
      "/assets/scans/IMG00014.jpg",
      "/assets/scans/IMG00017.jpg",
      "/assets/scans/IMG00018.jpg",
      "/assets/scans/IMG00023.jpg",
      "/assets/scans/IMG00027.jpg",
      "/assets/scans/IMG00028.jpg",
    ],
    triggerClass: "[grid-area:8/4/8/5] md:[grid-area:8/6/8/7] xl:[grid-area:8/8/8/9] relative",
    imageWrapperClass: "w-48 absolute-center",
    imageClass: "object-contain animate-bounce-slight",
    imageStyle: {
      animationDelay: "100ms",
    },
  },
  {
    code: "crab",
    imageUrl: "/assets/drawings/crab032c.png",
    relatedDrawings: [
      "/assets/scans/IMG00010.jpg",
      "/assets/scans/IMG00011.jpg",
      "/assets/scans/IMG00012.jpg",
      "/assets/scans/IMG00013.jpg",
    ],
    triggerClass: "[grid-area:12/12/12/13] lg:[grid-area:12/11/12/12] relative",
    imageWrapperClass: "w-64 lg:w-80 absolute bottom-0 right-0",
    imageClass: "object-contain animate-bounce-slight",
    imageStyle: {
      animationDelay: "400ms",
    },
  },
  {
    code: "clam",
    imageUrl: "/assets/drawings/clam02c.png",
    relatedDrawings: [
      "/assets/scans/IMG00003.jpg",
      "/assets/scans/IMG00009.jpg",
      "/assets/scans/IMG00013.jpg",
    ],
    triggerClass: "[grid-area:11/2/11/3] relative",
    imageWrapperClass: "w-28 lg:w-36 absolute-center",
    imageClass: "object-contain animate-bounce-slight",
    imageStyle: {
      animationDelay: "200ms",
    },
  },
  {
    code: "jellyfish",
    imageUrl: "/assets/drawings/jellyfish01c.png",
    relatedDrawings: [
      "/assets/scans/IMG00001.jpg",
      "/assets/scans/IMG00003.jpg",
      "/assets/scans/IMG00006.jpg",
      "/assets/scans/IMG00009.jpg",
      "/assets/scans/IMG00010.jpg",
      "/assets/scans/IMG00012.jpg",
      "/assets/scans/IMG00013.jpg",
      "/assets/scans/IMG00016.jpg",
      "/assets/scans/IMG00017.jpg",
      "/assets/scans/IMG00018.jpg",
      "/assets/scans/IMG00020.jpg",
      "/assets/scans/IMG00021.jpg",
      "/assets/scans/IMG00027.jpg",
      "/assets/scans/IMG00028.jpg",
    ],
    triggerClass: "[grid-area:5/5/5/6] md:[grid-area:6/3/6/4] lg:[grid-area:8/3/8/4] relative",
    imageWrapperClass: "w-36 absolute-center",
    imageClass: "object-contain animate-bounce-slight",
    imageStyle: {
      animationDelay: "1100ms",
    },
  },
  {
    code: "seahorse",
    imageUrl: "/assets/drawings/seahorse02c.png",
    relatedDrawings: [
      "/assets/scans/IMG00006.jpg",
      "/assets/scans/IMG00008.jpg",
      "/assets/scans/IMG00010.jpg",
      "/assets/scans/IMG00012.jpg",
      "/assets/scans/IMG00013.jpg",
    ],
    triggerClass:
      "[grid-area:5/9/5/10] md:[grid-area:5/8/5/9] xl:[grid-area:6/6/6/7] 2xl:[grid-area:6/5/6/6] relative",
    imageWrapperClass: "w-32 absolute-center-x top-0",
    imageClass: "object-contain animate-bounce-slight",
    imageStyle: {
      animationDelay: "1800ms",
    },
  },
  {
    code: "seaweed",
    imageUrl: "/assets/drawings/seaweed01c.png",
    relatedDrawings: [
      "/assets/scans/IMG00001.jpg",
      "/assets/scans/IMG00002.jpg",
      "/assets/scans/IMG00004.jpg",
      "/assets/scans/IMG00005.jpg",
      "/assets/scans/IMG00006.jpg",
      "/assets/scans/IMG00009.jpg",
      "/assets/scans/IMG00010.jpg",
      "/assets/scans/IMG00011.jpg",
      "/assets/scans/IMG00012.jpg",
      "/assets/scans/IMG00013.jpg",
      "/assets/scans/IMG00014.jpg",
      "/assets/scans/IMG00017.jpg",
      "/assets/scans/IMG00025.jpg",
      "/assets/scans/IMG00028.jpg",
    ],
    triggerClass: "[grid-area:11/5/11/6] relative",
    imageWrapperClass: "w-36 absolute-center-x bottom-0",
    imageClass: "object-contain animate-bounce-slight",
    imageStyle: {
      animationDelay: "1300ms",
    },
  },
  {
    code: "trash",
    imageUrl: "/assets/drawings/trash01c.png",
    relatedDrawings: ["/assets/scans/IMG00005.jpg", "/assets/scans/IMG00010.jpg"],
    triggerClass: "[grid-area:8/10/8/11] xl:[grid-area:7/11/7/12] relative",
    imageWrapperClass: "w-24 absolute-center-x top-0",
    imageClass: "object-contain animate-bounce-slight",
    imageStyle: {
      animationDelay: "600ms",
    },
  },
  {
    code: "boat",
    imageUrl: "/assets/drawings/boat04c.png",
    relatedDrawings: [
      "/assets/scans/IMG00001.jpg",
      "/assets/scans/IMG00002.jpg",
      "/assets/scans/IMG00005.jpg",
      "/assets/scans/IMG00006.jpg",
      "/assets/scans/IMG00008.jpg",
      "/assets/scans/IMG00011.jpg",
      "/assets/scans/IMG00014.jpg",
      "/assets/scans/IMG00024.jpg",
    ],
    triggerClass:
      "[grid-area:3/10/3/11] md:[grid-area:3/9/3/10] lg:[grid-area:3/7/3/8] xl:[grid-area:3/8/3/9] relative",
    imageWrapperClass: "w-48 lg:w-56 absolute-center-x bottom-0",
    imageClass: "object-contain animate-bounce-rotate-slight origin-bottom-left",
    imageStyle: {
      animationDelay: "1000ms",
    },
  },
  {
    code: "buoy",
    imageUrl: "/assets/drawings/buoy01c.png",
    relatedDrawings: [
      "/assets/scans/IMG00004.jpg",
      "/assets/scans/IMG00018.jpg",
      "/assets/scans/IMG00020.jpg",
    ],
    triggerClass: "[grid-area:3/2/3/3] md:[grid-area:3/12/3/13] lg:[grid-area:3/11/3/12] relative",
    imageWrapperClass: "w-20 lg:w-24 absolute max-lg:right-0 lg:absolute-center-x top-12 md:top-0",
    imageClass: "object-contain animate-bounce-slight",
    imageStyle: {
      animationDelay: "1600ms",
    },
  },
]

export default data
