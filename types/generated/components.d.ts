import type { Schema, Attribute } from '@strapi/strapi';

export interface LayoutSectionLayoutFields extends Schema.Component {
  collectionName: 'components_layout_section_layout_fields';
  info: {
    displayName: 'Layout Fields';
    icon: 'expand';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    value: Attribute.Text;
  };
}

export interface LayoutSectionSectionDataConfiguration
  extends Schema.Component {
  collectionName: 'components_layout_section_section_data_configurations';
  info: {
    displayName: 'Section Data Configuration';
    description: '';
  };
  attributes: {
    collection: Attribute.String &
      Attribute.CustomField<'plugin::collection-selector.collection'>;
  };
}

export interface LayoutSectionSection extends Schema.Component {
  collectionName: 'components_layout_section_sections';
  info: {
    displayName: 'section';
    description: '';
  };
  attributes: {
    layout_fields: Attribute.Component<'layout-section.layout-fields', true>;
    section_data_config: Attribute.Component<'layout-section.section-data-configuration'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'layout-section.layout-fields': LayoutSectionLayoutFields;
      'layout-section.section-data-configuration': LayoutSectionSectionDataConfiguration;
      'layout-section.section': LayoutSectionSection;
    }
  }
}
