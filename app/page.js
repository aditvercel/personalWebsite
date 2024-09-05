"use client";
import Image from "next/image";
import photosaya from "@/public/images/photo_saya.png";
export default function Home() {
  return (
    <>
      <div className="h-[100vw]">
        <div>hello everyone...</div>
        <div>im aditya</div>
        <Image src={photosaya} alt="me" width={200} height={200} />
        <div>
          Est ipsum Lorem occaecat sit minim officia anim ad reprehenderit.
          Excepteur minim mollit officia duis. Velit aliquip qui labore irure
          laboris. Consequat et aliquip tempor est consequat labore aute enim
          sint non sint reprehenderit. Ullamco eiusmod elit culpa consequat
          velit cupidatat veniam nulla officia dolore. Do cupidatat ullamco
          pariatur velit quis. Ad id labore laborum ipsum do. Magna anim quis
          culpa culpa deserunt. Eiusmod adipisicing Lorem qui id elit et ex
          culpa et. Enim proident eu commodo est occaecat incididunt ad qui
          mollit amet. Ea quis dolor consectetur nulla cupidatat. Aliqua nisi eu
          Lorem qui elit ut esse nulla esse officia ut et occaecat. Aute quis
          elit eiusmod qui sint duis labore commodo. Dolor eiusmod sunt in
          commodo ad quis anim aliquip ea proident occaecat esse magna. Id
          tempor qui velit non qui et adipisicing ut proident officia consequat
          eu Lorem consectetur. Qui mollit ipsum enim ut ut duis cillum irure
          velit sint reprehenderit ullamco non. Minim in laborum magna quis.
          Magna proident non laboris deserunt labore. Aliqua nulla aliquip
          adipisicing dolore qui.
        </div>
      </div>
      <div id="pricing">hello im aditya</div>
    </>
  );
}
