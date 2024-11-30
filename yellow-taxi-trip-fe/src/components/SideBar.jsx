import * as React from "react";
import { useRef } from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useDimensions } from "../utils/index";
import { useSelector, useDispatch } from "react-redux";

import mapPoint from "../assets/map-point.svg";
import circleDashed from "../assets/circle-dashed.svg";

import Input from "./Input";
import {
  setIsDropOffCoorInputOnFocus,
  setIsPickupCoorInputOnFocus,
  setPickupCoor,
} from "../features/tripHandler/tripHandlerSlice";

const sidebar = {
  open: () => ({
    width: 300,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  }),
  closed: {
    width: 65,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      when: "afterChildren",
    },
  },
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const SideBar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const dispatch = useDispatch();
  const { pickupCoor, dropOffCoor, isPickupCoorInputOnFocus, isDropOffCoorInputOnFocus } =
    useSelector((state) => state.tripHandler);

  return (
    <motion.nav
      initial={"open"}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      variants={sidebar}
      className="absolute top-0 left-0 z-20 h-full w-11 p-5 bg-white rounded-tr-xl rounded-br-xl"
    >
      <div>
        <div className="flex gap-3 items-center mb-5 text-black">
          <button onClick={() => toggleOpen()}>
            <svg width="23" height="23" viewBox="0 0 23 23">
              <Path
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" },
                }}
              />
              <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
              />
              <Path
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.346" },
                }}
              />
            </svg>
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.h1 exit={{ opacity: 0 }} className="text-xl">
                Yellow Taxi Trip
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div exit={{ opacity: 0 }} className="px-3">
              <div className="flex gap-3">
                <div className="py-3">
                  <img src={circleDashed} className="w-5" alt="circle-dashed" />
                  <span className="flex flex-col justify-center items-center mb-3">
                    <p className="leading-3">.</p>
                    <p className="leading-3">.</p>
                    <p className="leading-3">.</p>
                  </span>
                  <img src={mapPoint} className="w-5" alt="map-point" />
                </div>
                <div>
                  <Input
                    name="Pickup - doeble click"
                    value={pickupCoor}
                    onFocus={() => dispatch(setIsPickupCoorInputOnFocus(true))}
                    onChange={(e) => dispatch(setPickupCoor(e.target.value))}
                  />
                  <Input
                    name="Dropoff - click anywhere"
                    value={dropOffCoor}
                    onFocus={() => dispatch(setIsDropOffCoorInputOnFocus(true))}
                    onChange={(e) => dispatch(setDropOffCoor(e.target.value))}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default SideBar;
