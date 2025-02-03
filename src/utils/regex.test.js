import {
  shouldExcludeIftitle,
  shouldHaveInTitle,
  // excludeCs,
  excludeCSharp,
  excludeCPlusPlus,
  excludeDotNet,
  nonLatinPattern,
} from "./regex.js";

const titlesToTest = [
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
    const fileteredTitles = titlesToTest.filter((title) => {
      // console.log(
      //   `🚀 ${title}: `,
      //   !shouldExcludeIftitle.test(title)
      // );
      return !shouldExcludeIftitle.test(title);
    });
    expect(fileteredTitles).toEqual([
      "C++ Developer",
      "C# Developer",
      "Full Stack Developer",
    ]);
    expect(fileteredTitles.length).toEqual(3);
  });

  test("shouldHaveInTitle", () => {
    const fileteredTitles = titlesToTest.filter((title) => {
      // console.log(
      //   `🚀 ${title}: `,
      //   shouldHaveInTitle.test(title)
      // );
      return shouldHaveInTitle.test(title);
    });
    expect(fileteredTitles).toEqual([
      "Mobile Engineer 2 (Android)",
      "365 CRM Developer",
      "Azure Application Developer",
      "C++ Developer",
      "C# Developer",
      "Full Stack Developer",
      "Senior Full Stack Developer",
    ]);
    expect(fileteredTitles.length).toEqual(titlesToTest.length);
  });

  // test("excludeCs", () => {
  //   const fileteredTitles = titlesToTest.filter((title) => {
  //     console.log(
  //       `🚀 ${title}: `,
  //       !excludeCs.test(title)
  //     );
  //     return !excludeCs.test(title);
  //   });
  //   expect(fileteredTitles).toEqual([
  //     "Mobile Engineer 2 (Android)",
  //     "365 CRM Developer",
  //     "Azure Application Developer",
  //     "Full Stack Developer",
  //     "Senior Full Stack Developer",
  //   ]);
  //   expect(fileteredTitles.length).toEqual(5);
  // });

  test("excludeCSharp", () => {
    const fileteredTitles = titlesToTest.filter((title) => {
      console.log(`🚀 ${title}: `, !excludeCSharp.test(title));
      return !excludeCSharp.test(title);
    });
    expect(fileteredTitles).toEqual([
      "Mobile Engineer 2 (Android)",
      "365 CRM Developer",
      "Azure Application Developer",
      "C++ Developer",
      "Full Stack Developer",
      "Senior Full Stack Developer",
    ]);
    expect(fileteredTitles.length).toEqual(6);
  });

  test("excludeCPlusPlus", () => {
    const fileteredTitles = titlesToTest.filter((title) => {
      // console.log(`🚀 ${title}: `, !excludeCPlusPlus.test(title));
      return !excludeCPlusPlus.test(title);
    });
    expect(fileteredTitles).toEqual([
      "Mobile Engineer 2 (Android)",
      "365 CRM Developer",
      "Azure Application Developer",
      "C# Developer",
      "Full Stack Developer",
      "Senior Full Stack Developer",
    ]);
    expect(fileteredTitles.length).toEqual(6);
  });

  test("excludeDotNet", () => {
    const fileteredTitles = titlesToTest.filter((title) => {
      // console.log(`🚀 ${title}: `, !excludeDotNet.test(title));
      return !excludeDotNet.test(title);
    });
    expect(fileteredTitles).toEqual([
      "Mobile Engineer 2 (Android)",
      "365 CRM Developer",
      "Azure Application Developer",
      "C++ Developer",
      "C# Developer",
      "Full Stack Developer",
      "Senior Full Stack Developer",
    ]);
    expect(fileteredTitles.length).toEqual(7);
  });

  test("filterFunction", () => {
    const fileteredTitles = titlesToTest.filter((title) => {
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
    expect(fileteredTitles).toEqual(["Full Stack Developer"]);
    expect(fileteredTitles.length).toEqual(1);
  });
});
