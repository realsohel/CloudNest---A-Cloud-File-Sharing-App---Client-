import React from "react";
import { Check } from "lucide-react";

const PricingSection = ({ pricingPlans }) => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Simple and Transparent Pricing
                    </h2>

                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam, voluptatum.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-14 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {pricingPlans.map((plan) => (
                    <div key={plan.id} className={`relative flex flex-col rounded-2xl  shadow-lg transition-all duration-300 hover:-translate-y-2    hover:shadow-2xl ${ plan.popular ? "border-2 border-purple-500 bg-linear-to-br from-purple-50 to-white" : "bg-white" }`}
                    >
                        {/* Popular Badge */}
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 px-4 py-1 text-sm font-semibold text-white">
                                Most Popular
                            </div>
                        )}

                        {/* Top Section */}
                        <div className="p-8 text-center ">
                            <h3 className="text-4xl font-bold text-gray-900">
                            {plan.name}
                            </h3>

                            <p className="mt-4 text-gray-600">
                            {plan.description}
                            </p>

                            <p className="mt-8 text-5xl font-bold text-purple-600">
                            ₹{plan.price}
                            </p>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex flex-col flex-1 bg-gray-50 px-8 py-8">
                            <ul className="space-y-5 flex-1">
                            {plan.features.map((feature, index) => (
                                <li
                                key={index}
                                className="flex items-center gap-3"
                                >
                                <Check className="h-5 w-5 text-purple-500 shrink-0" />

                                <span className="text-gray-700">
                                    {feature}
                                </span>
                                </li>
                            ))}
                            </ul>

                            {/* Button always at bottom */}
                            <button
                            className={`mt-10 w-full rounded-lg py-3 text-lg font-semibold  transition-all duration-300 shadow-md
                                ${
                                plan.popular
                                    ? "text-white bg-linear-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                                    : "bg-white text-purple-500 hover:border-2 hover:border-purple-500"
                                }`}
                            >
                            Go {plan.name}
                            </button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;