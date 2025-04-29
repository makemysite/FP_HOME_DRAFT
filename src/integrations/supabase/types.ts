export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      blog_faqs: {
        Row: {
          answer: string
          blog_post_id: string
          created_at: string
          id: string
          position: number
          question: string
        }
        Insert: {
          answer: string
          blog_post_id: string
          created_at?: string
          id?: string
          position: number
          question: string
        }
        Update: {
          answer?: string
          blog_post_id?: string
          created_at?: string
          id?: string
          position?: number
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_faqs_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_name: string | null
          category: Database["public"]["Enums"]["blog_category"] | null
          conclusion: string | null
          created_at: string
          custom_publish_date: string | null
          description: string | null
          hero_image: string | null
          highlight_order: number | null
          id: string
          label: Database["public"]["Enums"]["blog_label"] | null
          meta_description: string | null
          meta_title: string | null
          published: boolean
          show_in_highlights: boolean | null
          slug: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          author_name?: string | null
          category?: Database["public"]["Enums"]["blog_category"] | null
          conclusion?: string | null
          created_at?: string
          custom_publish_date?: string | null
          description?: string | null
          hero_image?: string | null
          highlight_order?: number | null
          id?: string
          label?: Database["public"]["Enums"]["blog_label"] | null
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          show_in_highlights?: boolean | null
          slug: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          author_name?: string | null
          category?: Database["public"]["Enums"]["blog_category"] | null
          conclusion?: string | null
          created_at?: string
          custom_publish_date?: string | null
          description?: string | null
          hero_image?: string | null
          highlight_order?: number | null
          id?: string
          label?: Database["public"]["Enums"]["blog_label"] | null
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          show_in_highlights?: boolean | null
          slug?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      blog_sections: {
        Row: {
          blog_post_id: string
          created_at: string
          id: string
          position: number
          subheading: string | null
          subheading2: string | null
          title: string
        }
        Insert: {
          blog_post_id: string
          created_at?: string
          id?: string
          position: number
          subheading?: string | null
          subheading2?: string | null
          title: string
        }
        Update: {
          blog_post_id?: string
          created_at?: string
          id?: string
          position?: number
          subheading?: string | null
          subheading2?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_sections_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
        }
        Relationships: []
      }
      demo_requests: {
        Row: {
          calendly_redirect_status: boolean | null
          created_at: string
          email: string
          id: string
        }
        Insert: {
          calendly_redirect_status?: boolean | null
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          calendly_redirect_status?: boolean | null
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      product_update_features: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string | null
          is_key_feature: boolean
          order_index: number
          product_update_id: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          is_key_feature?: boolean
          order_index?: number
          product_update_id: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          is_key_feature?: boolean
          order_index?: number
          product_update_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_update_features_product_update_id_fkey"
            columns: ["product_update_id"]
            isOneToOne: false
            referencedRelation: "product_updates"
            referencedColumns: ["id"]
          },
        ]
      }
      product_updates: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string | null
          published_at: string | null
          quarter: string
          slug: string
          status: Database["public"]["Enums"]["product_update_status"]
          title: string
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          published_at?: string | null
          quarter: string
          slug: string
          status?: Database["public"]["Enums"]["product_update_status"]
          title: string
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          published_at?: string | null
          quarter?: string
          slug?: string
          status?: Database["public"]["Enums"]["product_update_status"]
          title?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      section_content: {
        Row: {
          content: Json
          created_at: string
          id: string
          position: number
          section_id: string
          type: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          position: number
          section_id: string
          type: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          position?: number
          section_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "section_content_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "blog_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_reports: {
        Row: {
          ai_suggestions: string[] | null
          factors: Json
          id: string
          overall_score: number
          scan_date: string
          url: string
        }
        Insert: {
          ai_suggestions?: string[] | null
          factors: Json
          id?: string
          overall_score: number
          scan_date?: string
          url: string
        }
        Update: {
          ai_suggestions?: string[] | null
          factors?: Json
          id?: string
          overall_score?: number
          scan_date?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_email: string } | { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      blog_category:
        | "Industry Insights"
        | "Field Operations"
        | "Technology Trends"
        | "Growth"
      blog_label: "latest" | "popular" | "trending"
      product_update_status: "draft" | "published" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      blog_category: [
        "Industry Insights",
        "Field Operations",
        "Technology Trends",
        "Growth",
      ],
      blog_label: ["latest", "popular", "trending"],
      product_update_status: ["draft", "published", "archived"],
    },
  },
} as const
