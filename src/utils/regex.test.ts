import {
  shouldExcludeIftitle,
  shouldHaveInTitle,
  // excludeCs,
  excludeCSharp,
  excludeCPlusPlus,
  excludeDotNet,
  nonLatinPattern,
} from "./regex.ts";

const titlesToTest: string[] = [
  "Mobile Engineer 2 (Android)",
  "365 CRM Developer",
  "Azure Application Developer",
  "C++ Developer",
  "C# Developer",
  "Full Stack Developer",
  "Senior Full Stack Developer",
];

describe("Regex tests", () => {
  test("shouldExcludeIftitle", () => {
    const filteredTitles = titlesToTest.filter((title: string) => {
      // console.log(
      //   `🚀 ${title}: `,
      //   !shouldExcludeIftitle.test(title)
      // );
      return !shouldExcludeIftitle.test(title);
    });
    expect(filteredTitles).toEqual(["C++ Developer", "C# Developer", "Full Stack Developer"]);
    expect(filteredTitles.length).toEqual(3);
  });

  test("shouldHaveInTitle", () => {
    const filteredTitles = titlesToTest.filter((title: string) => {
      // console.log(
      //   `🚀 ${title}: `,
      //   shouldHaveInTitle.test(title)
      // );
      return shouldHaveInTitle.test(title);
    });
    expect(filteredTitles).toEqual([
      "Mobile Engineer 2 (Android)",
      "365 CRM Developer",
      "Azure Application Developer",
      "C++ Developer",
      "C# Developer",
      "Full Stack Developer",
      "Senior Full Stack Developer",
    ]);
    expect(filteredTitles.length).toEqual(titlesToTest.length);
  });

  // test("excludeCs", () => {
  //   const filteredTitles = titlesToTest.filter((title) => {
  //     console.log(
  //       `🚀 ${title}: `,
  //       !excludeCs.test(title)
  //     );
  //     return !excludeCs.test(title);
  //   });
  //   expect(filteredTitles).toEqual([
  //     "Mobile Engineer 2 (Android)",
  //     "365 CRM Developer",
  //     "Azure Application Developer",
  //     "Full Stack Developer",
  //     "Senior Full Stack Developer",
  //   ]);
  //   expect(filteredTitles.length).toEqual(5);
  // });

  test("excludeCSharp", () => {
    const filteredTitles = titlesToTest.filter((title: string) => {
      // console.log(`🚀 ${title}: `, !excludeCSharp.test(title));
      return !excludeCSharp.test(title);
    });
    expect(filteredTitles).toEqual([
      "Mobile Engineer 2 (Android)",
      "365 CRM Developer",
      "Azure Application Developer",
      "C++ Developer",
      "Full Stack Developer",
      "Senior Full Stack Developer",
    ]);
    expect(filteredTitles.length).toEqual(6);
  });

  test("excludeCPlusPlus", () => {
    const filteredTitles = titlesToTest.filter((title: string) => {
      // console.log(`🚀 ${title}: `, !excludeCPlusPlus.test(title));
      return !excludeCPlusPlus.test(title);
    });
    expect(filteredTitles).toEqual([
      "Mobile Engineer 2 (Android)",
      "365 CRM Developer",
      "Azure Application Developer",
      "C# Developer",
      "Full Stack Developer",
      "Senior Full Stack Developer",
    ]);
    expect(filteredTitles.length).toEqual(6);
  });

  test("excludeDotNet", () => {
    const filteredTitles = titlesToTest.filter((title: string) => {
      // console.log(`🚀 ${title}: `, !excludeDotNet.test(title));
      return !excludeDotNet.test(title);
    });
    expect(filteredTitles).toEqual([
      "Mobile Engineer 2 (Android)",
      "365 CRM Developer",
      "Azure Application Developer",
      "C++ Developer",
      "C# Developer",
      "Full Stack Developer",
      "Senior Full Stack Developer",
    ]);
    expect(filteredTitles.length).toEqual(7);
  });

  test("filterFunction", () => {
    const filteredTitles = titlesToTest.filter((title: string) => {
      // console.log(`🚀 ${title}: `, !excludeDotNet.test(title));
      return (
        !shouldExcludeIftitle.test(title) &&
        !nonLatinPattern.test(title) &&
        !excludeDotNet.test(title) &&
        // !excludeCs.test(title) &&
        !excludeCSharp.test(title) &&
        !excludeCPlusPlus.test(title) &&
        shouldHaveInTitle.test(title)
      );
    });
    expect(filteredTitles).toEqual(["Full Stack Developer"]);
    expect(filteredTitles.length).toEqual(1);
  });
});
