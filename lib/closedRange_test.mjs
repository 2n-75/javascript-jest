import assert from "power-assert";
import ClosedRange from "./closedRange.mjs";

describe("任意の2つの数字の整数閉区間を示すクラス", () => {
  // 正常系のテストパターン
  const normalPattern = [
    {
      lowerEndpoint: 1,
      uppperEndpoint: 2,
      reason: "上端点が下端点より1大きい閉区間"
    },
    {
      lowerEndpoint: 1,
      uppperEndpoint: 3,
      reason: "上端点が下端点より2大きい閉区間"
    },
    {
      lowerEndpoint: 1,
      uppperEndpoint: 1,
      reason: "上端点が下端点と同じ値の閉区間"
    }
  ];

  describe("下端点が上端点より小さい値のとき整数閉区間が存在する", () => {
    describe.each(normalPattern)(
      "整数閉区間は下端点と上端点を持つ",
      ({ lowerEndpoint, uppperEndpoint, reason }) => {
        let closedRange;
        beforeEach(() => {
          closedRange = new ClosedRange(lowerEndpoint, uppperEndpoint);
        });
        test(`${reason} [${lowerEndpoint}, ${uppperEndpoint}]の下端点は${lowerEndpoint}`, () => {
          assert(closedRange.getLowerEndpoint() === lowerEndpoint);
        });
        test(`${reason} [${lowerEndpoint}, ${uppperEndpoint}]の上端点は${uppperEndpoint}`, () => {
          assert(closedRange.getUpperEndpoint() === uppperEndpoint);
        });
      }
    );

    describe.each(normalPattern)(
      "整数閉区間の文字列表記を返せる",
      ({ lowerEndpoint, uppperEndpoint, reason }) => {
        let closedRange;
        beforeEach(() => {
          closedRange = new ClosedRange(lowerEndpoint, uppperEndpoint);
        });
        test(`${reason} [${lowerEndpoint}, ${uppperEndpoint}]の文字列表記は "[${lowerEndpoint}, ${uppperEndpoint}]"`, () => {
          assert(
            closedRange.toString() === `[${lowerEndpoint}, ${uppperEndpoint}]`
          );
        });
      }
    );

    describe.each(normalPattern)(
      "整数閉区間は指定した整数を含むかどうかを判定できる",
      ({ lowerEndpoint, uppperEndpoint, reason }) => {
        let closedRange;
        beforeEach(() => {
          closedRange = new ClosedRange(lowerEndpoint, uppperEndpoint);
        });
        test(`${reason} [${lowerEndpoint}, ${uppperEndpoint}]は区間の下限値${lowerEndpoint}を含む`, () => {
          assert(closedRange.contains(lowerEndpoint) === true);
        });
        test(`${reason} [${lowerEndpoint}, ${uppperEndpoint}]は区間の上限値${uppperEndpoint}を含む`, () => {
          assert(closedRange.contains(uppperEndpoint) === true);
        });
        test(`${reason} [${lowerEndpoint}, ${uppperEndpoint}]は区間の下限値より1小さい値0を含まない`, () => {
          assert(closedRange.contains(lowerEndpoint - 1) === false);
        });
        test(`${reason} [${lowerEndpoint}, ${uppperEndpoint}]は区間の上限値より1大きい値2を含まない`, () => {
          assert(closedRange.contains(uppperEndpoint + 1) === false);
        });
      }
    );
  });

  describe("上端点より下端点が大きい閉区間を作ることはできない", () => {
    describe("上端点が下端点より1大きい値を与えたとき、閉区間が存在しない", () => {
      let closedRange;
      beforeEach(() => {
        closedRange = new ClosedRange(2, 1);
      });
      test("上端点に1、下端点2を与え閉区間が存在しないとき、下端点が存在しない", () => {
        assert(closedRange.getLowerEndpoint() === null);
      });
      test("上端点に1、下端点2を与え閉区間が存在しないとき、上端点が存在しない", () => {
        assert(closedRange.getUpperEndpoint() === null);
      });
      test("上端点に1、下端点2を与え閉区間が存在しないとき、文字列表記を返さない", () => {
        assert(closedRange.toString() === null);
      });
      test("上端点に1、下端点2を与え閉区間が存在しないとき、指定した整数を含むかどうかを判定できない", () => {
        assert(closedRange.contains(1) === false);
      });
    });
  });
});
