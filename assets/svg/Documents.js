import React from "react";
import { View } from "react-native";
import Svg, {
  Path,
  Circle,
  LinearGradient,
  Stop,
  Defs,
} from "react-native-svg";

const originalWidth = 728;
const originalHeight = 797;
const aspectRatio = originalWidth / originalHeight;
const windowWidth = 140;

function Documents(props) {
  return (
    <View style={{ width: windowWidth - 40, aspectRatio }}>
      <Svg
        data-name="Layer 1"
        width="100%"
        height="100%"
        viewBox={`0 0 ${originalWidth} ${originalHeight}`}
        {...props}
      >
        <Defs>
          <LinearGradient
            id="prefix__a"
            x1={506}
            y1={757.81}
            x2={506}
            y2={51.81}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset={0} stopColor="#b3b3b3" stopOpacity={0.25} />
            <Stop offset={0.54} stopColor="#b3b3b3" stopOpacity={0.1} />
            <Stop offset={1} stopColor="#b3b3b3" stopOpacity={0.05} />
          </LinearGradient>
          <LinearGradient
            id="prefix__c"
            x1={49.46}
            y1={96.5}
            x2={49.46}
            y2={3.5}
            xlinkHref="#prefix__a"
          />
          <LinearGradient
            id="prefix__b"
            x1={627.87}
            y1={796.38}
            x2={627.87}
            y2={596.12}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset={0} stopColor="gray" stopOpacity={0.25} />
            <Stop offset={0.54} stopColor="gray" stopOpacity={0.12} />
            <Stop offset={1} stopColor="gray" stopOpacity={0.1} />
          </LinearGradient>
          <LinearGradient
            id="prefix__d"
            x1={627.87}
            y1={746.82}
            x2={627.87}
            y2={645.68}
            xlinkHref="#prefix__b"
          />
          <LinearGradient
            id="prefix__e"
            x1={611}
            y1={802.81}
            x2={611}
            y2={96.81}
            xlinkHref="#prefix__a"
          />
          <LinearGradient
            id="prefix__f"
            x1={154.46}
            y1={141.5}
            x2={154.46}
            y2={48.5}
            xlinkHref="#prefix__a"
          />
        </Defs>

        <Path
          d="M650 694.81c0-51.76 51.11-99.48 102.87-99.48 7.93 0 15.62-2 23-.16.1-2.26.16-15.54.16-17.82V51.81H328l-92 94.5v611.5h423c-9.1-14.44-9-44.66-9-63z"
          transform="translate(-236 -51.81)"
          fill="url(#prefix__a)"
        />
        <Path
          d="M406 653a117 117 0 01117-117c3.53 0 7 .17 10.48.47V265.19h-525V694h404.91a116.74 116.74 0 01-7.39-41z"
          fill="#fcfcfc"
        />
        <Path
          fill="#fcfcfc"
          d="M533.09 269.19H6.91V94.5L92 5.5h441.09v263.69z"
        />
        <Path
          fill="#e0e0e0"
          d="M357.59 58.59h142.73v10.89H357.59zM357.59 98.59h142.73v10.89H357.59zM357.59 138.59h142.73v10.89H357.59z"
        />
        <Path
          fill="#36f"
          opacity={0.5}
          d="M357.59 178.59h142.73v10.89H357.59z"
        />
        <Path
          fill="#e0e0e0"
          d="M357.59 218.59h142.73v10.89H357.59zM357.59 258.59h142.73v10.89H357.59z"
        />
        <Path fill="#36f" opacity={0.5} d="M84.72 343.59h142.73v10.89H84.72z" />
        <Path fill="#e0e0e0" d="M84.72 387.13h142.73v10.89H84.72z" />
        <Path
          fill="#69f0ae"
          opacity={0.5}
          d="M84.72 365.36h372.56v10.89H84.72z"
        />
        <Path fill="#36f" opacity={0.5} d="M84.72 448.82h142.73v10.89H84.72z" />
        <Path
          fill="#e0e0e0"
          d="M84.72 492.37h142.73v10.89H84.72zM84.72 470.59h372.56v10.89H84.72z"
        />
        <Path fill="#36f" opacity={0.5} d="M84.72 554.06h142.73v10.89H84.72z" />
        <Path
          fill="#e0e0e0"
          d="M84.72 597.6h142.73v10.89H84.72zM84.72 575.83h305.41v10.89H84.72z"
        />
        <Path fill="#36f" d="M310 281H50V54l9-11h251v238z" />
        <Path fill="url(#prefix__c)" d="M4.91 96.5H94v-93l-89.09 93z" />
        <Path fill="#f5f5f5" d="M6.91 94.5H92v-89l-85.09 89z" />
        <Circle
          cx={627.87}
          cy={696.25}
          r={100.13}
          fill="url(#prefix__b)"
          opacity={0.5}
        />
        <Circle cx={627.87} cy={696.25} r={93.72} fill="#3ad29f" />
        <Path
          fill="url(#prefix__d)"
          d="M678.44 684.95h-39.28v-39.27h-22.58v39.27H577.3v22.59h39.28v39.28h22.58v-39.28h39.28v-22.59z"
          opacity={0.5}
        />
        <Path fill="#fff" d="M618.27 653.26h19.2v85.97h-19.2z" />
        <Path fill="#fff" d="M670.86 686.65v19.2h-85.97v-19.2z" />
        <Path
          d="M755 739.81c0-51.76 51.11-99.48 102.87-99.48 7.93 0 15.62-2 23-.16.1-2.26.16-15.54.16-17.82V96.81H433l-92 94.5v611.5h423c-9.1-14.44-9-44.66-9-63z"
          transform="translate(-236 -51.81)"
          fill="url(#prefix__e)"
        />
        <Path
          d="M511 698a117 117 0 01117-117c3.53 0 7 .17 10.48.47V310.19h-525V739h404.91a116.74 116.74 0 01-7.39-41z"
          fill="#fff"
        />
        <Path
          fill="#fff"
          d="M638.09 314.19H111.91V139.5l85.09-89h441.09v263.69z"
        />
        <Path
          fill="#e0e0e0"
          d="M462.59 103.59h142.73v10.89H462.59zM462.59 143.59h142.73v10.89H462.59zM462.59 183.59h142.73v10.89H462.59z"
        />
        <Path
          fill="#36f"
          opacity={0.5}
          d="M462.59 223.59h142.73v10.89H462.59z"
        />
        <Path
          fill="#e0e0e0"
          d="M462.59 263.59h142.73v10.89H462.59zM462.59 303.59h142.73v10.89H462.59z"
        />
        <Path
          fill="#36f"
          opacity={0.5}
          d="M189.72 388.59h142.73v10.89H189.72z"
        />
        <Path fill="#e0e0e0" d="M189.72 432.13h142.73v10.89H189.72z" />
        <Path
          fill="#69f0ae"
          opacity={0.5}
          d="M189.72 410.36h372.56v10.89H189.72z"
        />
        <Path
          fill="#36f"
          opacity={0.5}
          d="M189.72 493.82h142.73v10.89H189.72z"
        />
        <Path
          fill="#e0e0e0"
          d="M189.72 537.37h142.73v10.89H189.72zM189.72 515.59h372.56v10.89H189.72z"
        />
        <Path
          fill="#36f"
          opacity={0.5}
          d="M189.72 599.06h142.73v10.89H189.72z"
        />
        <Path
          fill="#e0e0e0"
          d="M189.72 642.6h142.73v10.89H189.72zM189.72 620.83h305.41v10.89H189.72z"
        />
        <Path fill="#36f" d="M415 326H155V99l9-11h251v238z" />
        <Path fill="url(#prefix__f)" d="M109.91 141.5H199v-93l-89.09 93z" />
        <Path fill="#fcfcfc" d="M111.91 139.5H197v-89l-85.09 89z" />
      </Svg>
    </View>
  );
}

export default Documents;
