import React from 'react';

const TestimonialsSection = ({testimonials}) => {
    return (
        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 py-12">
            <div className="text-center my-8">
                <h2 className="text-4xl font-bold text-gray-900">
                    Trusted by Worldwide Professionals
                </h2>

                <p className="my-4 max-w-2xl mx-auto text-lg text-gray-500">
                    Hear from our satisfied users who have experienced the benefits of our platform.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="flex flex-col max-w-md mx-auto md:mx-0 justify-between rounded-2xl bg-white text-black shadow hover:shadow-xl transition-shadow"
                    >
                        <div className="flex flex-col px-6 pt-8 mb-10 space-y-5">
                            <svg
                                width="24"
                                height="18"
                                viewBox="0 0 24 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-purple-500 fill-current"
                            >
                                <path
                                    d="M24 7.3h-5.1L22.3 4H17l-3.4 6.9v10.3H24V7.3zM10.3 17.6V7.3H5L8.6 4H3.4L0 7.3v10.3h10.3z"
                                    fill="currentColor"
                                />
                            </svg>

                            <p
                                className="text-xl m-0 text-gray-700 italic"
                                style={{ hyphens: "auto" }}
                            >
                                "{testimonial.quote}"
                            </p>
                        </div>

                        <div className="flex space-x-2 px-6 py-6 rounded-b-xl">
                            <div className="flex flex-col justify-center">
                                <p className="font-semibold m-0 text-gray-900">
                                    {testimonial.author}
                                </p>

                                <p className="font-medium text-gray-500 text-sm m-0 mt-1">
                                    {testimonial.handle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsSection;