import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-center text-display1">
        Design System Test (Display 1)
      </h1>
      <h1 className="text-display2"> (Display 2)</h1>
      <div className="m-2 flex flex-col gap-2 bg-myBlack-900 p-2 ">
        <p className="bg-gradient-to-r from-primary-gradientStart to-primary-gradientEnd ">
          Gradient
        </p>
        <p className="bg-primary-500 ">Primary</p>
        <p className="bg-primary-800 ">Primary 800</p>
        <p className="bg-primary-900 ">Primary 900</p>
      </div>
      <div className="m-2 flex flex-col gap-2 bg-myWhite-100 p-2">
        <p className="bg-myBlack-600">Black 600</p>
        <p className="bg-myBlack-700">Black 700</p>
        <p className="bg-myBlack-800">Black 800</p>
        <p className="bg-myBlack-900">Black 900</p>
      </div>
      <div className="m-2 flex flex-col gap-2 bg-myBlack-900 p-2">
        <p className="bg-myPurple-500">Purple 500</p>
        <p className="bg-myPurple-800">Purple 800</p>
        <p className="bg-myGreen-400">Green 400</p>
        <p className="bg-myGreen-500">Green 800</p>
        <p className="bg-myGreen-900">Green</p>
      </div>
      <div className="m-2 flex flex-col gap-2 bg-myBlack-900 p-2">
        <p className="text-h1Md">heading medium 1</p>
        <p className="text-h2Md">heading medium 2</p>
        <p className="text-p1Bold">para bold 1</p>
        <p className="text-p2Bold">para bold 2</p>
        <p className="text-p3Bold">para bold 3</p>
        <p className="text-p1Med">para med 1</p>
        <p className="text-p3Med">para med 3</p>
        <p className="text-p4Med">para med 4</p>
        <p className="text-p1Reg">para reg 1</p>
        <p className="text-p2Reg">para reg 2</p>
        <p className="text-p3Reg">para reg 3</p>
        <p className="text-p4Reg">para reg 4</p>
        <p className="text-subtitle">subtitle</p>
      </div>
    </main>
  );
}
