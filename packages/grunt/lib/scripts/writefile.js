module.exports = {
  readme: {
    files: [
      {
        expand: false,
        src: "<%= readmeTemplatePath %>",
        dest: "./README.md",
      },
    ],
    options: {
      preserveExtension: false,
      mode: "0644",
      data: {
        pkg: "<%= pkg %>",
      },
      paths: {
        src: "<%= readmeTemplatePath %>",
        dest: "./README.md",
      },
    },
    main: {
      files: [
        {
          src: "<%= readmeTemplatePath %>",
          dest: "./README.md",
        },
      ],
    },
  },
};
